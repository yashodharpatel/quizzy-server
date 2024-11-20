import { Request, Response } from "express";
import { UserResponseModel } from "../models/response.model.ts";
import { QuizModel } from "../models/quiz.model.ts";

const submitUserResponse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { quizId, userId, responses } = req.body;

    const quiz = await QuizModel.findById(quizId).populate("questions");
    if (!quiz) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }

    const existingResponse = await UserResponseModel.findOne({
      quizId,
      userId,
    });

    let userResponse;
    if (existingResponse) {
      userResponse = existingResponse;
      userResponse.responses = responses;
    } else {
      userResponse = new UserResponseModel({
        quizId,
        userId,
        responses,
        completed: true,
      });
    }

    await userResponse.save();

    const results = responses.map((userAnswer: any) => {
      const question: any = quiz.questions.find(
        (q) => q._id.toString() === userAnswer.questionId.toString()
      );
      return {
        questionText: question?.questionText,
        userAnswer: question?.options[userAnswer.answer],
        correctAnswer: question?.correctAnswer,
        isCorrect:
          question?.options[userAnswer.answer] === question?.correctAnswer,
      };
    });

    const score = results.filter((result: any) => result.isCorrect).length;

    res.status(200).json({
      message: "Responses submitted and score calculated successfully",
      data: {
        score,
        results,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit responses", error });
  }
};

export default {
  submitUserResponse,
};
