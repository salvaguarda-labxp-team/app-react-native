import { IQuestionSubject } from "./ISubject";

export type IQuestionStatus = "pending" | "in_progress" | "closed";

export interface IQuestion {
  _id: string;
  rid: string;
  createdAt: Date;
  lm: Date;
  title: string;
  description: string;
  subject: IQuestionSubject;
  creatorId: string;
  status: IQuestionStatus;
}

export type Question = Omit<IQuestion, "_id">;

export type IQuestionProps = keyof IQuestion;

export interface QuestionsDB {
  updateQuestionLmByRoomId: (roomId: string, lm: Date) => Promise<void>;
}
