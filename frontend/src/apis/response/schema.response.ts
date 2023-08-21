import { BaseResponse } from ".";

interface ResGetSchemaList extends BaseResponse {
    data: {
        _id: string;
        name: string;
        memo: string;
        createdAt: Date;
    }[];
}

export type { ResGetSchemaList };
