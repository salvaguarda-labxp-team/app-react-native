import { UsersAPI } from "./API/UsersAPI";
import { FirebaseUsersDB } from "./firebase/UsersDB";

export default new UsersAPI(new FirebaseUsersDB())