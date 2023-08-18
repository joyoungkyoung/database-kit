import RoutesString from "@/routes/RoutesString";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Home() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === RoutesString.Home) navigate(RoutesString.Login);
    }, [location]);

    return <Outlet />;
}
