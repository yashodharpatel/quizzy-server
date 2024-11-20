import express from "express";
import responseController from "../controllers/response.controller.ts";

const router = express.Router();

router.post("/", responseController.submitUserResponse);

export default router;
