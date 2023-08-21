import { useRemoveSchemaMutation } from "@/apis/service/schema.service";
import RoutesString from "@/constants/RoutesString";
import { useModal } from "@/hooks";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface SchemaCardProps {
    _id: string;
    name: string;
}
export default function SchemaCard({ _id, name }: SchemaCardProps) {
    const { openModal, closeModal } = useModal();
    const { mutateAsync: reqRemove } = useRemoveSchemaMutation();

    const handleClickDelete = () => {
        openModal("TwoButtonModal", {
            title: "스키마 삭제",
            message: "선택한 스키마를 삭제하시겠습니까?",
            onSubmit: () => {
                reqRemove({ _id })
                    .then(({ data }) => {
                        console.log(data);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            },
        });
    };

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
                <Button variant="outlined" color="error" onClick={handleClickDelete}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}
