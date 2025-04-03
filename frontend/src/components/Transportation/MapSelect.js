import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';
import GreenButton from '../Buttons/GreenButton';
import GenericPage from '../genericPage';
import HeaderWithBack from '../HeaderWithBack';
import ContentDiv from '../WidgetContainers/ContentDiv';

export default function MapSelect({ nextPage }) {
    const [selectedCoords, setSelectedCoords] = useState(null);
    const [userCoords, setUserCoords] = useState(null);
    const userCoordsRef = useRef(null);
    const mapContainerRef = useRef(null);
    const markerRef = useRef(null);
    const mapRef = useRef(null);
    const navigate = useNavigate();

    const handleNav = (path, props) => {
        navigate(path, props);
    };

    const fetchRoute = async (start, end) => {
        try {
            const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;
            const res = await fetch(url);
            const data = await res.json();
            if (data.routes && data.routes[0]) {
                return data.routes[0].geometry;
            }
        } catch (error) {
            console.error("Error fetching route:", error);
        }
        return null;
    };

    const displayRoute = (map, routeGeometry) => {
        const routeGeoJSON = {
            type: 'Feature',
            properties: {},
            geometry: routeGeometry
        };

        if (map.getSource('routeLine')) {
            map.getSource('routeLine').setData(routeGeoJSON);
        } else {
            map.addSource('routeLine', {
                type: 'geojson',
                data: routeGeoJSON
            });
            map.addLayer({
                id: 'routeLine',
                type: 'line',
                source: 'routeLine',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#F00',
                    'line-width': 6
                }
            });
        }
    };

    useEffect(() => {
        userCoordsRef.current = userCoords;
    }, [userCoords]);

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
                    const geolocateControl = new maplibregl.GeolocateControl({
                        positionOptions: { enableHighAccuracy: true },
                        trackUserLocation: true,
                    });
                    map.addControl(geolocateControl);
                    map.addControl(new maplibregl.FullscreenControl());

                    geolocateControl.on('geolocate', (e) => {
                        const currentCoords = { lng: e.coords.longitude, lat: e.coords.latitude };
                        setUserCoords(currentCoords);
                    });

                    const vectorSourceUrl = '/api/maptiler?path=tiles/terrain-rgb-v2/tiles.json';
                    map.addSource('openmaptiles', {
                        url: vectorSourceUrl,
                        type: 'vector',
                    });
                });

                map.on('click', async (e) => {
                    const { lng, lat } = e.lngLat;
                    setSelectedCoords({ lng, lat });

                    if (markerRef.current) {
                        markerRef.current.setLngLat([lng, lat]);
                    } else {
                        markerRef.current = new maplibregl.Marker({ color: '#FF0000' })
                            .setLngLat([lng, lat])
                            .addTo(map);
                    }

                    if (userCoordsRef.current) {
                        const routeGeometry = await fetchRoute(userCoordsRef.current, { lng, lat });
                        if (routeGeometry) {
                            displayRoute(map, routeGeometry);
                        }
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
            <ContentDiv className='sticky bottom-0 py-5 z-10'>
                <GreenButton className='w-full' onClick={handleSelectLocation}>
                    Select Location
                </GreenButton>
            </ContentDiv>
        </GenericPage>
    );
}