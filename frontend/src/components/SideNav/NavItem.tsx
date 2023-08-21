import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import { NavLink } from "react-router-dom";
import { RoutesPathType } from "@/constants/RoutesString";
import { ReactNode } from "react";

interface NavItemProps {
    label: string;
    to: RoutesPathType;
    icon?: ReactNode;
}
export default function NavItem({ label, to, icon }: NavItemProps) {
    return (
        <ListItem className="nav-item">
            <NavLink to={to}>
                <ListItemButton>
                    <ListItemIcon>{icon ? icon : <InboxIcon />}</ListItemIcon>
                    <ListItemText primary={label} />
                </ListItemButton>
            </NavLink>
        </ListItem>
    );
}
