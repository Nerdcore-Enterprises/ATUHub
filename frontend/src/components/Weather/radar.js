import React, { useEffect, useState } from 'react';
import Widget from '../BaseWidgets/Widget';

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
        <Widget className='px-5 py-4 '>
            {radarUrl ? (
                <img src={radarUrl} alt="Weather Radar" className="w-full h-auto" />
            ) : (
                <p>Loading radar image...</p>
            )}
        </Widget>
    );
};
