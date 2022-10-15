import { collection, addDoc, CollectionReference } from "firebase/firestore";
import { db } from '../utils/firebase';
import { IRoom } from "../../definitions";

export class RoomsAPI {
    static readonly roomsRef: CollectionReference = collection(db, "rooms");

    static addRoom({ name, subject, type, creator }: IRoom): void {
        addDoc(RoomsAPI.roomsRef, {
            createdAt: new Date(),
            name,
            subject,
            type,
            creator,
        });
    }

}
