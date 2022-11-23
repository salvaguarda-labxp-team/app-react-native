import { IUser, User, UsersDB } from "../../../definitions";

export class UsersAPI {
  private readonly usersDB: UsersDB;

  public constructor(usersDB: UsersDB) {
    this.usersDB = usersDB;
  }

  public async addUser(user: User): Promise<IUser> {
    return await this.usersDB.createUser(user);
  }

  public async getUserByEmail(email: string): Promise<IUser | null> {
    const response = await this.usersDB.getUserByProperty("email", email);
    if (response !== null) {
      return response;
    } else {
      // TODO do something with null value
      return null;
    }
  }
}


