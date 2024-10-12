import { BrowserRouter, useLocation } from 'react-router-dom';

import React from 'react';
import * as ReactDOM from "react-dom/client";
import './styles/index.css';
import routes from './routes';
import Sidebar from './components/sidebar';

function App() {
    const location = useLocation();

    return (
        <div>
            {routes}
            {location.pathname !== '/' && <Sidebar />}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);