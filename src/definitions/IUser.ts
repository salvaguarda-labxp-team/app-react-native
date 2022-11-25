import { User as FirebaseUser } from "firebase/auth";

export interface IUser {
  _id: string;
  createdAt: Date;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  userAuthId: string;
  role: Role;
}

export type Role = "student" | "monitor";

export type LoggedUser = Pick<
  FirebaseUser,
  "uid" | "displayName" | "email" | "photoURL"
>;

export type User = Omit<IUser, "_id" | "createdAt">;

export type IUserProps = keyof IUser;

export interface UsersDB {
  createUser: (userData: User) => Promise<IUser>;
  getUserByProperty: (
    property: IUserProps,
    value: string
  ) => Promise<IUser | null>;
}
