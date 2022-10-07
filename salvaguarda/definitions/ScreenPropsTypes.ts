import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamsList = {
    Login: undefined;
    Register: undefined;
    Chat: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<RootStackParamsList, 'Login'>;
export type RegisterScreenProps = NativeStackScreenProps<RootStackParamsList, 'Register'>;
export type ChatScreenProps = NativeStackScreenProps<RootStackParamsList, 'Chat'>;