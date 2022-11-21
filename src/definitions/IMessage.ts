import { User } from "react-native-gifted-chat/lib/Models";

export interface IMessage {
  _id: string | number;
  createdAt: Date;
  text: string;
  user: User;
  rid: string;
}

export type Message = Omit<IMessage, "_id">;

export type IMessageProps = keyof IMessage;

export interface MessagesDB {
  createMessage: (userData: Message) => Promise<IMessage>;
  getMessagesByProperty: (
    property: IMessageProps,
    value: string
  ) => Promise<IMessage[]>;
}
