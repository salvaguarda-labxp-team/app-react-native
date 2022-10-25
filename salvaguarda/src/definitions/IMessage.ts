import { User } from "react-native-gifted-chat/lib/Models";

export interface IMessage {
    _id: string | number;
    createdAt: Date;
    text: string;
    user: User;
};
