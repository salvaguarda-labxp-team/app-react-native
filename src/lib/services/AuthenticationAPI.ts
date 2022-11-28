import {
  User,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { auth } from "../utils/firebase.js";

export class AuthenticationAPI {
  static readonly defaultPhotoURL =
    "https://www.trackergps.com/canvas/images/icons/avatar.jpg";

  static async login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  static async signOut(): Promise<void> {
    await signOut(auth);
  }

  static async register(
    email: string,
    password: string,
    displayName: string,
    userPhotoURL?: string
  ): Promise<void> {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(user, {
      displayName,
      photoURL: userPhotoURL || AuthenticationAPI.defaultPhotoURL,
    });
  }

  static getCurrentUser(): Pick<
    User,
    "uid" | "displayName" | "email" | "photoURL"
  > | null {
    if (!auth.currentUser) return null;
    const { uid, displayName, email, photoURL } = auth.currentUser;

    const currentUser = {
      uid,
      displayName,
      email,
      photoURL,
    };
    return currentUser;
  }
}
