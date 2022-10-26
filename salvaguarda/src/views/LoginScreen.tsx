import { FirebaseError } from 'firebase/app';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useMemo, useCallback } from 'react'
import { useForm } from 'react-hook-form';
import { LoginForm, LoginFormData } from '../components/form/LoginForm';
import { LoginScreenProps } from '../definitions/ScreenPropsTypes.js';
import { AuthenticationAPI } from '../lib/services';
import { auth } from '../lib/utils/firebase';

const LoginPage = ({ navigation }: LoginScreenProps) :JSX.Element => {

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Usuário logou
                navigation.replace("Chat");
            } else {
                // Usuário deslogou
                navigation.canGoBack() && navigation.popToTop();
            }
        });
    }, []);


    const { control, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<LoginFormData>({
        mode: 'all',
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmit = useCallback(async ({ username, password }: LoginFormData) => {
        try {
            await AuthenticationAPI.login(username, password);
        } catch (error: any) {
            if ((error as FirebaseError)?.code === 'auth/network-request-failed') {
                alert("Erro de conexão. Por favor, tente novamente mais tarde.");
            }
            if ((error as FirebaseError)?.code) {
                alert("Username ou senha inválidos. Por favor, confira os campos inseridos e tente novamente.");
            }
        }
    }, [])

    const formOnSubmit = useMemo(() => {
        return handleSubmit(onSubmit)
    }, [onSubmit, handleSubmit])

    const rules = useMemo(() => {
        return {
            username: { required: 'Campo deve ser preenchido', minLength: { value: 3, message: 'Username deve possuir no mínimo 3 caracteres' } },
            password: { required: 'Campo deve ser preenchido', minLength: { value: 6, message: 'Senha deve possuir no mínimo 6 caracteres' } },
        }
    }, [])
    return (
        <LoginForm
            {...{
                control,
                errors,
                isDirty,
                isValid,
                rules,
                onSubmit: formOnSubmit,
                redirectTo: navigation.replace
            }}
        />
    )

};

export default LoginPage;