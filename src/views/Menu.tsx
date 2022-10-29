import React from "react";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { QuestionsListScreen, ChatsListScreen } from ".";

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default function Menu() {
  return (
    <Drawer.Navigator initialRouteName="Conversas">
      <Drawer.Screen name="QuestionsList" component={QuestionsListScreen} />
      <Drawer.Screen name="ChatsList" component={ChatsListScreen} />
    </Drawer.Navigator>
  );
}
