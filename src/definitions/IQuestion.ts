export type IQuestionStatus = "pending" | "in_progress" | "closed";

export type IQuestionSubject =
  | "Math"
  | "Port"
  | "Geo"
  | "Hist"
  | "Bio"
  | "Chem"
  | "Socio"
  | "Philo"
  | "Tutor"
  | "Essay";

export type IQuestion = {
  _id: string;
  rid: string;
  createdAt: Date;
  title: string;
  description: string;
  subject: IQuestionSubject;
  creatorId: string;
  status: IQuestionStatus;
};
