import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { fieldCreatedAt, fieldDeletedAt, fieldUpdatedAt } from "./baseEntity";
import { errorInfo } from "@config";

interface IUser {
    username: string;
    password: string;
    createdBy: Schema.Types.ObjectId;
    createdAt: Date;
    updatedBy?: Schema.Types.ObjectId;
    updatedAt?: Date;
    deletecBy?: Schema.Types.ObjectId;
    deletedAt?: Date;
}

interface IUserDocument extends IUser, Document {
    comparePassword: (password: string) => Promise<boolean>;
}

const schema = new Schema(
    {
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
    },
    { versionKey: false }
);

schema.pre("save", function (this, next) {
    const user = this;
    const saltRound = 10;

    if (user.isModified("password") && user.password) {
        bcrypt.hash(user.password, saltRound, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    } else {
        next();
    }
});

schema.methods.comparePassword = async function (plainPassword: string) {
    return bcrypt.compare(plainPassword, this.password);
};

const UserModel = mongoose.model<IUserDocument>("User", schema);

export default UserModel;
