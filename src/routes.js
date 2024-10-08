import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "home/",
        element: <HomePage />,
    },
  ]
)

export default routes;