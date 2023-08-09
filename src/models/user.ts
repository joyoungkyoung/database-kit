import mongoose, { Schema } from "mongoose";
import { fieldCreatedAt, fieldDeletedAt, fieldUpdatedAt } from "./baseEntity";
import { errorInfo } from "@constants";

const schema = new Schema({
    username: {
        type: String,
        require: [true, errorInfo.formatMsg("INVALID_REQUIRE_PARAMETER", ["username"])],
        unique: true,
    },
    password: {
        type: String,
        require: [true, errorInfo.formatMsg("INVALID_REQUIRE_PARAMETER", ["password"])],
    },
    ...fieldCreatedAt,
    ...fieldUpdatedAt,
    ...fieldDeletedAt,
});

export default mongoose.model("User", schema);
