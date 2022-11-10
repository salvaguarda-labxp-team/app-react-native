import React from "react";

import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleProps } from "react-native-reanimated";

export const ActionButton: React.FC<{
  onClick: () => void;
  color?: string;
  isVisible?: boolean;
  style?: StyleProps;
  icon: "send" | "camera-alt" | "image" | "cancel" | "restore-from-trash";
}> = ({
  onClick,
  color = "rgba(0,0,0,0.6)",
  icon,
  isVisible = true,
  style = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
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
