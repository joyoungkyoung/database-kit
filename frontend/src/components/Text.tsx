import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface TextProps {
    placeholder?: string;
    value?: unknown;
    type?: React.HTMLInputTypeAttribute | "search";
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}
export default function Text({ placeholder, value, type, onChange }: TextProps) {
    const renderStartAdornment = (type: string) => {
        let icon: JSX.Element | null = null;

        if (type === "search") icon = <SearchIcon />;
        return <InputAdornment position="start">{icon}</InputAdornment>;
    };

    return (
        <TextField
            fullWidth
            InputProps={
                type && {
                    startAdornment: renderStartAdornment(type),
                }
            }
            variant="outlined"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            type={type}
        />
    );
}
