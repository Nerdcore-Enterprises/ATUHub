import bcrypt from 'bcrypt';
import cors from 'cors';
import cron from 'node-cron';
import crypto from 'crypto';
import dotenv from 'dotenv';
import express from 'express';
import NodeMailer from 'nodemailer';
import sql from 'mssql';
import fetch from 'node-fetch';
import { exec } from 'child_process';

dotenv.config();

const currentBranch = 'dylan-3-10';
const app = express();
const PORT = 5000;

console.clear();

app.use(cors());
app.use(express.json());

const config = {
    user: 'nerdcore',
    password: 'Student01',
    server: '10.60.169.251',
    database: 'atuhub',
    trustServerCertificate: true
};

let pool;
(async () => {
    try {
        pool = await sql.connect(config);
        console.log("Connected to SQL Server!");
    } catch (err) {
        console.error('Error connecting to SQL Server:', err);
    }
})();

// 
// Start Backend
//
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});


//
// Signup Route
//
app.post('/api/signup', async (req, res) => {
    try {
        console.log('Signup Called');

        const { firstName, lastName, username, password } = req.body;

        const existingUser = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM [User] WHERE username = @username');

        if (existingUser.recordset.length > 0) {
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await pool.request()
            .input('firstName', sql.VarChar, firstName)
            .input('lastName', sql.VarChar, lastName)
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, hashedPassword)
            .query('INSERT INTO [User] (firstName, lastName, username, password) VALUES (@firstName, @lastName, @username, @password); SELECT SCOPE_IDENTITY() AS insertId');

        res.json({ success: true, message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//
// Login Route
//
app.post('/api/login', async (req, res) => {
    try {
        console.log('Login Called');

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and Password are required' });
        }

        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM [User] WHERE username = @username');

        if (result.recordset.length === 0) {
            console.warn(`Invalid username or password`);
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        const user = result.recordset[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.warn(`Invalid username or password`);
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        const sessionId = crypto.randomBytes(16).toString('hex');
        const createdAt = new Date();
        const expiresAt = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);

        await pool.request()
            .input('userId', sql.Int, user.user_id || user.id)
            .input('sessionId', sql.VarChar, sessionId)
            .input('createdAt', sql.DateTime, createdAt)
            .input('expiresAt', sql.DateTime, expiresAt)
            .query('INSERT INTO Session (userId, sessionId, createdAt, expiresAt) VALUES (@userId, @sessionId, @createdAt, @expiresAt)');

        console.log(`${username} logged in successfully`);

        return res.json({ success: true, message: 'Login successful', token: sessionId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//
// Logout Route
//
app.post('/api/logout', async (req, res) => {
    try {
        console.log('Logout Called');

        const sessionToken = req.headers.authorization?.split(' ')[1];
        if (!sessionToken) {
            return res.status(400).json({ success: false, message: 'No session token provided' });
        }

        await pool.request()
            .input('sessionId', sql.VarChar, sessionToken)
            .query('DELETE FROM Session WHERE sessionId = @sessionId');

        console.log("Session deleted successfully for token:", sessionToken);

        res.json({ success: true, message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).send('Internal Server Error');
    }
});

//
// Profile Fetch Route
//
app.get('/api/user/profile', async (req, res) => {
    try {
        const sessionToken = req.headers.authorization?.split(' ')[1];
        if (!sessionToken) {
            return res.status(401).json({ success: false, message: 'Unauthorized, no session token' });
        }

        const sessionResult = await pool.request()
            .input('sessionId', sql.VarChar, sessionToken)
            .query('SELECT * FROM Session WHERE sessionId = @sessionId AND expiresAt > GETDATE()');

        if (sessionResult.recordset.length === 0) {
            return res.status(401).json({ success: false, message: 'Session expired or invalid' });
        }

        const userId = sessionResult.recordset[0].userId;

        const user = await pool.request()
            .input('userId', sql.Int, userId)
            .query('SELECT * FROM [User] WHERE id = @userId');

        if (user.recordset.length <= 0) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        res.json(user.recordset[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//
// Profile Put Route
//
app.put('/api/user/profile', async (req, res) => {
    try {
        console.log('Updating user profile');

        const sessionToken = req.headers.authorization?.split(' ')[1];
        if (!sessionToken) {
            return res.status(401).json({ success: false, message: 'Unauthorized, no session token' });
        }

        const sessionResult = await pool.request()
            .input('sessionId', sql.VarChar, sessionToken)
            .query('SELECT * FROM Session WHERE sessionId = @sessionId AND expiresAt > GETDATE()');
        if (sessionResult.recordset.length === 0) {
            return res.status(401).json({ success: false, message: 'Session expired or invalid' });
        }

        const userId = sessionResult.recordset[0].userId;
        const { firstName, lastName, aboutme, avatar } = req.body;
        const avatarBuffer = avatar ? Buffer.from(avatar, 'base64') : null;

        const request = pool.request()
            .input('userId', sql.Int, userId)
            .input('firstName', sql.VarChar, firstName)
            .input('lastName', sql.VarChar, lastName)
            .input('aboutme', sql.VarChar, aboutme);

        if (avatarBuffer) {
            request.input('avatar', sql.VarBinary, avatarBuffer);
            await request.query(
                'UPDATE [User] SET firstName = @firstName, lastName = @lastName, aboutme = @aboutme, avatar = @avatar WHERE id = @userId'
            );
        } else {
            await request.query(
                'UPDATE [User] SET firstName = @firstName, lastName = @lastName, aboutme = @aboutme WHERE id = @userId'
            );
        }

        console.log("Profile updated successfully");
        res.json({ success: true, message: 'Profile updated' });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send('Internal Server Error');
    }
});

//
// Update User Preferences Route
//
app.put('/api/user/preferences', async (req, res) => {
    try {
        const sessionToken = req.headers.authorization?.split(' ')[1];
        if (!sessionToken) {
            return res.status(401).json({ success: false, message: 'Unauthorized, no session token' });
        }

        const sessionResult = await pool.request()
            .input('sessionId', sql.VarChar, sessionToken)
            .query('SELECT * FROM Session WHERE sessionId = @sessionId AND expiresAt > GETDATE()');

        if (sessionResult.recordset.length === 0) {
            return res.status(401).json({ success: false, message: 'Session expired or invalid' });
        }

        const userId = sessionResult.recordset[0].userId;
        const { darkMode } = req.body;
        const prefArray = [{ darkMode }];

        await pool.request()
            .input('preferences', sql.NVarChar, JSON.stringify(prefArray))
            .input('userId', sql.Int, userId)
            .query('UPDATE [User] SET preferences = @preferences WHERE id = @userId');

        console.log("User preferences updated successfully");
        res.json({ success: true, message: 'Preferences updated' });
    } catch (error) {
        console.error('Error updating preferences:', error);
        res.status(500).send('Internal Server Error');
    }
});

//
// Get User Preferences Route
//
app.get('/api/user/preferences', async (req, res) => {
    try {
        const sessionToken = req.headers.authorization?.split(' ')[1];
        if (!sessionToken) {
            return res.status(401).json({ success: false, message: 'Unauthorized, no session token' });
        }

        const sessionResult = await pool.request()
            .input('sessionId', sql.VarChar, sessionToken)
            .query('SELECT * FROM Session WHERE sessionId = @sessionId AND expiresAt > GETDATE()');

        if (sessionResult.recordset.length === 0) {
            return res.status(401).json({ success: false, message: 'Session expired or invalid' });
        }

        const userId = sessionResult.recordset[0].userId;
        const userResult = await pool.request()
            .input('userId', sql.Int, userId)
            .query('SELECT preferences FROM [User] WHERE id = @userId');

        if (userResult.recordset.length === 0) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        const preferences = userResult.recordset[0].preferences;
        let darkMode = false;
        if (preferences) {
            try {
                const prefArray = JSON.parse(preferences);
                if (Array.isArray(prefArray) && prefArray[0] && typeof prefArray[0].darkMode !== 'undefined') {
                    darkMode = prefArray[0].darkMode;
                }
            } catch (e) {
                console.error("Error parsing preferences:", e);
            }
        }

        res.json({ darkMode });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//
// Dine on Campus Hours Route
//
app.get('/api/hours', async (req, res) => {
    try {
        const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' });

        const url = `https://api.dineoncampus.com/v1/locations/weekly_schedule?site_id=5751fd2490975b60e04891e8&date=${today}`;

        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Received status ${response.status} from API, URL: ${url}`);
            return res.status(response.status).send('Error fetching hours data');
        }

        const data = await response.json();

        const locationsWithHoursToday = data.the_locations.map(location => {
            const todayHours = location.week.find(day => day.date === today);
            return {
                name: location.name,
                today: {
                    date: todayHours?.date || 'N/A',
                    hours: todayHours?.hours || [],
                    status: todayHours?.closed ? 'Closed' : 'Open',
                }
            };
        });

        res.json(locationsWithHoursToday);
    } catch (error) {
        console.error('Error fetching hours data', error);
        res.status(500).send('Internal Server Error');
    }
});

//
// NWS Radar Route
//
app.get('/api/weather/radar', async (req, res) => {
    try {
        const timestamp = new Date().getTime();
        const url = `https://radar.weather.gov/ridge/standard/KLZK_loop.gif?${timestamp}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const imageBuffer = await response.arrayBuffer();

        res.set('Content-Type', 'image/gif');
        res.send(Buffer.from(imageBuffer));
    } catch (error) {
        console.error('Error fetching radar:', error);
        res.status(500).send('Internal Server Error');
    }
});

//
// Maptiler Route
//
app.get('/api/maptiler', async (req, res) => {
    try {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const path = url.searchParams.get('path');
        const apiKey = process.env.MAPTILER_KEY;
        const apiUrl = `https://api.maptiler.com/${path}?key=${apiKey}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            console.error(`MapTiler API returned status ${response.status}`);
            return res.status(response.status).send('Error fetching maptiler data');
        }

        const data = await response.json();

        if (!data.version) {
            data.version = 8;
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error("Error in /api/maptiler:", error);
        res.status(500).send('Internal Server Error');
    }
});

//
// Dine on Campus Menu Route
//
app.get('/api/chambers/menu', async (req, res) => {
    try {
        const fetchMenuForDate = async (date) => {
            const categoryLinks = [
                // https://api.dineoncampus.com/v1/location/5b796d581178e90b837da302/periods/677c9a6ae45d43060451c9f0?platform=0&date=2025-2-19
                `https://api.dineoncampus.com/v1/location/5b796d581178e90b837da302/periods/677c9a6ae45d43060451c9f0?platform=0&date=${date}`,
                `https://api.dineoncampus.com/v1/location/5b796d581178e90b837da302/periods/677c9a6ae45d43060451c9ec?platform=0&date=${date}`,
                `https://api.dineoncampus.com/v1/location/5b796d581178e90b837da302/periods/677c9a6ae45d43060451c9fe?platform=0&date=${date}`
            ];

            const menuDataArray = await Promise.all(categoryLinks.map(async (url) => {
                const response = await fetch(url);

                if (!response.ok) {
                    console.error(`Error fetching menu for ${date} from ${url}`);
                    return null;
                }

                const menuData = await response.json();

                if (!menuData.menu || !menuData.menu.periods) {
                    console.warn(`No valid periods found for ${date} from ${url}`);
                    return null;
                }

                return menuData;
            }));

            return menuDataArray.filter(data => data !== null);
        };
        const fetchHoursForDate = async (date) => {
            const url = `https://api.dineoncampus.com/v1/locations/weekly_schedule?site_id=5751fd2490975b60e04891e8&date=${date}`;
            const response = await fetch(url);

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error fetching hours for ${date}, URL: ${url}. Error: ${errorText}`);
                return null;
            }

            const hoursData = await response.json();
            const chamberLocation = hoursData.the_locations.find(loc => loc.name === "Chamber's Dining Hall");

            if (!chamberLocation) {
                console.warn(`Chamber's Dining Hall not found for ${date}`);
                return null;
            }

            return chamberLocation.week.find(day => day.date === date);
        };

        const isAfterClosing = (todayHours) => {
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            if (!todayHours || todayHours.closed) return true;

            const closingTime = todayHours.hours[todayHours.hours.length - 1]?.end_hour * 60 + todayHours.hours[todayHours.hours.length - 1]?.end_minutes;

            return currentMinutes >= closingTime;
        };

        const isBeforeOpening = (todayHours) => {
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            if (!todayHours || todayHours.closed) return false;

            const openingTime = todayHours.hours[0]?.start_hour * 60 + todayHours.hours[0]?.start_minutes;

            return currentMinutes < openingTime;
        };

        const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' });
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDate = tomorrow.toLocaleDateString('en-CA', { timeZone: 'America/Chicago' });

        const chambersHoursToday = await fetchHoursForDate(today);

        let menuData;

        if (isBeforeOpening(chambersHoursToday)) {
            menuData = await fetchMenuForDate(today);
        } else if (isAfterClosing(chambersHoursToday)) {
            menuData = await fetchMenuForDate(tomorrowDate);
        } else {
            menuData = await fetchMenuForDate(today);
        }

        if (!menuData || menuData.length === 0) {
            console.error('No valid menu data returned');
            return res.status(500).send('Invalid menu data structure');
        }

        const periods = menuData.flatMap(data => data.menu.periods).filter(period => period && period.categories);

        const categorizedMenu = periods.map(period => ({
            period: period.name,
            categories: period.categories.map(category => ({
                category: category.name,
                items: category.items.map(item => item.name),
            })),
        }));

        res.json(categorizedMenu);
    } catch (error) {
        console.error('Error fetching Chambers menu data', error);
        res.status(500).send('Internal Server Error');
    }
});

// app.get('/api/jobs', async (req, res) => {
//     try {
//         console.log('Jobs Fetched');

//         const db = await mysql.createConnection({
//             host: 'localhost',
//             user: 'root',
//             password: '',
//             database: 'atuhub',
//             port: 3306
//         });

//         const [rows] = await db.execute(
//             'SELECT * FROM Job',[]
//         );

//         if (rows.length > 0) {
//             console.log(`Jobs fetched Successfully`);
//             return res.json({ success: true, message: "Jobs fetched Successfully", jobs: jobs });
//         } else {
//             console.warn(`Jobs failed to fetch`);
//             return res.json(401).json({ success: false, message: 'Jobs failed to fetch' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

//
// Jobs Route
//
app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await pool.request()
            .query('SELECT * FROM Job');

        if (jobs.length <= 0) {
            return res.status(400).json({ success: false, message: 'No Jobs Found' });
        }

        res.json({ success: true, message: 'Jobs Fetched Successfully', jobs: jobs.recordset });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//
// Drivers Route
//
app.get('/api/drivers', async (req, res) => {
    try {
        const drivers = await pool.request()
            .query('SELECT * FROM Driver');

        if (!drivers.recordset || drivers.recordset.length === 0) {
            return res.json({ success: true, message: 'No Drivers Found', drivers: [] });
        }

        res.json({ success: true, message: 'Drivers Fetched Successfully', drivers: drivers.recordset });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error', drivers: [] });
    }
});

//
// Driver Name Route
//
app.get('/api/drivers-names', async (req, res) => {
    try {
        const drivers = await pool.request()
            .query(`SELECT "User".firstName, "User".lastName, Driver.atuemail, Driver.rating 
                   FROM Driver 
                   LEFT JOIN "User" ON "User".id = Driver.userid`);

        if (!drivers.recordset || drivers.recordset.length === 0) {
            return res.json({ success: true, message: 'No Drivers Found', drivers: [] });
        }

        res.json({ success: true, message: 'Drivers Fetched Successfully', drivers: drivers.recordset });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error', drivers: [] });
    }
});

//
// Email Notifications Route
//
const transporter = NodeMailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    auth: {
        user: "apikey",
        pass: process.env.SENDGRID_KEY
    }
});

const mailOptions = {
    from: 'atuhub@dylandover.dev',
    to: 'nhowell3@atu.edu',
    subject: 'test subject',
    text: 'test body',
    html: `<p>hi there</p>`
};

app.get('/api/email', async (req, res) => {
    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(401).json({ success: false, message: error });
            };
        });

        return res.json({ success: true, message: 'Email Sent' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});