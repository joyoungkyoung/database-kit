import dotenv from "dotenv";

dotenv.config();

const config = {
    PORT: process.env.PORT!,
    MONGO_URL: process.env.MONGO_URL!,
    API_HOST: process.env.API_HOST!,
    API_VER: process.env.API_VER!,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID!,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY!,
    S3_BUCKER_NAME: "contents-container",
};

export default config;
