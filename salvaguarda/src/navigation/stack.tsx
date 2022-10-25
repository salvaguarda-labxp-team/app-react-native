/*****************************************************************
Realiza a relação das rotas do aplicativo
*****************************************************************/

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../views/home";
import AddImage from "../views/addImage"
import LoginScreen from '../views/LoginScreen';
import RegisterScreen from '../views/RegisterScreen';
import ChatScreen from '../views/ChatScreen';
import ForgotPasswordScreen from "../views/ForgotPasswordScreen";

const Stack = createNativeStackNavigator();

export default () :JSX.Element => (
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="Chat" component={ChatScreen}/>
        <Stack.Screen name="Add Image" component={AddImage} />
        <Stack.Screen name="Home" component={Home}/>
    </Stack.Navigator>
    )
