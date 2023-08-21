import { Text } from "@/components";
import { Box, Container } from "@mui/material";

export default function SchemaRows() {
    return (
        <Container className="schema-rows-container">
            <Box className="search-wrapper">
                <Text type="search" />
            </Box>
            <Box></Box>
        </Container>
    );
}
