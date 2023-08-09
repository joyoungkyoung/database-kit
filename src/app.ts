import express from "express";
import { config } from "@constants";
import loaders from "@loaders";

async function startServer() {
    const app = express();
    const port = config.PORT;

    await loaders.init(app);

    app.listen(port, async () => {
        console.log(`Example app listening on port ${port}`);
    });
}

startServer();
