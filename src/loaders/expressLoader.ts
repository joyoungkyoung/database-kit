import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import router from "api/routes";
import "reflect-metadata"; // typedi 설정

type StaticOrigin = boolean | string | RegExp | (boolean | string | RegExp)[];

const whitelist = ["http://localhost:3000"];
const corsOptions = {
    origin: function (origin: string | undefined, callback: (err: Error | null, origin?: StaticOrigin) => void) {
        if (!origin) return;
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

export default (app: Express) => {
    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use("/api/v1", router);

    return app;
};
