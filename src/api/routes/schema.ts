import express from "express";
import controller from "@controllers/schemaController";

const router = express.Router();

router.post("/", controller.create);

export default router;
