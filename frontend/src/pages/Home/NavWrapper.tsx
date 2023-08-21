import { SideNav } from "@/components";
import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import paths from "./SideNav.path";

export default function NavWrapper({ children }: PropsWithChildren) {
    return (
        <Box className="nav-wrapper">
            <SideNav paths={paths}/>
            <Box className="page-view">{children}</Box>
        </Box>
    );
}
