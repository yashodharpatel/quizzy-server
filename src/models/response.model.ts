import mongoose, { Schema, Document, Types } from "mongoose";

interface UserResponse extends Document {
  quizId: Types.ObjectId;
  userId: string;
  responses: { questionId: Types.ObjectId; answer: number }[];
  completed: boolean;
  abandonedAt?: Date;
}

const UserResponseSchema: Schema = new Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    userId: { type: String, required: true },
    responses: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        answer: { type: Number, required: true },
      },
    ],
    completed: { type: Boolean, default: false },
    abandonedAt: { type: Date },
  },
  { timestamps: true }
);

export const UserResponseModel = mongoose.model<UserResponse>(
  "UserResponse",
  UserResponseSchema
);
