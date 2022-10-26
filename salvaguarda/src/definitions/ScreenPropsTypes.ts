import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export interface RootStackParamsList {
    Login: undefined;
    Register: undefined;
    Chat: undefined;
    ForgotPassword: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<RootStackParamsList, 'Login'>;
export type ForgotPasswordScreenProps = NativeStackScreenProps<RootStackParamsList, 'ForgotPassword'>;
export type RegisterScreenProps = NativeStackScreenProps<RootStackParamsList, 'Register'>;
export type ChatScreenProps = NativeStackScreenProps<RootStackParamsList, 'Chat'>;
