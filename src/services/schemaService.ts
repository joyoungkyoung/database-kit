import { Service } from "typedi";
import { SchemaColumnModel, SchemaModel, ValueType } from "@models";
import { CustomException, errorInfo } from "@config";
import { withTransaction } from "@middlewares/mongoose";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

@Service()
export default class SchemaService {
    constructor() {}

    public async getList(dto: { sort?: number }) {
        const { sort } = dto;

        let sortCond: any = {};
        switch (sort) {
            case 1:
            default:
                sortCond = { id: 1 };
                break;
        }

        const list = await SchemaModel.find({ deletedAt: { $exists: false } }).sort({ ...sortCond });

        return list;
    }

    public async create(dto: {
        name: string;
        memo?: string;
        columns: { name: string; type: ValueType; isRequire?: boolean; memo?: string }[];
    }) {
        const { name, memo, columns } = dto;

        const filtered = columns.filter((v, i) => columns.findIndex((x) => x.name === v.name) === i);
        if (filtered.length !== columns.length) throw new CustomException(errorInfo.DUPLICATED_SCHEMA_COLUMNS_NAME);

        const findSchema = await SchemaModel.findOne({ name });
        if (findSchema) throw new CustomException(errorInfo.DUPLICATED_SCHEMA_NAME);

        const result = await withTransaction(async (session) => {
            // 스키마 틀 생성
            const schema = new SchemaModel({ name, memo });
            const resSchema = await schema.save();
            // 스키마 컬럼 생성
            const schemaColumn = new SchemaColumnModel({ schemaId: resSchema.id, info: columns });
            const resSchemaColumn = await schemaColumn.save();

            return { schemaId: resSchema.id, schemaColumnId: resSchemaColumn.id };
        });

        return result;
    }

    public async remove(dto: { userId: string; idList: string[] }) {
        const { userId, idList } = dto;

        const _idList = idList.map((id) => new ObjectId(id));

        const res = await SchemaModel.updateMany(
            { _id: { $in: _idList } },
            { $set: { deletedAt: Date.now(), deletedBy: new ObjectId(userId) } }
        );
    }

    public async delete(dto: { idList: string[] }) {}
}
