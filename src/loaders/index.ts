import { Express } from "express";
import mongoLoader from "./mongoLoader";
import expressLoader from "./expressLoader";

async function init(app: Express) {
    await mongoLoader();
    console.info("mongo connection is done");
    await expressLoader(app);
    console.info("express setting is done");
}

export default { init };
