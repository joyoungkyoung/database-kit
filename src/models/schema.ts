import { errorInfo } from "@config";
import mongoose, { Schema } from "mongoose";
import { fieldCreatedAt, fieldDeletedAt, fieldUpdatedAt } from "./baseEntity";

const schema = new Schema(
    {
        // 이름
        name: {
            type: String,
            require: [true, errorInfo.formatMsg("INVALID_REQUIRE_PARAMETER", ["name"])],
            trim: true,
            minLegnth: 1,
            maxLength: [100, errorInfo.formatMsg("INVALID_PARAMETER_STRING_LEGNTH", [100])],
        },
        // 메모
        memo: { type: String, require: false, trim: true },

        ...fieldCreatedAt,
        ...fieldUpdatedAt,
        ...fieldDeletedAt,
    },
    { versionKey: false }
);

const SchemaModel = mongoose.model("Schema", schema);

export default SchemaModel;
