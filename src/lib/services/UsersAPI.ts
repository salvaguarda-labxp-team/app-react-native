import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  CollectionReference,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { IUser } from "../../definitions";

export class UsersAPI {
  static readonly usersRef: CollectionReference = collection(db, "users");

  static addUser({ name, email, photoURL }: IUser): void {
    addDoc(UsersAPI.usersRef, {
      createdAt: new Date(),
      name,
      email,
      photoURL,
    });
  }

  static async getUserByEmail(email: string): Promise<IUser | null> {
    const q = query(UsersAPI.usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.docs.length) {
      return null;
    } else {
      const doc = querySnapshot.docs[0].data();
      return {
        _id: doc._id,
        createdAt: doc.createdAt.toDate(),
        name: doc.name,
        email: doc.email,
        photoURL: doc.photoURL,
      };
    }
  }
}
