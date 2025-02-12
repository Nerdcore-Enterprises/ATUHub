import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './MapSelect.css';

export default function MapSelect() {
    const mapContainerRef = useRef(null);
    const markerRef = useRef(null);
    const [selectedCoords, setSelectedCoords] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        let map;
        const initializeMap = async () => {
            try {
                map = new maplibregl.Map({
                    container: mapContainerRef.current,
                    style: '/api/maptiler?path=maps/hybrid/style.json',
                    center: [-96, 37.8],
                    zoom: 3,
                });

                mapRef.current = map;

                map.on('load', () => {
                    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }));
                    map.addControl(
                        new maplibregl.GeolocateControl({
                            positionOptions: { enableHighAccuracy: true },
                            trackUserLocation: true,
                        })
                    );
                    map.addControl(new maplibregl.FullscreenControl());

                    const vectorSourceUrl = '/api/maptiler?path=tiles/terrain-rgb-v2/tiles.json';

                    map.addSource('openmaptiles', {
                        url: vectorSourceUrl,
                        type: 'vector',
                    });
                });

                map.on('click', (e) => {
                    const { lng, lat } = e.lngLat;
                    setSelectedCoords({ lng, lat });

                    if (markerRef.current) {
                        markerRef.current.setLngLat([lng, lat]);
                    } else {
                        markerRef.current = new maplibregl.Marker({ color: '#FF0000' })
                            .setLngLat([lng, lat])
                            .addTo(map);
                    }
                });
            } catch (error) {
                console.error('Error fetching or processing data:', error);
            }
        };

        initializeMap();

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, []);

    const handleSelectLocation = () => {
        if (selectedCoords) {
            console.log('Selected Coordinates:', selectedCoords);
            alert(`Selected Coordinates:\nLng: ${selectedCoords.lng}\nLat: ${selectedCoords.lat}`);
        } else {
            alert('No location selected. Click on the map to select a location.');
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center h-[82vh] gap-4 scrollbar-hide">
                <div id="map" ref={mapContainerRef} className="w-full rounded-2xl" style={{ height: "100%" }} />
            </div>
            <button
                onClick={handleSelectLocation}
                className="bg-[var(--ATUGreen)] ml-auto rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] w-full"
            >
                Select Location
            </button>
        </>
    );
}