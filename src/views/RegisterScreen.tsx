import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/utils/firebase.js";
import { AuthenticationAPI } from "../lib/services/AuthenticationAPI";
import { RegisterScreenProps } from "../definitions/ScreenPropsTypes.js";

const RegisterScreen = ({ navigation }: RegisterScreenProps): JSX.Element => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Chat");
      }
    });
  }, []);

  const register = async (): Promise<void> => {
    try {
      await AuthenticationAPI.register(email, password, name, imageUrl);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Informe seu nome"
        label="Nome"
        leftIcon={{ type: "material", name: "badge" }}
        value={name}
        onChangeText={(text) => setName(text)}
        keyboardType="ascii-capable"
        autoCompleteType={"name"}
      />
      <Input
        placeholder="Informe seu e-mail"
        label="E-mail"
        leftIcon={{ type: "material", name: "email" }}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCompleteType={"email"}
      />
      <Input
        placeholder="Informe sua senha"
        label="Senha"
        leftIcon={{ type: "material", name: "lock" }}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        autoCompleteType={"password"}
      />
      <Input
        placeholder="Informe a URL da sua imagem de perfil"
        label="Imagem de Perfil"
        leftIcon={{ type: "material", name: "face" }}
        value={imageUrl}
        onChangeText={(text) => setImageUrl(text)}
        keyboardType="url"
        autoCompleteType={"imageUrl"}
      />
      <Button title={"Registrar"} style={styles.button} onPress={register} />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  button: {
    width: 200,
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
});
