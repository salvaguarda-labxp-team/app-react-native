import {
  collection,
  CollectionReference,
  updateDoc,
  doc,
} from "firebase/firestore";
import { RoomsDB } from "../../../definitions";
import { db } from "../../utils/firebase";

export class FirebaseRoomsDB implements RoomsDB {
  private readonly roomsRef: CollectionReference = collection(db, "rooms");

  async updateRoomLM(roomId: string, lm: Date): Promise<void> {
    await updateDoc(doc(this.roomsRef, roomId), {
      lm,
    });
  }
}
