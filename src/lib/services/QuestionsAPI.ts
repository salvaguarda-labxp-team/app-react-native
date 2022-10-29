import {
  collection,
  addDoc,
  updateDoc,
  query,
  orderBy,
  where,
  getDocs,
  CollectionReference,
  documentId,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import {
  IRoom,
  IUser,
  IRoomType,
  IQuestionSubject,
  IQuestion,
} from "../../definitions";
import { SubscriptionsAPI } from "./SubscriptionsAPI";
import { RoomsAPI } from "./RoomsAPI";

export class QuestionsAPI {
  static readonly questionsRef: CollectionReference = collection(
    db,
    "questions"
  );

  static async createQuestion(
    title: string,
    description: string,
    subject: IQuestionSubject,
    creatorId: string
  ): Promise<void> {
    const question = await addDoc(QuestionsAPI.questionsRef, {
      createdAt: new Date(),
      rid: RoomsAPI.createRoom,
      title,
      description,
      subject,
      creatorId,
      status: "pending",
    });

    const rid: string = await RoomsAPI.createRoom(
      title,
      subject,
      "private",
      creatorId,
      [],
      question.id
    );
    updateDoc(question, { rid });
  }

  static async getUserQuestionsByStatus(
    uid: string,
    status: string
  ): Promise<IQuestion[]> {
    const questionsQuery = query(
      QuestionsAPI.questionsRef,
      where("creatorId", "==", uid),
      where("status", "==", status),
      orderBy("createdAT", "desc")
    );
    const querySnapshotQuestions = await getDocs(questionsQuery);
    return querySnapshotQuestions.docs.map((doc) => ({
      _id: doc.id,
      rid: doc.data().rid,
      createdAt: doc.data().createdAt,
      title: doc.data().title,
      description: doc.data().description,
      subject: doc.data().subject,
      type: doc.data().type,
      creatorId: doc.data().creatorId,
      status: doc.data().status,
    }));
  }

  static async getQuestionsByStatus(
    uid: string,
    status: string
  ): Promise<IQuestion[]> {
    const questionsQuery = query(
      QuestionsAPI.questionsRef,
      where("status", "==", status),
      orderBy("createdAT", "desc")
    );
    const querySnapshotQuestions = await getDocs(questionsQuery);
    return querySnapshotQuestions.docs.map((doc) => ({
      _id: doc.id,
      rid: doc.data().rid,
      createdAt: doc.data().createdAt,
      title: doc.data().title,
      description: doc.data().description,
      subject: doc.data().subject,
      type: doc.data().type,
      creatorId: doc.data().creatorId,
      status: doc.data().status,
    }));
  }
}
