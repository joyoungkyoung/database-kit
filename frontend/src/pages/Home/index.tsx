import { CustomHeader } from "@/components";
import RoutesString from "@/constants/RoutesString";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavWrapper from "./NavWrapper";
import "./style.scss";

export default function Home() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === RoutesString.Home) navigate(RoutesString.Login);
    }, [location]);

    const hasHeader = location.pathname !== RoutesString.Login;
    if (!hasHeader) return <Outlet />;

    return (
        <>
            <CustomHeader />
            <NavWrapper>
                <Outlet />
            </NavWrapper>
        </>
    );
}
