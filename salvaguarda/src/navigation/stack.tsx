/*****************************************************************
Realiza a relação das rotas do aplicativo
*****************************************************************/

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, AddImage, LoginScreen, RegisterScreen, ChatScreen, ChatListScreen, ForgotPasswordScreen } from '../views';

const Stack = createNativeStackNavigator();

export default () => (
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="ChatList" component={ChatListScreen}/>
        <Stack.Screen name="Chat" component={ChatScreen}/>
        <Stack.Screen name="Add Image" component={AddImage} />
        <Stack.Screen name="Home" component={Home}/>
    </Stack.Navigator>
    )
