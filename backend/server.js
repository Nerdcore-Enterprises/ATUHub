import bcrypt from 'bcrypt';
import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv';
import express from 'express';
import NodeMailer from 'nodemailer';
import sql from 'mssql';
import fetch from 'node-fetch';

dotenv.config();

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
        console.log("Connected to atuhub database");
    } catch (err) {
        console.error('Error connecting to SQL Server:', err);
    }
})();

// 
// Start Backend
//
app.listen(PORT, '0.0.0.0', () => {
    console.clear();
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

//
// Signup Route
//
app.post('/api/signup', async (req, res) => {
    try {
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

        console.log(`User ${username} created successfully`);

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
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and Password are required' });
        }

        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM [User] WHERE username = @username');

        if (result.recordset.length === 0) {
            console.warn(`Invalid username or password`);
            return res.status(401).json({ success: false, message: 'Invalid username or password. If you forgot your password, please reach out to atuhub@dylandover.dev to reset it.' });
        }

        const user = result.recordset[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.warn(`Invalid username or password.`);
            return res.status(401).json({ success: false, message: 'Invalid username or password. If you forgot your password, please reach out to atuhub@dylandover.dev to reset it.' });
        }

        const sessionId = crypto.randomBytes(16).toString('hex');
        const createdAt = new Date();
        const expiresAt = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);

        const userId = user.user_id || user.id;

        console.log(`User ${username} with id ${userId} logging in. Session token: ${sessionId}`);

        const insertResult = await pool.request()
            .input('userId', sql.Int, userId)
            .input('sessionId', sql.VarChar, sessionId)
            .input('createdAt', sql.DateTime, createdAt)
            .input('expiresAt', sql.DateTime, expiresAt)
            .query('INSERT INTO Session (userId, sessionId, createdAt, expiresAt) VALUES (@userId, @sessionId, @createdAt, @expiresAt)');

        if (!insertResult.rowsAffected || insertResult.rowsAffected[0] === 0) {
            console.error('Session token insertion failed:', insertResult);
            return res.status(500).json({ success: false, message: 'Login failed due to server error' });
        }

        console.log(`${username} logged in successfully`);
        return res.json({ success: true, message: 'Login successful', token: sessionId });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
});

//
// Logout Route
//
app.post('/api/logout', async (req, res) => {
    try {
        const sessionToken = req.headers.authorization?.split(' ')[1];
        if (!sessionToken) {
            return res.status(400).json({ success: false, message: 'No session token provided' });
        }

        await pool.request()
            .input('sessionId', sql.VarChar, sessionToken)
            .query('DELETE FROM Session WHERE sessionId = @sessionId');

        console.log(`Logout successful for session ${sessionToken}`);

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

        const userResult = await pool.request()
            .input('userId', sql.Int, userId)
            .query(`SELECT id, LTRIM(RTRIM(firstName)) AS firstName, LTRIM(RTRIM(lastName)) AS lastName, username, aboutme, avatar, preferences, roles FROM [User] WHERE id = @userId`);

        if (userResult.recordset.length <= 0) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        const user = userResult.recordset[0];

        const driverResult = await pool.request()
            .input('userId', sql.Int, userId)
            .query('SELECT * FROM Driver WHERE userid = @userId');

        const studentResult = await pool.request()
            .input('userId', sql.Int, userId)
            .query('SELECT * FROM Student WHERE userid = @userId');

        user.driver = driverResult.recordset.length > 0 ? driverResult.recordset[0] : null;
        user.student = studentResult.recordset.length > 0 ? studentResult.recordset[0] : null;

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//
// Users Route - List all users in the database
//
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.request()
            .query('SELECT * FROM [User]');
        if (result.recordset.length === 0) {
            return res.status(404).json({ success: false, message: 'No users found' });
        }
        res.json({ success: true, users: result.recordset });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});

//
// Profile Put Route
//
app.put('/api/user/profile', async (req, res) => {
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
        const { firstName, lastName, aboutme, avatar, password } = req.body;
        const avatarBuffer = avatar ? Buffer.from(avatar, 'base64') : null;

        const request = pool.request()
            .input('userId', sql.Int, userId)
            .input('firstName', sql.VarChar, firstName)
            .input('lastName', sql.VarChar, lastName)
            .input('aboutme', sql.VarChar, aboutme);

        // Build the update fields dynamically
        let updateFields = 'firstName = @firstName, lastName = @lastName, aboutme = @aboutme';

        if (avatarBuffer) {
            request.input('avatar', sql.VarBinary, avatarBuffer);
            updateFields += ', avatar = @avatar';
        }

        if (password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            request.input('password', sql.VarChar, hashedPassword);
            updateFields += ', password = @password';
        }

        await request.query(`UPDATE [User] SET ${updateFields} WHERE id = @userId`);

        console.log(`${firstName} ${lastName} updated their profile`);
        res.json({ success: true, message: 'Profile updated' });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send('Internal Server Error');
    }
});

//
// User Slug Route - Fetch a single user by username (slug)
//
app.get('/api/users/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM [User] WHERE username = @username');

        if (result.recordset.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user: result.recordset[0] });
    } catch (error) {
        console.error('Error fetching user by slug:', error);
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


        console.log(`Updated user ${userId}'s preferences`);

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

//
// Jobs Route - Fetch
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
// Jobs Route - Create
//
app.post('/api/jobs', async (req, res) => {
    try {
        const { Name, Description, Address, Type, SalaryType, Salary, ContactType, ContactInfo, applyExternally, Requirements, Responsibilities } = req.body;

        const result = await pool.request()
            .input('Name', sql.VarChar, Name)
            .input('Description', sql.VarChar, Description)
            .input('Address', sql.VarChar, Address)
            .input('Type', sql.VarChar, Type)
            .input('SalaryType', sql.VarChar, SalaryType)
            .input('Salary', sql.VarChar, Salary)
            .input('ContactType', sql.VarChar, ContactType)
            .input('ContactInfo', sql.VarChar, ContactInfo)
            .input('applyExternally', sql.Bit, applyExternally)
            .input('Requirements', sql.VarChar, JSON.stringify(Requirements))
            .input('Responsibilities', sql.VarChar, JSON.stringify(Responsibilities))
            .query(`
                INSERT INTO Job (Name, Description, Address, Type, SalaryType, Salary, ContactType, ContactInfo, applyExternally, Requirements, Responsibilities)
                VALUES (@Name, @Description, @Address, @Type, @SalaryType, @Salary, @ContactType, @ContactInfo, @applyExternally, @Requirements, @Responsibilities);
                SELECT SCOPE_IDENTITY() AS id;
            `);

        const newJobId = result.recordset[0].id;
        const newJob = { id: newJobId, Name, Description, Address, Type, SalaryType, Salary, ContactType, ContactInfo, applyExternally, Requirements, Responsibilities };

        res.json({ success: true, job: newJob });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

//
// Jobs Route - Update
//
app.put('/api/jobs/:id', async (req, res) => {
    try {
        const jobId = req.params.id;
        const { Name, Description, Address, Type, SalaryType, Salary, ContactType, ContactInfo, applyExternally, Requirements, Responsibilities } = req.body;

        await pool.request()
            .input('id', sql.Int, jobId)
            .input('Name', sql.VarChar, Name)
            .input('Description', sql.VarChar, Description)
            .input('Address', sql.VarChar, Address)
            .input('Type', sql.VarChar, Type)
            .input('SalaryType', sql.VarChar, SalaryType)
            .input('Salary', sql.VarChar, Salary)
            .input('ContactType', sql.VarChar, ContactType)
            .input('ContactInfo', sql.VarChar, ContactInfo)
            .input('applyExternally', sql.Bit, applyExternally)
            .input('Requirements', sql.VarChar, JSON.stringify(Requirements))
            .input('Responsibilities', sql.VarChar, JSON.stringify(Responsibilities))
            .query(`
                UPDATE Job
                SET Name = @Name,
                    Description = @Description,
                    Address = @Address,
                    Type = @Type,
                    SalaryType = @SalaryType,
                    Salary = @Salary,
                    ContactType = @ContactType,
                    ContactInfo = @ContactInfo,
                    applyExternally = @applyExternally,
                    Requirements = @Requirements,
                    Responsibilities = @Responsibilities
                WHERE id = @id
            `);

        const updatedJob = { id: Number(jobId), Name, Description, Address, Type, SalaryType, Salary, ContactType, ContactInfo, applyExternally, Requirements, Responsibilities };
        res.json({ success: true, job: updatedJob });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

//
// Jobs Route - Delete
//

app.delete('/api/jobs/:id', async (req, res) => {
    try {
        const jobId = req.params.id;
        await pool.request()
            .input('id', sql.Int, jobId)
            .query('DELETE FROM Job WHERE id = @id');
        res.json({ success: true, message: 'Job deleted successfully' });
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
            .query(`SELECT "User".firstName, "User".lastName, Driver.atuemail, Driver.vehicle_make, Driver.vehicle_model, Driver.vehicle_color, Driver.cashtag, Driver.status, Driver.tags 
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