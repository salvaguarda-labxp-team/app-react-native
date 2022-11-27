import { UsersAPI } from "./";
import { IUser, IUsersDB } from "../../../definitions/IUser";

const mockUsersDB: (args: {
  createUser?: any;
  getUserByProperty?: any;
  props?: Record<string, any>;
}) => IUsersDB = (args = {}) => {
  return {
    createUser: args.createUser ?? jest.fn(),
    getUserByProperty: args.getUserByProperty ?? jest.fn(),
    ...(args.props ?? {}),
  };
};

let currentUsersDB: IUsersDB;

describe("UsersAPI", () => {
  beforeAll(() => {
    currentUsersDB = mockUsersDB({});
  });
  it("Receives IUsersDB param", () => {
    const api = new UsersAPI(currentUsersDB);
    expect(api).toBeTruthy();
  });
  it("Calls 'createUser' on 'addUser' call", async () => {
    const api = new UsersAPI(currentUsersDB);

    await api.addUser({
      email: "email",
      name: "name",
      photoURL: "photoURL",
      userAuthId: "uid",
      role: "student",
    });
    expect(currentUsersDB.createUser).toBeCalled();
  });
  it("Throws error when DB method 'createUser' throws error", async () => {
    const errorMessage = "Test error throwing";
    const api = new UsersAPI(
      mockUsersDB({
        createUser: () => {
          throw Error(errorMessage);
        },
      })
    );

    await expect(async () => {
      await api.addUser({
        email: "error email",
        name: "error name",
        photoURL: "error photoURL",
        userAuthId: "uid",
        role: "student",
      });
    }).rejects.toThrow(errorMessage);
  });
  it("Returns IUser when search by email", async () => {
    const api = new UsersAPI(
      mockUsersDB({
        getUserByProperty: (property: any, val: any) => {
          if (property === "email" && val === "roberto@gmail.com") {
            return {
              _id: 1,
              createdAt: new Date(),
              email: "roberto@gmail.com",
              name: "roberto",
              photoURL: "sdjfiasjdfisdj",
              userAuthId: "uid",
              role: "student",
            };
          }
          return null;
        },
      })
    );

    const response = await api.getUserByEmail("roberto@gmail.com");
    expect(response?._id).toEqual(1);
  });
  it("Returns null when search by email hits nothing", async () => {
    const api = new UsersAPI(
      mockUsersDB({
        getUserByProperty: (property: any, val: any) => {
          if (property === "email" && val === "roberto@gmail.com") {
            return {
              _id: 1,
              createdAt: new Date(),
              email: "roberto@gmail.com",
              name: "roberto",
              photoURL: "sdjfiasjdfisdj",
              userAuthId: "uid",
              role: "student",
            };
          }
          return null;
        },
      })
    );

    const response = await api.getUserByEmail("karol@gmail.com");
    expect(response?._id).not.toBeTruthy();
  });
});
