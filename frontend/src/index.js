import { BrowserRouter, useLocation } from 'react-router-dom';

import React from 'react';
import * as ReactDOM from "react-dom/client";
import './styles/default.css'
import './styles/index.css';
import routes from './routes';
import Sidebar from './components/sidebar';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

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

serviceWorkerRegistration.register();
reportWebVitals();