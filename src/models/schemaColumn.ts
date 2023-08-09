import mongoose, { Schema } from "mongoose";
import { fieldCreatedAt, fieldUpdatedAt, valueTypeArr } from "./baseEntity";

const columnSchema = new Schema({
    id: { type: Schema.Types.ObjectId, require: true },
    name: { type: String, require: true },
    type: { type: String, require: true, enum: valueTypeArr },
    isRequire: { type: Boolean, default: false },
    memo: { type: String, require: false },
});

const schema = new Schema({
    schemaId: { type: Schema.Types.ObjectId, require: true },
    info: { type: [columnSchema], require: true },
    ...fieldCreatedAt,
    ...fieldUpdatedAt,
});

export default mongoose.model("SchemaColumn", schema);
