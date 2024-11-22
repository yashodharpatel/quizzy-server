import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAbandonmentLog extends Document {
  userId: String;
  quizId: mongoose.Types.ObjectId;
  abandonment_time: Date;
}

const abandonmentLogSchema: Schema<IAbandonmentLog> = new Schema({
  userId: {
    type: String,
    required: true,
  },
  quizId: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  abandonment_time: {
    type: Date,
    default: Date.now,
  },
});

const AbandonmentLog: Model<IAbandonmentLog> = mongoose.model<IAbandonmentLog>(
  "AbandonmentLog",
  abandonmentLogSchema
);

export default AbandonmentLog;
