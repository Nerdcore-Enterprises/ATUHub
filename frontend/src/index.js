import React from 'react';
import { BrowserRouter } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import './styles/default.css';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

serviceWorkerRegistration.register();
reportWebVitals();