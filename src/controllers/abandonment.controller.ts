import { Request, Response } from "express";
import AbandonmentLog, {
  IAbandonmentLog,
} from "../models/abandonment.model.ts";
import sendMail from "../services/mailer.ts";

const abandonmentLog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, quizId } = req.body;

    if (!userId || !quizId) {
      res.status(400).json({ message: "userId and quizId are required" });
      return;
    }

    const log: IAbandonmentLog = new AbandonmentLog({
      userId,
      quizId,
    });

    try {
      await sendMail(userId);
    } catch (e) {
      console.log(e);
    }

    await log.save();

    res.status(201).json({ message: "Abandonment logged successfully" });
  } catch (error) {
    console.error("Error logging abandonment:", error);
    res.status(500).json({ message: "Error logging abandonment" });
  }
};

export default { abandonmentLog };
