import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import os from 'os';

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
            const url = `https://api.dineoncampus.com/v1/location/5b796d581178e90b837da302/periods?platform=0&date=${date}`;
            console.log(url); // Output the correct URL being fetched
            const response = await fetch(url);

            if (!response.ok) {
                console.error(`Error: Received status ${response.status} from API for date: ${date}`);
                return null;
            }

            const menuData = await response.json();
            return menuData;
        };

        const fetchHoursForDate = async (date) => {
            const url = `https://api.dineoncampus.com/v1/locations/weekly_schedule?site_id=5751fd2490975b60e04891e8`;
            const response = await fetch(url);

            if (!response.ok) {
                console.error(`Error: Received status ${response.status} from API while fetching hours`);
                return null;
            }

            const hoursData = await response.json();
            return hoursData.the_locations.find(loc => loc.name === "Chamber's Dining Hall")?.week.find(day => day.date === date);
        };

        const isLocationClosed = (todayHours) => {
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            if (!todayHours || todayHours.closed) return true;

            const openingTime = todayHours.hours[0]?.start_hour * 60 + todayHours.hours[0]?.start_minutes;
            const closingTime = todayHours.hours[todayHours.hours.length - 1]?.end_hour * 60 + todayHours.hours[todayHours.hours.length - 1]?.end_minutes;

            return !(currentMinutes >= openingTime && currentMinutes < closingTime);
        };

        const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' });
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDate = tomorrow.toLocaleDateString('en-CA', { timeZone: 'America/Chicago' });

        // Fetch today's hours and check if the location is closed
        const chambersHoursToday = await fetchHoursForDate(today);
        const isClosedToday = isLocationClosed(chambersHoursToday);

        let menuData;

        // If closed today, fetch tomorrow's menu, otherwise fetch today's menu
        if (isClosedToday) {
            console.log('Chambers is closed today');
            menuData = await fetchMenuForDate(tomorrowDate); // Fetch tomorrow's menu
        } else {
            console.log('Chambers is open today');
            menuData = await fetchMenuForDate(today); // Fetch today's menu
        }

        if (!menuData || !menuData.menu || !menuData.menu.periods) {
            console.error('Invalid menu data structure:', menuData);
            return res.status(500).send('Invalid menu data structure');
        }

        let periods = [];
        if (Array.isArray(menuData.menu.periods)) {
            periods = menuData.menu.periods;
        } else if (menuData.menu.periods.categories) {
            periods = [menuData.menu.periods];
        }

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