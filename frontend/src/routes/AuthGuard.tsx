import RoutesString from "@/constants/RoutesString";
import { useAccessToken } from "@/stores/auth";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }: PropsWithChildren) {
    const accessToken = useAccessToken();

    if (!accessToken) return <Navigate to={RoutesString.Login} />;
    return children;
}
