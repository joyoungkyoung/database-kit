import { BaseResponse } from ".";

interface ResGetSchemaList extends BaseResponse {
    data: {
        _id: string;
        name: string;
        memo: string;
        createdAt: Date;
    }[];
}

interface ResRemoveSchema extends BaseResponse {}

export type { ResGetSchemaList, ResRemoveSchema };
