import { useInput } from "@/hooks";
import { ColumnType } from "@/types/schema";
import { Card, CardContent, Checkbox, FormControlLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { ForwardedRef, forwardRef, useImperativeHandle } from "react";

export type ColumnCardRef = {
    column: ColumnType;
    new: () => ColumnType;
};

function ColumnCard(_: unknown, ref: ForwardedRef<ColumnCardRef>) {
    const initVal: ColumnType = { name: "", memo: "", type: "Number", isRequire: false };
    const { input: column, onChangeInput, onChangeSelect } = useInput<ColumnType>(initVal);

    useImperativeHandle(ref, () => ({
        column,
        new: () => initVal,
    }));

    return (
        <Card variant="outlined">
            <CardContent>
                <Stack spacing={1}>
                    <Stack direction={"row"} spacing={1}>
                        <TextField label="컬럼명" name="name" value={column.name} onChange={onChangeInput} />
                        <Select name="type" value={column.type} onChange={onChangeSelect}>
                            <MenuItem value={"Number"}>Number</MenuItem>
                            <MenuItem value={"String"}>String</MenuItem>
                            <MenuItem value={"Boolean"}>Boolean</MenuItem>
                            <MenuItem value={"Image"}>Image</MenuItem>
                        </Select>
                        <FormControlLabel
                            control={<Checkbox name="isRequire" onChange={onChangeInput} />}
                            label="필수"
                        />
                    </Stack>
                    <TextField label="메모" name="memo" value={column.memo} onChange={onChangeInput} fullWidth />
                </Stack>
            </CardContent>
        </Card>
    );
}

const withForwardRef = forwardRef(ColumnCard);
withForwardRef.displayName = "ColumnCard";

export default withForwardRef;
