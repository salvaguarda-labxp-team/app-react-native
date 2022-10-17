import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamsList = {
    Login: undefined;
    Register: undefined;
    Chat: {
        roomId: string;
        roomName: string;
    };
    ForgotPassword: undefined;
    ChatList: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<RootStackParamsList, 'Login'>;
export type ForgotPasswordScreenProps = NativeStackScreenProps<RootStackParamsList, 'ForgotPassword'>;
export type RegisterScreenProps = NativeStackScreenProps<RootStackParamsList, 'Register'>;
export type ChatScreenProps = NativeStackScreenProps<RootStackParamsList, 'Chat'>;
export type ChatListScreenProps = NativeStackScreenProps<RootStackParamsList, 'ChatList'>;
