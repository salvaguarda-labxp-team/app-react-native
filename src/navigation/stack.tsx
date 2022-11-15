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
  ChooseImage,
  AddImage,
  ChatScreen,
} from "../views";

const Stack = createNativeStackNavigator();

export default (): JSX.Element => (
  <Stack.Navigator initialRouteName="Select Pics">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="ChatList" component={ChatsListScreen} />
    <Stack.Screen
      name="Menu"
      component={Menu}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Chat" component={ChatScreen} />
    <Stack.Screen name="Select Pics" component={ChooseImage} />
    <Stack.Screen
      name="Add Image"
      component={AddImage}
      options={{ headerShown: false, gestureEnabled: false }}
    />
  </Stack.Navigator>
);
