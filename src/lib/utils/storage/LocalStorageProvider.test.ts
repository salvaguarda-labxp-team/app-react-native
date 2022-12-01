import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocalStorageProvider } from "./LocalStorageProvider";

describe("LocalStorageProvider", () => {
  const storage = new LocalStorageProvider();

  type Subject = "math" | "science" | "history";
  interface Assignment {
    id: string;
    studentId: string;
    grade: number;
    subject: Subject;
    deadline: Date;
  }

  const myAssignment: Assignment = {
    id: "1",
    studentId: "stu1",
    grade: 9,
    subject: "math",
    deadline: new Date("2022-11-27T23:59:00.000Z"),
  };

  beforeAll(async () => {
    await AsyncStorage.clear();
  });

  it("adds a new item to AsyncStorage", async () => {
    await storage.set(myAssignment.id, myAssignment);

    expect(AsyncStorage.setItem).toBeCalledWith("1", expect.anything());
  });

  it("gets an existing item from AsyncStorage", async () => {
    const fromStorage = await storage.get<Assignment>(myAssignment.id);

    expect(AsyncStorage.getItem).toBeCalledWith("1");
    expect(fromStorage).toEqual(myAssignment);
  });

  it("returns null if an item is not found", async () => {
    const fromStorage = await storage.get<Assignment>("2");

    expect(AsyncStorage.getItem).toBeCalledWith("2");
    expect(fromStorage).toBeNull();
  });

  it("overwrites existing item when setting with the same key", async () => {
    const newAssignment = {
      ...myAssignment,
      deadline: new Date("2022-11-30T23:59:00.000Z"),
    };

    await storage.set(newAssignment.id, newAssignment);
    expect(AsyncStorage.setItem).toBeCalledWith("1", expect.anything());

    const fromStorage = await storage.get<Assignment>("1");

    expect(AsyncStorage.getItem).toBeCalledWith("1");
    expect(fromStorage).toEqual(newAssignment);
  });

  it("removes item from AsyncStorage", async () => {
    await storage.remove("1");
    expect(AsyncStorage.removeItem).toBeCalledWith("1");

    const fromStorage = await storage.get<Assignment>("1");
    expect(fromStorage).toBeNull();
  });
});
