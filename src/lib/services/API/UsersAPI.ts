import { IUser, User, IUsersDB } from "../../../definitions";

export class UsersAPI {
  private readonly usersDB: IUsersDB;

  public constructor(usersDB: IUsersDB) {
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

  public async getUserByAuthId(userAuthId: string): Promise<IUser | null> {
    return await this.usersDB.getUserByProperty("userAuthId", userAuthId);
  }
}
