import mongoose, { Schema, Document } from "mongoose";

export interface IQuiz extends Document {
  title: string;
  description: string;
  questions: mongoose.Types.ObjectId[];
}

const QuizSchema = new Schema<IQuiz>({
  title: { type: String, required: true },
  description: { type: String },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
});

export const QuizModel = mongoose.model<IQuiz>("Quiz", QuizSchema);
