export class CustomException extends Error {
    public code: string;

    constructor(err: { code: string; message: string | undefined }) {
        super();
        this.name = "CustomError";
        this.code = err.code;
        this.message = err.message || "";
    }
}
