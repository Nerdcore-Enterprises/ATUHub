import React, { useEffect, useState } from 'react';

export default function RadarWidget() {
    const [radarUrl, setRadarUrl] = useState('');

    useEffect(() => {
        const fetchRadarImage = async () => {
            try {
                const response = await fetch('/api/weather/radar');
                setRadarUrl(response.url);
            } catch (error) {
                console.error('Error fetching radar image:', error);
            }
        };

        fetchRadarImage();
    }, []);

    return (
        <div className="bg-white rounded-[2rem] px-5 py-4 w-full h-fit shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
            {radarUrl ? (
                <img src={radarUrl} alt="Weather Radar" className="w-full h-auto" />
            ) : (
                <p>Loading radar image...</p>
            )}
        </div>
    );
};
