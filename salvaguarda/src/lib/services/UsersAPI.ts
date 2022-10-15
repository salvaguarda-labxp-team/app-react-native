import { query, orderBy, collection, addDoc, getDocs, CollectionReference } from "firebase/firestore";
import { db } from '../utils/firebase';
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

}