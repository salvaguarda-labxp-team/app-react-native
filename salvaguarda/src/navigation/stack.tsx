/*****************************************************************
Realiza a relação das rotas do aplicativo
*****************************************************************/

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../views/home";
import AddImage from "../views/addImage"

const Stack = createNativeStackNavigator();

export default () => (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Add Image" component={AddImage} />
    </Stack.Navigator>
    )