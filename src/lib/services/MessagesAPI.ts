import { query, orderBy, collection, addDoc, doc, getDocs, CollectionReference, where, updateDoc } from "firebase/firestore";
import { db } from '../utils/firebase'
import { IMessage } from "react-native-gifted-chat/lib/Models";

export class MessagesAPI {
    static readonly chatsRef: CollectionReference = collection(db, "messages");
    static readonly roomsRef: CollectionReference = collection(db, "rooms");

    static sendTextMessage({ _id, createdAt, text, user }: IMessage, roomId: string): void {
        addDoc(MessagesAPI.chatsRef, {
            _id,
            createdAt,
            text,
            user,
            rid: roomId,
        });

        updateDoc(doc(this.roomsRef, roomId), {
            lm: createdAt,
        });
    }

    static async getMessagesFromRoom(rid: string): Promise<IMessage[]> {
        const q = query(MessagesAPI.chatsRef, where("rid", "==", rid), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => ({
            _id: doc.id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
        }));
    }

}
