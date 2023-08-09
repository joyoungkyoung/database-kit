import express from "express";
import schemaRouter from "./schema";

const router = express.Router();

router.use("/schema/", schemaRouter);

export default router;
