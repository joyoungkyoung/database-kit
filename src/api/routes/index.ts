import express from "express";
import authRouter from "./auth";
import schemaRouter from "./schema";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/schema", schemaRouter);

export default router;
