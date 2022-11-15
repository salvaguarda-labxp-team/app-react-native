import React from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const MediaInput: React.FC<{
  onCameraClick: () => void;
  onAddClick: () => void;
  onMicClick: () => void;
}> = ({ onCameraClick, onAddClick, onMicClick }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <MaterialIcons
        testID="Camera"
        name="camera-alt"
        size={30}
        color="black"
        onPress={onCameraClick}
        style={{ margin: 5 }}
      />

      <MaterialIcons
        testID="Gallery"
        name="add-to-photos"
        size={30}
        color="black"
        onPress={onAddClick}
        style={{ margin: 5 }}
      />

      <MaterialIcons
        testID={"VoiceNote"}
        name="mic"
        size={30}
        color="black"
        onPress={onMicClick}
        style={{ margin: 5 }}
      />
    </View>
  );
};
