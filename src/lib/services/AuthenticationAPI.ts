import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { IUser, LoggedUser, Role } from "../../definitions";
import { auth } from "../utils/firebase.js";
import { FirebaseUsersAPI } from "./FirebaseUsersAPI";

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
    role: Role,
    userPhotoURL?: string
  ): Promise<void> {
    const { user: firebaseUser } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const photoURL = userPhotoURL ?? AuthenticationAPI.defaultPhotoURL;

    await updateProfile(firebaseUser, { displayName, photoURL });

    const user = {
      name: displayName,
      email,
      photoURL,
      userAuthId: firebaseUser.uid,
      role,
    };

    await FirebaseUsersAPI.addUser(user);
  }

  static getCurrentUser(): LoggedUser | null {
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

  static async getCurrentUserFromDB(): Promise<IUser | null> {
    const user = this.getCurrentUser();
    if (user) {
      return await FirebaseUsersAPI.getUserByAuthId(user.uid);
    }

    return user;
  }
}
