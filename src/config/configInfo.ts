import dotenv from "dotenv";

dotenv.config();

const config = {
    PORT: process.env.PORT!,
    MONGO_URL: process.env.MONGO_URL!,
    API_HOST: process.env.API_HOST!,
    API_VER: process.env.API_VER!,
};

export default config;
