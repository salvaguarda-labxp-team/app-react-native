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
} from "../views";

const Stack = createNativeStackNavigator();

export default (): JSX.Element => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="ChatList" component={ChatsListScreen} />
    <Stack.Screen
      name="Menu"
      component={Menu}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
