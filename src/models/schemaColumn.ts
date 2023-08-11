import mongoose, { Schema } from "mongoose";
import { fieldCreatedAt, fieldUpdatedAt, valueTypeArr } from "./baseEntity";

const columnSchema = new Schema({
    id: { type: Schema.Types.ObjectId, require: true },
    name: { type: String, require: true, minLength: 1 },
    type: { type: String, require: true, enum: valueTypeArr },
    isRequire: { type: Boolean, default: false },
    memo: { type: String, require: false },
});

const schema = new Schema(
    {
        schemaId: { type: Schema.Types.ObjectId, require: true },
        info: { type: [columnSchema], require: true },
        ...fieldCreatedAt,
        ...fieldUpdatedAt,
    },
    { versionKey: false }
);

const SchemaColumnModel = mongoose.model("SchemaColumn", schema);

export default SchemaColumnModel;
