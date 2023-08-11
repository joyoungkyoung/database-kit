import { SchemaService } from "@services";
import { send200 } from "config/response";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";

const getList = async (req: Request, res: Response, next: NextFunction) => {
    const dto = req.query;
    const schemaService = Container.get(SchemaService);

    try {
        const response = await schemaService.getList(dto);
        return send200(res, response);
    } catch (e: any) {
        next(e);
    }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
    const dto = req.body;
    const schemaService = Container.get(SchemaService);

    try {
        const response = await schemaService.create(dto);
        return send200(res, response);
    } catch (e: any) {
        next(e);
    }
};

const updateSchema = async (req: Request, res: Response) => {
    const schemaService = Container.get(SchemaService);
};

const removeSchema = async (req: Request, res: Response, next: NextFunction) => {
    const dto = { ...req.body, userId: req.userId };

    const schemaService = Container.get(SchemaService);

    try {
        const response = await schemaService.remove(dto);
        return send200(res, response);
    } catch (e: any) {
        next(e);
    }
};

const deleteSchema = async (req: Request, res: Response, next: NextFunction) => {
    const dto = { ...req.body, userId: req.userId };
    console.log(req);
    const schemaService = Container.get(SchemaService);

    try {
        const response = await schemaService.delete(dto);
        return send200(res, response);
    } catch (e: any) {
        next(e);
    }
};

export default {
    getList,
    create,
    updateSchema,
    removeSchema,
    deleteSchema,
};
