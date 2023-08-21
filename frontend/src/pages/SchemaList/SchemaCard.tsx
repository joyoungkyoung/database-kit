import RoutesString from "@/constants/RoutesString";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface SchemaCardProps {
    _id: string;
    name: string;
}
export default function SchemaCard({ _id, name }: SchemaCardProps) {
    return (
        <Card className="schema-card">
            <CardContent>
                <Link to={RoutesString.SchemaRows.replace(":id", _id)}>
                    <Typography variant="body2">{_id}</Typography>
                    <Typography variant="h5">{name}</Typography>{" "}
                </Link>
            </CardContent>
            <CardActions>
                <Button variant="outlined" color="info">
                    Edit
                </Button>
                <Button variant="outlined" color="error">
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}
