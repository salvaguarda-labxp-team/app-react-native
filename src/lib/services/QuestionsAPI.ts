import {
  collection,
  addDoc,
  updateDoc,
  query,
  orderBy,
  where,
  getDocs,
  CollectionReference,
  doc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { IQuestionSubject, IQuestion } from "../../definitions";
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
    const createdAt = new Date();
    const question = await addDoc(QuestionsAPI.questionsRef, {
      createdAt,
      lm: new Date(),
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

  static async updateQuestionLmByRoomId(
    rid: string,
    lm: number | Date
  ): Promise<void> {
    const questionsQuery = query(
      QuestionsAPI.questionsRef,
      where("rid", "==", rid)
    );
    const querySnapshotQuestions = await getDocs(questionsQuery);
    updateDoc(doc(this.questionsRef, querySnapshotQuestions.docs[0].id), {
      lm,
    });
  }

  static async getUserQuestionsByStatus(
    uid: string,
    status: string
  ): Promise<IQuestion[]> {
    const questionsQuery = query(
      QuestionsAPI.questionsRef,
      where("creatorId", "==", uid),
      where("status", "==", status),
      orderBy("lm", "desc")
    );
    const querySnapshotQuestions = await getDocs(questionsQuery);
    return querySnapshotQuestions.docs.map((doc) => ({
      _id: doc.id,
      rid: doc.data().rid,
      createdAt: doc.data().createdAt.toDate(),
      lm: doc.data().lm.toDate(),
      title: doc.data().title,
      description: doc.data().description,
      subject: doc.data().subject,
      type: doc.data().type,
      creatorId: doc.data().creatorId,
      status: doc.data().status,
    }));
  }

  static async getUserQuestionsByStatusAndSubject(
    uid: string,
    status: string,
    subject: string
  ): Promise<IQuestion[]> {
    const questionsQuery = query(
      QuestionsAPI.questionsRef,
      where("creatorId", "==", uid),
      where("status", "==", status),
      where("subject", "==", subject),
      orderBy("lm", "desc")
    );
    const querySnapshotQuestions = await getDocs(questionsQuery);
    return querySnapshotQuestions.docs.map((doc) => ({
      _id: doc.id,
      rid: doc.data().rid,
      createdAt: doc.data().createdAt,
      lm: doc.data().lm.toDate(),
      title: doc.data().title,
      description: doc.data().description,
      subject: doc.data().subject,
      type: doc.data().type,
      creatorId: doc.data().creatorId,
      status: doc.data().status,
    }));
  }

  static async getQuestionsByStatusAndSubject(
    status: string,
    subject: string
  ): Promise<IQuestion[]> {
    const questionsQuery = query(
      QuestionsAPI.questionsRef,
      where("status", "==", status),
      where("subject", "==", subject),
      orderBy("lm", "desc")
    );
    const querySnapshotQuestions = await getDocs(questionsQuery);
    return querySnapshotQuestions.docs.map((doc) => ({
      _id: doc.id,
      rid: doc.data().rid,
      createdAt: doc.data().createdAt,
      lm: doc.data().lm.toDate(),
      title: doc.data().title,
      description: doc.data().description,
      subject: doc.data().subject,
      type: doc.data().type,
      creatorId: doc.data().creatorId,
      status: doc.data().status,
    }));
  }

  static async getQuestionsByStatus(status: string): Promise<IQuestion[]> {
    const questionsQuery = query(
      QuestionsAPI.questionsRef,
      where("status", "==", status),
      orderBy("createdAt", "desc")
    );
    const querySnapshotQuestions = await getDocs(questionsQuery);
    return querySnapshotQuestions.docs.map((doc) => ({
      _id: doc.id,
      rid: doc.data().rid,
      createdAt: doc.data().createdAt.toDate(),
      lm: doc.data().lm.toDate(),
      title: doc.data().title,
      description: doc.data().description,
      subject: doc.data().subject,
      type: doc.data().type,
      creatorId: doc.data().creatorId,
      status: doc.data().status,
    }));
  }
}
