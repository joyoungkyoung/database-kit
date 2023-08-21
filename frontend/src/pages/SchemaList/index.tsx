import { useGetSchemaListQuery } from "@/apis/service/schema.service";
import { useAccessToken, useUsername } from "@/stores/user";
import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import SchemaCard from "./SchemaCard";

import "./style.scss";
import { Text } from "@/components";

export default function SchemaList() {
    const username = useUsername();
    const accessToken = useAccessToken();
    const { isLoading, isError, data, error } = useGetSchemaListQuery();

    useEffect(() => {
        console.log(username, accessToken);
    }, []);

    if (isLoading) return <Box>Loading...</Box>;
    if (isError) return <Box>Error: {(error as any).message}</Box>;

    return (
        <Container className="schema-container">
            <Box className="search-wrapper">
                <Text type="search" />
            </Box>
            <Box className="schema-card-list">
                {data?.map((item) => (
                    <SchemaCard key={item._id} {...item} />
                ))}
            </Box>
        </Container>
    );
}
