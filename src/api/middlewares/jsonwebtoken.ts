import { send401UnAuthorized, send403AccessDenied } from "config/response";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretKey = "MeK98npTOZ6sMD^@#wGt3^8@1nyPMb";

export const makeToken = (payload: string | object | Buffer) => {
    return jwt.sign(payload, secretKey);
};

export const verifyToken = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.replace("Bearer ", "");
            if (!token) {
                return send401UnAuthorized(res);
            }

            const verify = jwt.verify(token, secretKey);
            next();
        } catch (e) {
            send401UnAuthorized(res);
        }
    };
};
