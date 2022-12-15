import {
  collection,
  query,
  where,
  getDocs,
  CollectionReference,
  updateDoc,
  doc,
} from "firebase/firestore";
import { QuestionsDB } from "../../../definitions";
import { db } from "../../utils/firebase";

export class FirebaseQuestionsDB implements QuestionsDB {
  private readonly questionsRef: CollectionReference = collection(
    db,
    "questions"
  );

  async updateQuestionLmByRoomId(
    rid: string,
    lm: number | Date
  ): Promise<void> {
    const questionsQuery = query(this.questionsRef, where("rid", "==", rid));
    const querySnapshotQuestions = await getDocs(questionsQuery);
    await updateDoc(doc(this.questionsRef, querySnapshotQuestions.docs[0].id), {
      lm,
    });
  }
}
