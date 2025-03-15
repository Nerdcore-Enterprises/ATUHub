import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';
import GreenButton from '../Buttons/GreenButton';
import GenericPage from '../genericPage';
import HeaderWithBack from '../HeaderWithBack';

export default function MapSelect({ nextPage }) {
    const [selectedCoords, setSelectedCoords] = useState(null);
    const mapContainerRef = useRef(null);
    const markerRef = useRef(null);
    const mapRef = useRef(null);
    const navigate = useNavigate();

    const handleNav = (path, props) => {
        navigate(path, props);
    };

    useEffect(() => {
        let map;
        const initializeMap = async () => {
            try {
                map = new maplibregl.Map({
                    container: mapContainerRef.current,
                    style: '/api/maptiler?path=maps/hybrid/style.json',
                    center: [-93.134, 35.279],
                    zoom: 12,
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
            handleNav(nextPage, { state: { lng: selectedCoords.lng, lat: selectedCoords.lat } });
        } else {
            alert('No location selected. Click on the map to select a location.');
        }
    };

    return (
        <GenericPage>
            <HeaderWithBack>Select a Location</HeaderWithBack>
            <div className="flex flex-col justify-center items-center h-[82vh] gap-4 scrollbar-hide">
                <div id="map" ref={mapContainerRef} className="w-full rounded-2xl" style={{ height: "100%" }} />
            </div>
            <GreenButton
                className='w-full'
                onClick={handleSelectLocation}
            >
                Select Location
            </GreenButton>
        </GenericPage>
    );
}