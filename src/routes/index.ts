import express from "express";
import userRouter from "./user/index";
import charactersRouter from "./characters/index";
const router = express.Router();

router.use("/user", userRouter);
router.use("/characters", charactersRouter);

export default router;
