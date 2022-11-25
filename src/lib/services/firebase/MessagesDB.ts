import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  CollectionReference,
  orderBy,
} from "firebase/firestore";
import { IMessage, Message, MessagesDB } from "../../../definitions";
import { db } from "../../utils/firebase";

export class FirebaseMessagesDB implements MessagesDB {
  private readonly chatsRef: CollectionReference = collection(db, "messages");

  public async createMessage(message: Message): Promise<IMessage> {
    const { createdAt, rid, text, user } = message;
    const response = await addDoc(this.chatsRef, {
      createdAt,
      text,
      user,
      rid,
    });
    return { _id: response.id, createdAt, text, user, rid };
  }

  public async getMessagesByProperty(
    property: keyof IMessage,
    value: string
  ): Promise<IMessage[]> {
    const q = query(
      this.chatsRef,
      where(property, "==", value),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      _id: doc.id,
      createdAt: doc.data().createdAt.toDate(),
      text: doc.data().text,
      user: doc.data().user,
      rid: doc.data().rid,
    }));
  }
}
