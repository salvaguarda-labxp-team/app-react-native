import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../lib/utils/firebase.js';
import { AuthenticationAPI } from '../lib/services/AuthenticationAPI';
import { IUser } from '../definitions/IUser.js';
import { LoginScreenProps } from '../definitions/ScreenPropsTypes.js';

const LoginScreen = ({ navigation }: LoginScreenProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        try {
            await AuthenticationAPI.login(email, password);
        } catch (error: any) {
            alert(error.message);
        }
    };

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
    
    
    return (
        <View style={styles.container}>
            <Input
                placeholder="Informe seu e-mail"
                label="E-mail"
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChangeText={text => setEmail(text)}
                keyboardType='email-address'
                autoCompleteType={'email'}
            />
            <Input
                placeholder="Informe sua senha"
                label="Senha"
                leftIcon={{ type: 'material', name: 'lock' }}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
                autoCompleteType={'password'}
            />
            <Button
                title={"Entrar"}
                style={styles.button}
                onPress={signIn}
            />
            <Button
                title={"Registrar"}
                style={styles.button}
                onPress={() => navigation.navigate("Register")}
            />
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
});
