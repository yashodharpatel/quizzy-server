import express from "express";
import abandonmentController from "../controllers/abandonment.controller.ts";

const router = express.Router();

router.post("/", abandonmentController.abandonmentLog);

export default router;
