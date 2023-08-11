import express from "express";
import controller from "@controllers/authController";

const router = express.Router();

router.post("/signup", controller.signup);
router.post("/login", controller.login);

router.post("/find-pw", controller.findPassword);

export default router;
