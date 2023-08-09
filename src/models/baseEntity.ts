import { errorInfo } from "@config";
import { Schema } from "mongoose";

// 컬럼 값 타입 종류
export const valueTypeArr = ["Number", "String", "Image", "Boolean"];

// 생성자, 생성일
export const fieldCreatedAt = {
    createdBy: {
        type: Schema.Types.ObjectId,
        require: [true, errorInfo.formatMsg("INVALID_REQUIRE_PARAMETER", ["createdBy"])],
    },
    createdAt: { type: Date, default: Date.now },
};

// 수정자, 수정일
export const fieldUpdatedAt = {
    updatedBy: { type: Schema.Types.ObjectId, require: false },
    updatedAt: { type: Date, require: false, default: Date.now },
};

// 삭제자, 삭제일
export const fieldDeletedAt = {
    deletedBy: { type: Schema.Types.ObjectId, require: false },
    deletedAt: { type: Date, require: false, default: Date.now },
};
