import {
  collection,
  doc,
  CollectionReference,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { IMessage, Message, MessagesDB } from "../../../definitions";

export class MessagesAPI {
  private readonly messagesDB: MessagesDB;
  static readonly roomsRef: CollectionReference = collection(db, "rooms");

  public constructor(messagesDB: MessagesDB) {
    this.messagesDB = messagesDB;
  }

  public async sendTextMessage(
    { createdAt, text, user }: Message,
    roomId: string
  ): Promise<IMessage> {
    const messageDBResponse = await this.messagesDB.createMessage({
      createdAt,
      text,
      user,
      rid: roomId,
    });
    // TODO await this.roomsDB.updateRoomProperty(roomId, 'lm', createdAd);
    await updateDoc(doc(MessagesAPI.roomsRef, roomId), {
      lm: createdAt,
    });
    return { _id: messageDBResponse._id, createdAt, text, user, rid: roomId };
  }

  public async getMessagesFromRoom(rid: string): Promise<IMessage[]> {
    return await this.messagesDB.getMessagesByProperty("rid", rid);
  }
}
