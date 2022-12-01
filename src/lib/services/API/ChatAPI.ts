import {
  IMessage,
  Message,
  MessagesDB,
  QuestionsDB,
  RoomsDB,
} from "../../../definitions";

export class ChatAPI {
  private readonly messagesDB: MessagesDB;
  private readonly roomsDB: RoomsDB;
  private readonly questionsDB: QuestionsDB;

  public constructor(
    messagesDB: MessagesDB,
    roomsDB: RoomsDB,
    questionsDB: QuestionsDB
  ) {
    this.messagesDB = messagesDB;
    this.roomsDB = roomsDB;
    this.questionsDB = questionsDB;
  }

  public async sendTextMessage({
    createdAt,
    text,
    user,
    rid,
  }: Message): Promise<IMessage> {
    const messageDBResponse = await this.messagesDB.createMessage({
      createdAt,
      text,
      user,
      rid,
    });
    await this.roomsDB.updateRoomLM(rid, createdAt);
    await this.questionsDB.updateQuestionLmByRoomId(rid, createdAt);

    return { _id: messageDBResponse._id, createdAt, text, user, rid };
  }

  public async getMessagesFromRoom(rid: string): Promise<IMessage[]> {
    return await this.messagesDB.getMessagesByProperty("rid", rid);
  }
}
