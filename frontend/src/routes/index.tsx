import { createBrowserRouter } from "react-router-dom";
import RoutesString from "./RoutesString";
import Home from "@/pages/Home";
import NotFound404 from "@/pages/NotFound404";
import Login from "@/pages/Login";

const router = createBrowserRouter([
    {
        path: RoutesString.Home,
        element: <Home />,
        errorElement: <NotFound404 />,
        children: [
            { path: RoutesString.Login, element: <Login /> },
            { path: "", element: null },
        ],
    },
]);

export default router;
