import { ModalPropsType } from "@/contexts/modal/ModalContext";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

export default function TwoButtonModal({ onClose, onSubmit, title, message }: ModalPropsType) {
    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>{title || "title"}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message || "message"}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">
                    Cancel
                </Button>
                <Button onClick={onSubmit} autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}
