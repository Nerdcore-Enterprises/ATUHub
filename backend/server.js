import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();
const PORT = 5000;

const JWT_KEY = process.env.JWT_KEY;

console.clear();

app.use(cors());
app.use(express.json());

(async () => {
    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'atuhub',
            port: 3306
        });

        console.log("Connected to the database!");

    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
})();

app.post('/api/signup', async (req, res) => {
    try {
        console.log('Signup Called');

        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'atuhub',
            port: 3306
        });

        const { firstName, lastName, username, password } = req.body;

        const [existingUser] = await db.execute(
            'SELECT * FROM user_table WHERE username = ?',
            [username]
        );

        if (existingUser.length > 0) {
            console.warn(`Username ${username} already exists.`);
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }

        const [result] = await db.execute(
            'INSERT INTO user_table (firstName, lastName, username, password) VALUES (?, ?, ?, ?)',
            [firstName, lastName, username, password]
        );

        const token = jwt.sign({ userId: result.insertId }, JWT_KEY, { expiresIn: '1h' });

        res.json({ success: true, message: 'User created successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/login', async (req, res) => {
    try {
        console.log('Login Called');

        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'atuhub',
            port: 3306
        });

        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and Password are required'})
        }
        const [rows] = await db.execute(
            'SELECT * FROM user_table WHERE username = ? AND password = ?',
            [username, password]
        );

        if (rows.length > 0) {
            console.log(`${username} logged in successfully`);
            const token = jwt.sign({ userId: rows[0].user_id }, JWT_KEY, { expiresIn: '1h' });
            return res.json({ success: true, message: 'Login successful', token });
        } else {
            console.warn(`Invalid username or password`);
            return res.json(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/hours', async (req, res) => {
    try {
        const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' });

        const url = `https://api.dineoncampus.com/v1/locations/weekly_schedule?site_id=5751fd2490975b60e04891e8&date=${today}`;

        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Error: Received status ${response.status} from API`);
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

app.get('/api/weather/radar', async (req, res) => {
    try {
        const timestamp = new Date().getTime();
        const url = `https://radar.weather.gov/ridge/standard/KLZK_loop.gif`;
        
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const imageBuffer = await response.buffer();

        res.set('Content-Type', 'image/gif');
        res.send(imageBuffer);
    } catch (error) {
        console.error('Error fetching radar:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/chambers/menu', async (req, res) => {
    try {
        const fetchMenuForDate = async (date) => {
            const categoryLinks = [
                `https://api.dineoncampus.com/v1/location/5b796d581178e90b837da302/periods/66bfa6a5e45d43075731b717?platform=0&date=${date}`,
                `https://api.dineoncampus.com/v1/location/5b796d581178e90b837da302/periods/66bfa6a5e45d43075731b712?platform=0&date=${date}`,
                `https://api.dineoncampus.com/v1/location/5b796d581178e90b837da302/periods/66bfa6a5e45d43075731b71f?platform=0&date=${date}`
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
                console.error(`Error fetching hours for ${date}`);
                return null;
            }

            const hoursData = await response.json();
            return hoursData.the_locations.find(loc => loc.name === "Chamber's Dining Hall")?.week.find(day => day.date === date);
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

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});