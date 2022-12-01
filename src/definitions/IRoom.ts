export type IRoomType = "public" | "private";

export interface IRoom {
  _id: string;
  qid?: string;
  createdAt: Date;
  lm: Date;
  name: string;
  type: IRoomType;
  creatorId: string;
}

export type Room = Omit<IRoom, "_id">;

export type IRoomProps = keyof IRoom;

export interface RoomsDB {
  updateRoomLM: (roomId: string, lm: Date) => Promise<void>;
}
