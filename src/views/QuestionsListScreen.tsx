import React from "react";
import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default function QuestionsListScreen() {
  return (
    <View style={styles.container}>
      <Text>Alo</Text>
    </View>
  );
}
