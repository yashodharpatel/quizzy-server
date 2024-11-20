import { Request, Response } from "express";
import { QuestionModel } from "../models/question.model.ts";
import { QuizModel } from "../models/quiz.model.ts";

const createQuestion = async (req: Request, res: Response) => {
  try {
    const { questionText, options, correctAnswer } = req.body;

    const question = new QuestionModel({
      questionText,
      options,
      correctAnswer,
    });
    await question.save();

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: "Failed to create question", error });
  }
};

const editQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedQuestion = await QuestionModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedQuestion) {
      res.status(404).json({ message: "Question not found" });
      return;
    }

    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: "Failed to update question", error });
  }
};

const deleteQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const question = await QuestionModel.findById(id);

    if (!question) {
      res.status(404).json({ message: "Question not found" });
      return;
    }

    await QuizModel.updateMany({ questions: id }, { $pull: { questions: id } });

    await QuestionModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ message: "Failed to delete question", error });
  }
};

export default {
  createQuestion,
  editQuestion,
  deleteQuestion,
};
