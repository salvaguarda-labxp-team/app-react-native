import React from "react";

import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleProps } from "react-native-reanimated";

export const ActionButton: React.FC<{
  onPress: () => void;
  color?: string;
  isVisible?: boolean;
  style?: StyleProps;
  testID?: string;
  icon: "send" | "camera-alt" | "image" | "cancel" | "restore-from-trash";
}> = ({
  onPress,
  color = "rgba(0,0,0,0.6)",
  icon,
  isVisible = true,
  style = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: color,
        width: 65,
        height: 65,
        borderRadius: 100,
        display: isVisible ? "flex" : "none",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
      activeOpacity={0.7}
    >
      <MaterialIcons name={icon} size={40} color="white" />
    </TouchableOpacity>
  );
};
