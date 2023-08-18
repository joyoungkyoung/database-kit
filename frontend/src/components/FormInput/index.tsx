import { TextField } from "@mui/material";
import { HTMLInputTypeAttribute } from "react";
import { Controller } from "react-hook-form";

interface FormInputProps {
    name: string;
    control: any;
    label: string;
    type?: HTMLInputTypeAttribute;
}
export default function FormInput({ name, control, label, type }: FormInputProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                    label={label}
                    value={value}
                    variant="outlined"
                    fullWidth
                    onChange={onChange}
                    error={!!error}
                    helperText={error?.message}
                    type={type}
                />
            )}
        />
    );
}
