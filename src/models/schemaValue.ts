import mongoose, { Schema } from "mongoose";
import { fieldCreatedAt, fieldUpdatedAt } from "./baseEntity";

const valueSchema = new Schema({
    columnId: { type: Schema.Types.ObjectId, require: true },
    value: { type: Schema.Types.Mixed, require: true },
});
const schema = new Schema(
    {
        schemaId: { type: Schema.Types.ObjectId, require: true },
        schemaColumnId: { type: Schema.Types.ObjectId, require: true },
        values: { type: [valueSchema], require: true },
        ...fieldCreatedAt,
        ...fieldUpdatedAt,
    },
    { versionKey: false }
);

const SchemaValueModel = mongoose.model("SchemaValue", schema);

export default SchemaValueModel;
