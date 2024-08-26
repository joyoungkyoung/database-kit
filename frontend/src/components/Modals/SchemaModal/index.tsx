import { ModalPropsType } from "@/contexts/modal/ModalContext";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import ColumnCard, { ColumnCardRef } from "./ColumnCard";
import { useRef, useState } from "react";

export default function SchemaModal({ onClose, onSubmit, state }: ModalPropsType) {
    const [columns, setColumns] = useState<number[]>([0]);
    const columnsRefs = useRef<(ColumnCardRef | null)[]>([]);

    const isCreate = state === "create";
    const isUpdate = state === "update";

    const addColumn = () => {
        setColumns([...columns, columns.length]);
    };

    const test = () => {
        console.log(columnsRefs.current.map((c) => c?.column));
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>{isCreate ? "스키마 추가" : isUpdate ?? "스키마 수정"}</DialogTitle>
            <DialogContent>
                <Stack padding={1} spacing={1}>
                    <Button onClick={test}>test</Button>
                    <Typography>기본 정보</Typography>
                    <TextField label="Schema's name" fullWidth />
                    <TextField label="Memo" fullWidth />
                    <Divider />
                    <Typography>컬럼</Typography>
                    <Stack spacing={2}>
                        {columns.map((_, index) => (
                            <ColumnCard key={index} ref={(el) => (columnsRefs.current[index] = el)} />
                        ))}
                        <Button variant="outlined" onClick={addColumn}>
                            컬럼 추가
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">
                    취소
                </Button>
                <Button onClick={onSubmit} autoFocus>
                    추가
                </Button>
            </DialogActions>
        </Dialog>
    );
}
