import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import MousePosition from 'ol/control/MousePosition.js';
import {defaults as defaultControls} from 'ol/control/defaults.js';
import {createStringXY} from 'ol/coordinate.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import { fromLonLat } from "ol/proj";
import './MapSelect.css'


export default function MapSelect({onClick}){
    const mapRef = useRef(null);
    const [currentCoords, setCurrentCoords] = useState(null)

    const getCoords = () => {
        let mouse_div = document.getElementsByClassName("custom-mouse-position")[0]
        let coords = mouse_div.textContent.split(',')
        coords[0] = parseFloat(coords[0])
        coords[1] = parseFloat(coords[1])
        setCurrentCoords(coords);
    }

    useEffect(() => {
        if (mapRef.current) {
            const mousePositionControl = new MousePosition({
                coordinateFormat: createStringXY(4),
                projection: 'EPSG:4326',
                // comment the following two lines to have the mouse position
                // be placed within the map.
                className: 'custom-mouse-position',
                target: document.getElementById('mouse-position'),
            });

            const map = new Map({
                controls: defaultControls().extend([mousePositionControl]),
                layers: [
                    new TileLayer({
                    source: new OSM(),
                    }),
                ],
                target: 'map',
                view: new View({
                    center: fromLonLat([-93.1364, 35.2950]),
                    zoom: 15,
                }),
            });
            
            return () => map.setTarget(null);
        }
    }, []);

    return (
        <>
            <div className='map-container'>
                <div ref={mapRef} id="map" className="map" onClick={(e) => {getCoords()}}></div>
            </div>
            <button onClick={onClick} className="bg-[var(--ATUGreen)] ml-auto rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] w-full">
                Select Location
            </button>
        </>
    );
}