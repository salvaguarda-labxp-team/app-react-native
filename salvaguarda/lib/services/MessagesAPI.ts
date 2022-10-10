import { query, orderBy, collection, addDoc, getDocs, CollectionReference } from "firebase/firestore";
import { db } from '../utils/firebase'
import { IMessage } from "react-native-gifted-chat/lib/Models";

export class MessagesAPI {
    static readonly chatsRef: CollectionReference = collection(db, "chats");

    static sendTextMessage({ _id, createdAt, text, user }: IMessage): void {
        addDoc(MessagesAPI.chatsRef, {
            _id,
            createdAt,
            text,
            user,
        });
    }

    static async getAllMessages(): Promise<IMessage[]> {
        const q = query(MessagesAPI.chatsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
        }));
    }

}
