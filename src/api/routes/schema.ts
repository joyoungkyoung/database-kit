import express from "express";
import controller from "@controllers/schemaController";
import { verifyToken } from "@middlewares/jsonwebtoken";

const router = express.Router();

router.get("/", verifyToken(), controller.getList);
router.post("/", verifyToken(),controller.create);
router.post("/row", verifyToken(), controller.addRow);
router.get("/row", verifyToken(), controller.getRow);
router.put("/", verifyToken(),controller.updateSchema);
router.post("/remove", verifyToken(),controller.removeSchema);
router.post("/delete", verifyToken(), controller.deleteSchema);

export default router;
