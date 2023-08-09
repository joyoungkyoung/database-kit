import { config } from "@constants";
import mongoose from "mongoose";

export default async () => {
    const connect = await mongoose.connect(config.MONGO_URL);

    return connect.connection.db;
};
