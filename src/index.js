import React from 'react';
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import './index.css';
import routes from './routes';
import Sidebar from './components/sidebar';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';

function App(){
  const location = useLocation();

  return (
    <div>
      {routes}

      {window.location.pathname !== '/' && <Sidebar/>}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//       <RouterProvider router={routes} />
//       {window.location.pathname !== '/' && <Sidebar/>}
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
