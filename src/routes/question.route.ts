import express from "express";
import questionController from "../controllers/question.controller.ts";

const router = express.Router();

router.post("/", questionController.createQuestion);
router.put("/:id", questionController.editQuestion);
router.delete("/:id", questionController.deleteQuestion);

export default router;
