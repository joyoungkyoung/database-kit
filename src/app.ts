import express from "express";
import { configInfo } from "@config";
import loaders from "@loaders";

async function startServer() {
    const app = express();
    const port = configInfo.PORT;

    await loaders.init(app);

    app.listen(port, async () => {
        console.log(`Example app listening on port ${port}`);
    });
}

startServer();
