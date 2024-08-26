import { AuthService } from "@services";
import { Post, RestController } from "decorators";
import { send200 } from "config/response";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";

@RestController("/auth")
export default class AuthController {
  @Post("/sign-up")
  async signup(req: Request, res: Response, next: NextFunction) {
    const dto = req.body;
    const service = Container.get(AuthService);

    try {
      const response = await service.signup(dto);
      send200(res, { username: response.username });
    } catch (e: any) {
      next(e);
    }
  }

  @Post("/login")
  async login(req: Request, res: Response, next: NextFunction) {
    const dto = req.body;
    const service = Container.get(AuthService);

    try {
      const response = await service.login(dto);
      send200(res, response);
    } catch (e: any) {
      next(e);
    }
  }

  @Post("/find-pw")
  async findPassword(req: Request, res: Response) {}
}
