import express, { Express, Handler } from "express";
import { controllers } from "@controllers/index";
import { MetadataKeys } from "decorators";
import { IRouter } from "decorators/routers";
import { configInfo } from "@config";
import { verifyToken } from "@middlewares/jsonwebtoken";

type Instance = { [handleName: string]: Handler };

export default async (app: Express) => {
  const info: { [api: string]: string } = {};

  controllers.forEach((c) => {
    const instance: Instance = new c() as any;

    const basePath: string = Reflect.getMetadata(MetadataKeys.BasePath, c);
    const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.Routers, c);

    const router = express.Router();
    const routerBase = configInfo.API_VER + basePath;

    routers.forEach(({ method, path, handlerName, secure }) => {
      const func = String(handlerName);
      if (secure) {
        router[method](path, verifyToken(), instance[func].bind(instance));
      } else {
        router[method](path, instance[func].bind(instance));
      }

      const log = `${c.name}.${func} ${secure ? "-> secure" : ""}`;
      info[`[${method.toLocaleUpperCase()}] ${routerBase + path}`] = log;
    });

    app.use(routerBase, router);
    console.info("router: ", info);
  });
};
