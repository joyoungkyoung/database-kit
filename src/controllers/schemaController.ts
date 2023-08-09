import { SchemaService } from "@services";
import { Request, Response } from "express";
import Container from "typedi";

const create = (req: Request, res: Response) => {
    const schemaService = Container.get(SchemaService);
};

export default {
    create,
};
