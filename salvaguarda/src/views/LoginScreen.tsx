import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { LoginForm, LoginFormData } from '../components/form/LoginForm';
import { LoginScreenProps } from '../definitions/ScreenPropsTypes.js';

const LoginPage = ({ navigation }: LoginScreenProps) => {
    const { control, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<LoginFormData>({
        mode: 'all',
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmit = (data: LoginFormData) => { console.log(data.username + ": " + data.password) }
    return (
        <LoginForm
            {...{
                control,
                errors,
                isDirty,
                isValid,
                onSubmit: handleSubmit(onSubmit),
            }}
        />
    )

};

export default LoginPage;