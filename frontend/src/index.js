import { BrowserRouter, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import * as ReactDOM from 'react-dom/client';
import './styles/index.css';
import routes from './routes';
import Sidebar from './components/sidebar';

function App() {
    const location = useLocation();

    const storeVisitedPage = (path) => {
        const visitedPages = JSON.parse(localStorage.getItem('visitedPages')) || [];
        if (!visitedPages.includes(path)) {
            visitedPages.push(path);
            localStorage.setItem('visitedPages', JSON.stringify(visitedPages));
        }
    };

    useEffect(() => {
        storeVisitedPage(location.pathname);
    }, [location.pathname]);

    const getVisitedPages = () => {
        return JSON.parse(localStorage.getItem('visitedPages')) || [];
    };

    return (
        <div>
            {routes}
            {location.pathname !== '/' && <Sidebar />}
            <div>
                <h2>Visited Pages:</h2>
                <ul>
                    {getVisitedPages().map((page, index) => (
                        <li key={index}>{page}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);