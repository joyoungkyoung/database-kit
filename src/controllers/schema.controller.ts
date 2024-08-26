import { SchemaService } from "@services";
import { send200 } from "config/response";
import { Get, Post, Put, RestController } from "decorators";
import { NextFunction, Request, Response, response } from "express";
import Container from "typedi";

@RestController("/schema")
export default class SchemaController {
  @Get("/", { secure: true })
  async getList(req: Request, res: Response, next: NextFunction) {
    const dto = req.query;
    const schemaService = Container.get(SchemaService);

    try {
      const response = await schemaService.getList(dto);
      return send200(res, response);
    } catch (e: any) {
      next(e);
    }
  }

  @Get("/:id", { secure: true })
  async getItemList(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const dto = { id };
    const schemaService = Container.get(SchemaService);

    try {
      const response = await schemaService.getItemList(dto);
      return send200(res, response);
    } catch (e: any) {
      next(e);
    }
  }

  @Post("/", { secure: true })
  async create(req: Request, res: Response, next: NextFunction) {
    const dto = req.body;
    const schemaService = Container.get(SchemaService);

    try {
      const response = await schemaService.create(dto);
      return send200(res, response);
    } catch (e: any) {
      next(e);
    }
  }

  @Post("/row", { secure: true })
  async addRow(req: Request, res: Response, next: NextFunction) {
    const dto = req.body;
    const schemaService = Container.get(SchemaService);

    try {
      const response = await schemaService.addRow(dto);
      return send200(res, response);
    } catch (e) {
      next(e);
    }
  }

  @Get("/row", { secure: true })
  async getRow(req: Request, res: Response, next: NextFunction) {
    const dto = { schemaValueId: req.query.schemaValueId as string };
    const schemaService = Container.get(SchemaService);

    try {
      const response = await schemaService.getRow(dto);
      return send200(res, response);
    } catch (e) {
      next(e);
    }
  }

  @Put("/row", { secure: true })
  async updateRow(req: Request, res: Response, next: NextFunction) {
    const dto = req.body;
    const schemaService = Container.get(SchemaService);

    try {
      const response = await schemaService.updateRow(dto);
      return send200(res, response);
    } catch (e) {
      next(e);
    }
  }

  @Put("/", { secure: true })
  async updateSchema(req: Request, res: Response, next: NextFunction) {
    const dto = { ...req.body, userId: req.userId };
    const schemaService = Container.get(SchemaService);

    try {
      const response = await schemaService.update(dto);
      return send200(res, response);
    } catch (e: any) {
      next(e);
    }
  }

  @Post("/remove", { secure: true })
  async removeSchema(req: Request, res: Response, next: NextFunction) {
    const dto = { ...req.body, userId: req.userId };
    const schemaService = Container.get(SchemaService);

    try {
      const response = await schemaService.remove(dto);
      return send200(res, response);
    } catch (e: any) {
      next(e);
    }
  }

  @Post("/delete", { secure: true })
  async deleteSchema(req: Request, res: Response, next: NextFunction) {
    const dto = req.body;
    const schemaService = Container.get(SchemaService);

    try {
      const response = await schemaService.delete(dto);
      return send200(res, response);
    } catch (e: any) {
      next(e);
    }
  }
}
