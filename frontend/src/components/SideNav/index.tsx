import { Box, Divider, Drawer, IconButton, List } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useActiveBoolean } from "@/hooks";
import classNames from "classnames";
import NavItem from "./NavItem";
import "./style.scss";
import { RoutesPathType } from "@/constants/RoutesString";

export type SideNavPathType = {
    label: string;
    to: RoutesPathType;
    icon?: JSX.Element;
};

interface SideNavProps {
    paths: SideNavPathType[];
}
export default function SideNav({ paths }: SideNavProps) {
    const { active: open, toggleActive: toggleOpen } = useActiveBoolean();

    return (
        <Box className={classNames("side-nav", { open, close: !open })}>
            <Drawer className="side-nav-drawer" variant="permanent" open={open}>
                <div className="drawer-header">
                    <IconButton onClick={toggleOpen}>{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
                </div>

                <Divider />
                <List className="nav-list">
                    {paths.map((p) => (
                        <NavItem key={p.label} {...p} />
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
