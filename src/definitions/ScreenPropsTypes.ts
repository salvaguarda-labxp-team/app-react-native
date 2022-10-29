import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export interface RootStackParamsList {
  Login: undefined;
  Register: undefined;
  Chat: {
    roomId: string;
    roomName: string;
  };
  ForgotPassword: undefined;
  ChatsList: undefined;
  QuestionsList: undefined;
  Menu: undefined;
  Test: undefined;
}

export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  "Login"
>;
export type ForgotPasswordScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  "ForgotPassword"
>;
export type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  "Register"
>;
export type ChatScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  "Chat"
>;
export type ChatsListScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  "ChatsList"
>;
export type QuestionsListScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  "QuestionsList"
>;
export type MenuScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  "Menu"
>;
