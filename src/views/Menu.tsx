import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { QuestionsListScreen } from ".";

const Drawer = createDrawerNavigator();

export default function Menu() {
  return (
    <Drawer.Navigator initialRouteName="Conversas">
      <Drawer.Screen
        options={{ title: "Dúvidas" }}
        name="QuestionsList"
        component={QuestionsListScreen}
      />
    </Drawer.Navigator>
  );
}
