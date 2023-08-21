import RoutesString, { RoutesPathType } from "@/constants/RoutesString";
import { ReactNode } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export type SideNavPathType = {
    label: string;
    to: RoutesPathType;
    icon?: ReactNode;
};
const paths: SideNavPathType[] = [
    { label: "Schema", to: RoutesString.Schema },
    { label: "Account", to: RoutesString.Account, icon: <AccountCircleIcon /> },
];

export default paths;
