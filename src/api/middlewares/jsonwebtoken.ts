import { send401UnAuthorized, send403AccessDenied } from "config/response";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = () => {
    console.log("asdasdasdasdasdas");
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.body.token;

            const verify = jwt.verify(token, "asdasda");

            console.log("verify:", verify);
            send403AccessDenied(res);
        } catch (e) {
            send401UnAuthorized(res);
        }
    };
};
