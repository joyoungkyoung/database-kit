import RoutesString from "@/constants/RoutesString";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { SideNavPathType } from "@/components/SideNav";


const paths: SideNavPathType[] = [
    { label: "Schema", to: RoutesString.Schema },
    { label: "Account", to: RoutesString.Account, icon: <AccountCircleIcon /> },
];

export default paths;
