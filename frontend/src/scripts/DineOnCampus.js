export const fetchHours = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/hours');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Hours Data:', JSON.stringify(data, null, 2));

        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        const updatedLocations = data.map(location => {
            const todayHours = location.today.hours;
            const isOpen = todayHours.length > 0 && !location.today.closed;

            let closingTime = '';
            if (isOpen) {
                const lastHours = todayHours[todayHours.length - 1];
                const closeHour = lastHours.end_hour;
                const closeMinutes = lastHours.end_minutes;
                const closingTimeInMinutes = closeHour * 60 + closeMinutes;
                const timeLeft = closingTimeInMinutes - currentTime;

                if (timeLeft > 0) {
                    const hoursLeft = Math.floor(timeLeft / 60);
                    const minutesLeft = timeLeft % 60;
                    closingTime = `${hoursLeft} hours and ${minutesLeft} minutes left until closing`;
                } else {
                    closingTime = 'Closed today';
                }
            }

            const cleanedName = location.name
                .replace(/We Proudly Serve/i, '')
                .replace(/- Baz Tech/i, '')
                .replace(/- Hull/i, '')
                .trim();

            return {
                name: cleanedName,
                closingTime: isOpen ? closingTime : 'Closed today',
                isOpen: isOpen,
                todayHours,
            };
        });

        let earliestStartHour = null;
        let latestEndHour = null;

        updatedLocations.forEach(location => {
            const todayHours = location.todayHours;

            todayHours.forEach(hour => {
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
            const formattedHour = hours % 12 === 0 ? 12 : hours % 12; // convert 0 to 12
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            return `${formattedHour}:${formattedMinutes} ${period}`;
        };

        const earliestStartTime = earliestStartHour !== null ? formatTime(earliestStartHour) : 'N/A';
        const latestEndTime = latestEndHour !== null ? formatTime(latestEndHour) : 'N/A';

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