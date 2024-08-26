import express from "express";
import mongoLoader from "./mongoLoader";
import expressLoader from "./expressLoader";
import routerLoader from "./routerLoader";

async function init() {
  const app = express();
  await mongoLoader();
  console.info("mongo connection is done");
  await expressLoader(app);
  console.info("express setting is done");
  await routerLoader(app);

  return app;
}

export default { init };
