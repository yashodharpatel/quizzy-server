import express from "express";
import quizController from "../controllers/quiz.controller.ts";

const router = express.Router();

router.post("/", quizController.createQuiz);
router.get("/", quizController.getAllQuizzes);
router.get("/:id", quizController.getQuiz);
router.put("/:id", quizController.updateQuiz);
router.delete("/:id", quizController.deleteQuiz);

export default router;
