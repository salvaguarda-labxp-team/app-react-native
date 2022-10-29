import { collection, addDoc, CollectionReference } from "firebase/firestore";
import { db } from "../utils/firebase";
import { IRoom, ISubscription, IUser } from "../../definitions";

export class SubscriptionsAPI {
  static readonly subscriptionsRef: CollectionReference = collection(
    db,
    "subscriptions"
  );

  static addSubscription(uid: IUser["_id"], rid: IRoom["_id"]): void {
    addDoc(SubscriptionsAPI.subscriptionsRef, {
      createdAt: new Date(),
      uid,
      rid,
    });
  }
}
