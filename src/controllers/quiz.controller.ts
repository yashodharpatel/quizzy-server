import { Request, Response } from "express";
import { QuestionModel } from "../models/question.model.ts";
import { QuizModel } from "../models/quiz.model.ts";

const createQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, questions } = req.body;

    const savedQuestions = await QuestionModel.insertMany(questions);

    const questionIds = savedQuestions.map((q) => q._id);

    const quiz = new QuizModel({ title, description, questions: questionIds });
    await quiz.save();

    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Failed to create quiz", error });
  }
};

const getAllQuizzes = async (req: Request, res: Response) => {
  try {
    const quizzes = await QuizModel.find().populate("questions");
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch quizzes", error });
  }
};

const getQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const quiz = await QuizModel.findById(id).populate("questions");

    if (!quiz) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch quiz", error });
  }
};

const updateQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, questions } = req.body;

    const quiz = await QuizModel.findById(id);

    if (!quiz) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }

    if (title) quiz.title = title;
    if (description) quiz.description = description;

    if (questions && Array.isArray(questions)) {
      const updatedQuestions = await Promise.all(
        questions.map(async (question) => {
          if (question._id) {
            return await QuestionModel.findByIdAndUpdate(
              question._id,
              question,
              { new: true }
            );
          } else {
            const newQuestion = new QuestionModel(question);
            await newQuestion.save();
            return newQuestion;
          }
        })
      );

      quiz.questions = updatedQuestions.map((q: any) => q._id);
    }

    const updatedQuiz = await quiz.save();

    res.status(200).json(updatedQuiz);
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ message: "Failed to update quiz", error });
  }
};

const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const quiz = await QuizModel.findByIdAndDelete(id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete quiz", error });
  }
};

export default {
  createQuiz,
  getAllQuizzes,
  getQuiz,
  updateQuiz,
  deleteQuiz,
};
