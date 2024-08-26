import { configInfo } from "@config";
import loaders from "@loaders";
import "reflect-metadata";

async function startServer() {
  const port = configInfo.PORT;
  const app = await loaders.init();

  app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`);
  });
}

startServer();
