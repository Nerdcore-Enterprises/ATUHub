import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import os from 'os';
import mysql from 'mysql2/promise';

function getLocalIp() {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        for (const net of interfaces[interfaceName]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return '127.0.0.1';
}

const app = express();
const PORT = 5000;
const clientIp = getLocalIp();

console.clear();

app.use(cors());

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
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'atuhub',
            port: 3306
        });

        const { firstName, lastName, username, password } = req.body;

        const [existingUser] = await db.execute(
            'SELECT * FROM user_table WHERE email = ?',
            [username]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }

        const [result] = await db.execute(
            'INSERT INTO user_table (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
            [firstName, lastName, username, password]
        );

        res.json({ success: true, message: 'User created successfully', userId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/login', async (req, res) => {
    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'atuhub',
            port: 3306
        });

        const { username, password } = req.body;
        const [rows] = await db.execute(
            'SELECT * FROM user_table WHERE username = ? AND password = ?',
            [username, password]
        );

        if (rows.length > 0) {
            res.json({ success: true, message: 'Login successful', userId: rows[0].user_id });
        } else {
            res.json(401).json({ success: false, message: 'Invalid email or password' });
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

app.listen(PORT, clientIp, () => {
    console.log(`Server is running on http://${clientIp}:${PORT}`);
});