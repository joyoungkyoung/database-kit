import RoutesString from "@/constants/RoutesString";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound404 from "@/pages/NotFound404";
import SchemaList from "@/pages/SchemaList";
import AuthGuard from "./AuthGuard";

export default [
    {
        path: RoutesString.Home,
        element: <Home />,
        errorElement: <NotFound404 />,
        children: [
            { path: RoutesString.Login, element: <Login /> },
            {
                path: RoutesString.Schema,
                element: (
                    <AuthGuard>
                        <SchemaList />
                    </AuthGuard>
                ),
            },
        ],
    },
];
