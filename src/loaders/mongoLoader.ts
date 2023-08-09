import { configInfo } from "@config";
import mongoose from "mongoose";

export default async () => {
    const connect = await mongoose.connect(configInfo.MONGO_URL);

    return connect.connection.db;
};
