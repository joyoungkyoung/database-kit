import { CustomException } from "@config";
import { AuthService } from "@services";
import { send200, send400Error, send500Error } from "config/response";
import { Request, Response } from "express";
import Container from "typedi";

const signup = async (req: Request, res: Response) => {
    const dto = req.body;
    const service = Container.get(AuthService);

    try {
        const response = await service.signup(dto);
        send200(res, { username: response.username });
    } catch (e: any) {
        if (e instanceof CustomException) return send400Error(res, e);
        send500Error(res, e);
    }
};

const login = async (req: Request, res: Response) => {
    const dto = req.body;
    const service = Container.get(AuthService);

    try {
        const response = await service.login(dto);
        send200(res);
    } catch (e: any) {
        if (e instanceof CustomException) return send400Error(res, e);
        send500Error(res, e);
    }
};

const findId = (req: Request, res: Response) => {};

const findPassword = (req: Request, res: Response) => {};

export default {
    signup,
    login,
    findId,
    findPassword,
};
