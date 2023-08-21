import { useGetSchemaListQuery } from "@/apis/service/schema.service";
import { useAccessToken, useUsername } from "@/stores/auth";
import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import SchemaCard from "./SchemaCard";
import { Text } from "@/components";
import "./style.scss";

export default function SchemaList() {
    const [keyword, setKeyword] = useState<string>("");
    const username = useUsername();
    const accessToken = useAccessToken();
    const { data, error, status } = useGetSchemaListQuery({ keyword });

    const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value);

    useEffect(() => {
        console.log(username, accessToken);
    }, []);

    return (
        <Container className="schema-container">
            <Box className="search-wrapper">
                <Text type="search" value={keyword} onChange={handleChangeKeyword} />
            </Box>
            <Box className="schema-card-list">
                {status === "loading" && <Box>Loading...</Box>}
                {status === "error" && <Box>Error: {(error as any).message}</Box>}
                {status === "success" && data?.map((item) => <SchemaCard key={item._id} {...item} />)}
            </Box>
        </Container>
    );
}
