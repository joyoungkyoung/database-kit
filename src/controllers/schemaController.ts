import { SchemaService } from "@services";
import { send200 } from "config/response";
import { NextFunction, Request, Response, response } from "express";
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

const addRow = async (req: Request, res: Response, next: NextFunction) => {
    const dto = req.body;
    const schemaService = Container.get(SchemaService);

    try {
        const response = await schemaService.addRow(dto);
        return send200(res, response);
    } catch (e) {
        next(e);
    }
};

const getRow = async (req: Request, res: Response, next: NextFunction) => {
    const dto = { schemaValueId: req.query.schemaValueId as string };
    const schemaService = Container.get(SchemaService);

    try {
        const response = await schemaService.getRow(dto);
        return send200(res, response);
    } catch (e) {
        next(e);
    }
};

const updateRow = async (req: Request, res: Response, next: NextFunction) => {
    const dto = req.body;
    const schemaService = Container.get(SchemaService);

    try {
        const response = await schemaService.updateRow(dto);
        return send200(res, response);
    } catch (e) {
        next(e);
    }
};

const updateSchema = async (req: Request, res: Response, next: NextFunction) => {
    const dto = { ...req.body, userId: req.userId };
    const schemaService = Container.get(SchemaService);

    try {
        const response = await schemaService.update(dto);
        return send200(res, response);
    } catch (e: any) {
        next(e);
    }
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
    const dto = req.body;
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
    addRow,
    getRow,
    updateRow,
    updateSchema,
    removeSchema,
    deleteSchema,
};
