import { CustomException, errorInfo } from "@config";
import { Response } from "express";

export const send200 = (res: Response, data?: any) => {
    return res.status(200).send({ code: 200, message: "success", data });
};

export const send400Error = (res: Response, error: CustomException) => {
    return res.status(400).send({ code: error.code, message: error.message });
};

export const send401UnAuthorized = (res: Response) => {
    return res.status(401).send({ ...errorInfo.UNAUTHORIZED });
};

export const send403AccessDenied = (res: Response) => {
    return res.status(403).send({ ...errorInfo.ACCESS_DENIED });
};

export const send500Error = (res: Response, error: any) => {
    return res.status(500).send({ code: 500, error: error?.toString() });
};
