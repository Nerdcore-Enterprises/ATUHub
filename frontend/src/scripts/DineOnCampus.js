export const fetchHours = async () => {
    try {
        const response = await fetch('http://10.102.9.213:5000/api/hours');

        const data = await response.json();
        const now = new Date();
        const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

        const updatedLocations = data.map(location => {
            const todayHours = location.today.hours;
            let isOpen = false;
            let openingTimeInMinutes = null;
            let closingTimeInMinutes = null;
            let statusMessage = 'Closed';

            if (todayHours.length > 0 && !location.today.closed) {
                const openingHours = todayHours[0];
                const closingHours = todayHours[todayHours.length - 1];

                openingTimeInMinutes = openingHours.start_hour * 60 + openingHours.start_minutes;
                closingTimeInMinutes = closingHours.end_hour * 60 + closingHours.end_minutes;

                if (currentTimeInMinutes >= openingTimeInMinutes && currentTimeInMinutes < closingTimeInMinutes) {
                    isOpen = true;
                    statusMessage = 'Open';
                } else if (currentTimeInMinutes < openingTimeInMinutes && openingTimeInMinutes - currentTimeInMinutes <= 60) {
                    const minutesToOpen = openingTimeInMinutes - currentTimeInMinutes;
                    statusMessage = `Opening in ${minutesToOpen} minutes`;
                } else if (currentTimeInMinutes >= closingTimeInMinutes - 60 && currentTimeInMinutes < closingTimeInMinutes) {
                    const minutesToClose = closingTimeInMinutes - currentTimeInMinutes;
                    statusMessage = `Closing in ${minutesToClose} minutes`;
                }
            }

            const cleanedName = location.name
                .replace(/'We Proudly Serve'/i, '')
                .trim();

            return {
                name: cleanedName,
                statusMessage,
                isOpen,
                openingTimeInMinutes,
                closingTimeInMinutes,
                todayHours,
            };
        });

        let earliestStartHour = null;
        let latestEndHour = null;

        updatedLocations.forEach(location => {
            location.todayHours.forEach(hour => {
                const startHourInMinutes = hour.start_hour * 60 + hour.start_minutes;
                const endHourInMinutes = hour.end_hour * 60 + hour.end_minutes;

                if (earliestStartHour === null || startHourInMinutes < earliestStartHour) {
                    earliestStartHour = startHourInMinutes;
                }

                if (latestEndHour === null || endHourInMinutes > latestEndHour) {
                    latestEndHour = endHourInMinutes;
                }
            });
        });

        const formatTime = (timeInMinutes) => {
            const hours = Math.floor(timeInMinutes / 60);
            const minutes = timeInMinutes % 60;
            const period = hours >= 12 ? 'PM' : 'AM';
            const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            return `${formattedHour}:${formattedMinutes} ${period}`;
        };

        const earliestStartTime = earliestStartHour !== null ? formatTime(earliestStartHour) : null;
        const latestEndTime = latestEndHour !== null ? formatTime(latestEndHour) : null;

        return {
            earliestStart: earliestStartTime,
            latestEnd: latestEndTime,
            locationsHours: updatedLocations,
        };
    } catch (error) {
        console.error('Error fetching hours:', error);
        return {
            earliestStart: null,
            latestEnd: null,
            locationsHours: [],
        };
    }
};

export const fetchMenu = async () => {
    try {
        const response = await fetch('http://10.102.9.213:5000/api/chambers/menu');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const menuData = await response.json();

        return menuData;
    } catch (error) {
        console.error('Error fetching Chambers menu:', error);
        return [];
    }
};