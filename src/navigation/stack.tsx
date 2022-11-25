/*****************************************************************
Realiza a relação das rotas do aplicativo
*****************************************************************/

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  LoginScreen,
  RegisterScreen,
  Menu,
  ChatsListScreen,
  ForgotPasswordScreen,
  AddImage,
  ChatScreen,
} from "../views";

const Stack = createNativeStackNavigator();

export default (): JSX.Element => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen
      options={{ title: "Esqueci minha senha" }}
      name="ForgotPassword"
      component={ForgotPasswordScreen}
    />
    <Stack.Screen
      name="Register"
      options={{ title: "Cadastro" }}
      component={RegisterScreen}
    />
    <Stack.Screen
      name="Menu"
      component={Menu}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({ route }) => ({
        title: (route.params as { roomName?: string }).roomName ?? "Chat",
      })}
    />
    <Stack.Screen
      name="Add Image"
      options={{ title: "Coletar imagens" }}
      component={AddImage}
      options={{ headerShown: false, gestureEnabled: false }}
    />
  </Stack.Navigator>
);
