import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import connectDB from "./config/dbConnection.ts";

import quizRoutes from "./routes/quiz.route.ts";
import questionRoutes from "./routes/question.route.ts";
import responseRoutes from "./routes/response.route.ts";

connectDB();

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/quizzes", quizRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/responses", responseRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Quiz App Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
