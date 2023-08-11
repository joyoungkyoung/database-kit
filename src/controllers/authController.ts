import { AuthService } from "@services";
import { send200 } from "config/response";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";

const signup = async (req: Request, res: Response, next: NextFunction) => {
    const dto = req.body;
    const service = Container.get(AuthService);

    try {
        const response = await service.signup(dto);
        send200(res, { username: response.username });
    } catch (e: any) {
        next(e);
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    const dto = req.body;
    const service = Container.get(AuthService);

    try {
        const response = await service.login(dto);
        send200(res, response);
    } catch (e: any) {
        next(e);
    }
};

const findPassword = async (req: Request, res: Response) => {};

export default {
    signup,
    login,
    findPassword,
};
