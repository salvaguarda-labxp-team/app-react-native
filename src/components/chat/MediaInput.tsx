import React from "react";
import { View, SafeAreaView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const MediaInput: React.FC<{
  navigation: any;
  onCameraClick: () => void;
  onAddClick: () => void;
  onMicClick: () => void;
}> = ({ onCameraClick, onAddClick, onMicClick }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          left: 50,
          flexDirection: "row",
        }}
      >
        <MaterialIcons
          name="camera-alt"
          size={30}
          color="black"
          onPress={onCameraClick}
          style={{ margin: 5 }}
        />

        <MaterialIcons
          name="add-to-photos"
          size={30}
          color="black"
          onPress={onAddClick}
          style={{ margin: 5 }}
        />

        <MaterialIcons
          name="mic"
          size={30}
          color="black"
          onPress={onMicClick}
          style={{ margin: 5 }}
        />
      </View>
    </SafeAreaView>
  );
};
