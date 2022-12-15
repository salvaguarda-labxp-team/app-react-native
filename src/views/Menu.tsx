import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { QuestionsListScreen } from ".";

const Drawer = createDrawerNavigator();

export default function Menu() {
  return (
    <Drawer.Navigator initialRouteName="Conversas">
      <Drawer.Screen
        options={{ title: "Dúvidas pendentes" }}
        name="QuestionsListPending"
        component={QuestionsListScreen}
        initialParams={{ status: "pending" }}
      />
      <Drawer.Screen
        options={{ title: "Dúvidas em andamento" }}
        name="QuestionsListInProgress"
        component={QuestionsListScreen}
        initialParams={{ status: "in_progress" }}
      />
      <Drawer.Screen
        options={{ title: "Dúvidas finalizadas" }}
        name="QuestionsListClosed"
        component={QuestionsListScreen}
        initialParams={{ status: "closed" }}
      />
    </Drawer.Navigator>
  );
}
