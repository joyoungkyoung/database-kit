import { useGetSchemaListQuery } from "@/apis/service/schema.service";
import { useAccessToken, useUsername } from "@/stores/auth";
import { Box, Button, Container, Fab, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import SchemaCard from "./SchemaCard";
import { Text } from "@/components";
import "./style.scss";
import { useModal } from "@/hooks";

export default function SchemaList() {
    const [keyword, setKeyword] = useState<string>("");
    const { data, error, status } = useGetSchemaListQuery({ keyword });
    const { openModal } = useModal();

    const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value);
    const openNewSchema = () => {
        openModal("SchemaModal", { state: "create" });
    };

    return (
        <Container className="schema-container">
            <Box className="search-wrapper">
                <Text type="search" value={keyword} onChange={handleChangeKeyword} />
                <Fab className="absolute-right-bottom" color="primary" aria-label="New Schema" onClick={openNewSchema}>
                    <AddIcon />
                </Fab>
            </Box>
            <Box className="schema-card-list">
                {status === "loading" && <Box>Loading...</Box>}
                {status === "error" && <Box>Error: {(error as any).message}</Box>}
                {status === "success" && data?.map((item) => <SchemaCard key={item._id} {...item} />)}
            </Box>
        </Container>
    );
}
