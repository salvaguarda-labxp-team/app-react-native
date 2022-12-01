import { ChatAPI } from "./API";
import { FirebaseMessagesDB } from "./firebase/MessagesDB";
import { FirebaseQuestionsDB } from "./firebase/QuestionsDB";
import { FirebaseRoomsDB } from "./firebase/RoomsDB";

export const FirebaseChatAPI = new ChatAPI(
  new FirebaseMessagesDB(),
  new FirebaseRoomsDB(),
  new FirebaseQuestionsDB()
);
