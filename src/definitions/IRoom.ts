export type IRoomType = "public" | "private";

export type IRoom = {
  _id: string;
  qid?: string;
  createdAt: Date;
  lm: Date;
  name: string;
  type: IRoomType;
  creatorId: string;
};
