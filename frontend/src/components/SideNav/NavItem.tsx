import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import { NavLink } from "react-router-dom";
import { RoutesPathType } from "@/constants/RoutesString";
import classNames from "classnames";

interface NavItemProps {
    label: string;
    to: RoutesPathType;
    icon?: JSX.Element;
}
export default function NavItem({ label, to, icon }: NavItemProps) {
    return (
        <ListItem className="nav-item">
            <NavLink to={to}>
                {({ isActive }) => (
                    <ListItemButton className={classNames({ active: isActive })}>
                        <ListItemIcon>{icon ? icon : <InboxIcon />}</ListItemIcon>
                        <ListItemText primary={label} />
                    </ListItemButton>
                )}
            </NavLink>
        </ListItem>
    );
}
