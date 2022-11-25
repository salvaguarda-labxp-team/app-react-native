import { UsersAPI } from "./API";
import { FirebaseUsersDB } from "./firebase/UsersDB";

export const FirebaseUsersAPI = new UsersAPI(new FirebaseUsersDB());
