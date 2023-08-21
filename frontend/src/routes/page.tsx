import RoutesString from "@/constants/RoutesString";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound404 from "@/pages/NotFound404";
import SchemaList from "@/pages/Schema/SchemaList";
import AuthGuard from "./AuthGuard";
import AccountList from "@/pages/AccountList";
import SchemaRows from "@/pages/Schema/SchemaRows";

function withAuthGuard(elem: JSX.Element) {
    return <AuthGuard>{elem}</AuthGuard>;
}

export default [
    {
        path: RoutesString.Home,
        element: <Home />,
        errorElement: <NotFound404 />,
        children: [
            { path: RoutesString.Login, element: <Login /> },
            {
                path: RoutesString.Schema,
                element: withAuthGuard(<SchemaList />),
            },
            {
                path: RoutesString.SchemaRows,
                element: withAuthGuard(<SchemaRows />),
            },
            {
                path: RoutesString.Account,
                element: withAuthGuard(<AccountList />),
            },
        ],
    },
];
