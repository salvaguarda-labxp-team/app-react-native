import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  CollectionReference,
} from "firebase/firestore";
import { IUser, User, IUserProps, UsersDB } from "../../../definitions";
import { db } from "../../utils/firebase";

export class FirebaseUsersDB implements UsersDB {
  private readonly usersRef: CollectionReference = collection(db, "users");

  public async createUser(user: User): Promise<IUser> {
    const { name, email, photoURL } = user;
    const createdAt = new Date();
    const response = await addDoc(this.usersRef, {
      createdAt,
      name,
      email,
      photoURL,
    });
    return { name, email, photoURL, _id: response.id, createdAt };
  }

  public async getUserByProperty(
    property: IUserProps,
    value: string
  ): Promise<IUser | null> {
    const q = query(this.usersRef, where(property, "==", value));
    const querySnapshot = await getDocs(q);

    if (
      querySnapshot?.docs?.length === null ||
      querySnapshot?.docs?.length <= 0 ||
      isNaN(querySnapshot.docs.length)
    ) {
      return null;
    } else {
      const doc = querySnapshot.docs[0].data();
      return {
        _id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
        name: doc.data().name,
        email: doc.data().email,
        photoURL: doc.data().photoURL,
      };
    }
  }
}
