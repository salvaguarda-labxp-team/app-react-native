import React from "react";
import { View, SafeAreaView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const MediaInput: React.FC<{
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
    </SafeAreaView>
  );
};
