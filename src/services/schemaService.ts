import { Service } from "typedi";
import { SchemaColumnModel, SchemaModel, SchemaValueModel, ValueType } from "@models";
import { CustomException, errorInfo } from "@config";
import { withTransaction } from "@middlewares/mongoose";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;
const DocumentArray = mongoose.Types.DocumentArray;

@Service()
export default class SchemaService {
    constructor() {}

    /**
     * 스키마 리스트 조회
     * @param dto 
     * @returns 
     */
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

    /**
     * 스키마 생성
     * @param dto 
     * @returns 
     */
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

    /**
     * 스키마 값 row 추가
     * @param dto 
     * @returns 
     */
    public async addRow(dto: { schemaId: string; values: { columnId: string; value: boolean | number | string }[] }) {
        const { schemaId, values } = dto;

        const findSchemaColumn = await SchemaColumnModel.findOne({ schemaId: new ObjectId(schemaId) });
        const result = await SchemaValueModel.insertMany({
            schemaId: new ObjectId(schemaId),
            schemaColumnId: findSchemaColumn?._id,
            values,
        });

        return result;
    }

    /**
     * 값 타입 별 디폴트 반환
     * @param type 
     * @returns 
     */
    getDefault(type?: ValueType) {
        if (type === "Boolean") return false;
        if (type === "Image" || type === "String") return "";
        if (type === "Number") return -1;
        else return null;
    }

    /**
     * 스키마 정보 수정
     * @param dto 
     */
    public async update(dto: {
        id: string;
        name?: string;
        memo?: string;
        columns?: {
            id?: string;
            needToDelete?: boolean;
            name?: string;
            type?: ValueType;
            isRequire?: boolean;
            memo?: string;
        }[];
    }) {
        const { id, name, memo, columns } = dto;

        if (!id) {
            throw new CustomException({
                code: errorInfo.INVALID_REQUIRE_PARAMETER.code,
                message: errorInfo.formatMsg("INVALID_REQUIRE_PARAMETER", ["id"]),
            });
        }

        await withTransaction(async (session) => {
            // 스키마의 이름, 메모를 변경하는 경우 -> 별도 조건없음
            const schemaCond: any = {};
            if (name) schemaCond.name = name;
            if (memo) schemaCond.memo = memo;

            if (Object.keys(schemaCond).length) {
                await SchemaModel.updateOne({ _id: new ObjectId(id) }, { $set: schemaCond }).session(session);
            }

            // 스키마 컬럼 삭제
            const deleteList = columns?.filter((c) => c.id && c.needToDelete);
            console.log("deleteColumns:", deleteList);

            if (deleteList?.length) {
                for (const c of deleteList) {
                    const _id = new ObjectId(c.id);
                    await SchemaColumnModel.updateOne(
                        { schemaId: new ObjectId(id) },
                        { $pull: { info: { _id } } }
                    ).session(session);
                    await SchemaValueModel.updateMany(
                        { schemaId: new ObjectId(id) },
                        { $pull: { values: { _id } } }
                    ).session(session);
                }
            }

            // 스키마 컬럼 추가
            const addList = columns?.filter((c) => !c.id);
            console.log("addColumns:", addList);
            if (addList?.length) {
                for (const c of addList) {
                    const { name, type, isRequire, memo } = c;
                    const _id = new ObjectId();
                    let value = undefined;
                    if (type === "Boolean") value = false;
                    if (type === "Number") value = 0;
                    if (type === "String" || type === "Image") value = "";

                    await SchemaColumnModel.updateOne(
                        { schemaId: new ObjectId(id) },
                        { $push: { info: { _id, name, type, isRequire, memo } } }
                    ).session(session);
                    await SchemaValueModel.updateMany(
                        { schemaId: new ObjectId(id) },
                        { $pull: { values: { columnId: _id, value } } }
                    ).session(session);
                }
            }

            // 스키마 컬럼 변경
            const updateList = columns?.filter((c) => c.id && !c.needToDelete);
            console.log("updateColumns:", updateList);
            if (updateList?.length) {
                for (const c of updateList) {
                    const schemaId = new ObjectId(id);
                    const columnId = new ObjectId(c.id);

                    const updateFunc = async (cast: (v: any) => any) => {
                        const list = await SchemaValueModel.find({ schemaId, "values.columnId": columnId }).session(
                            session
                        );
                        list.forEach(async (item) => {
                            item.values = new DocumentArray(
                                item.values.map((v) => {
                                    if (String(v.columnId) === c.id) {
                                        v.value = cast(v.value);
                                        if (!v.value && c.isRequire) v.value = this.getDefault(c.type);
                                    }
                                    return v;
                                })
                            );
                            await item.save();
                        });
                    };

                    // 필수값 여부 검사 (true으로 설정하려고할 때 빈 값이 있는가?)
                    if (c.isRequire) {
                        const emptyList = await SchemaValueModel.find({
                            schemaId,
                            values: { $elemMatch: { value: { $eq: null }, columnId: new ObjectId(c.id) } },
                        }).session(session);
                        if (emptyList.length) throw new CustomException(errorInfo.EMPTY_COLUMN_VALUES);
                    }

                    // 컬럼 정보 수정
                    const columnCond: any = {};
                    if (c.name) columnCond["info.$.name"] = c.name;
                    if (c.memo) columnCond["info.$.memo"] = c.memo;
                    if (c.isRequire) columnCond["info.$.isRequire"] = c.isRequire;
                    if (c.type) columnCond["info.$.type"] = c.type;

                    await SchemaColumnModel.updateOne({ schemaId, "info._id": columnId }, { $set: columnCond }).session(
                        session
                    );

                    // 값 정보 수정
                    if (c.type === "Number") {
                        const findList = await SchemaValueModel.find({
                            schemaId,
                            "values.columnId": columnId,
                            "values.value": /[^0-9]]/,
                        }).session(session);
                        if (findList.length) throw new CustomException(errorInfo.INVALID_NUMBER_CAST);

                        await updateFunc((v) => Number(v)); // -> 숫자로 변경하는 경우 -> 값찾을 때 [^0-9] 에 걸리는게 있으면 오류
                    } else if (c.type === "String") {
                        await updateFunc((v) => String(v)); // -> 문자로 변경하는 경우 -> 전부 toString
                    } else if (c.type === "Image") {
                        // 관련 이미지 삭제처리
                        await updateFunc((v) => null); // -> 이미지로 변경하는 경우 -> 변경 시 값 전부 삭제 (필수 시 빈값)
                    } else if (c.type === "Boolean") {
                        await updateFunc((v) => null); // -> bool로 변경하는 경우 -> 변경 시 값 전부 삭제
                    }
                }
            }
        });
    }

    /**
     * 스키마 삭제
     * @param dto 
     */
    public async remove(dto: { userId: string; idList: string[] }) {
        const { userId, idList } = dto;

        const _idList = idList.map((id) => new ObjectId(id));

        const res = await SchemaModel.updateMany(
            { _id: { $in: _idList } },
            { $set: { deletedAt: Date.now(), deletedBy: new ObjectId(userId) } }
        );
    }

    /**
     * 스키마 영구삭제
     * @param dto 
     */
    public async delete(dto: { idList: string[] }) {
        const { idList } = dto;

        const _idList = idList.map((id) => new ObjectId(id));

        await withTransaction(async (session) => {
            await SchemaModel.deleteMany({ _id: { $in: _idList } }).session(session);
            await SchemaColumnModel.deleteMany({ schemaId: { $in: _idList } }).session(session);
            await SchemaValueModel.deleteMany({ schemaId: { $in: _idList } }).session(session);
        });
    }
}
