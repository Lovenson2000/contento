import React from "react";
import { Pressable, Text, ViewStyle } from "react-native";

type SingleMenuItemProps = {
  label: string;
  onPress: () => void;
  icon: React.ReactNode;
  isDestructive?: boolean;
  style?: ViewStyle;
};

export default function SingleMenuItem({
  label,
  onPress,
  icon,
  isDestructive = false,
  style,
}: SingleMenuItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center justify-between px-2 py-2.5 ${
        isDestructive ? "border-none" : "border-b border-slate-100"
      }`}
      style={style}
    >
      <Text className={isDestructive ? "text-red-500" : "text-slate-700"}>
        {label}
      </Text>
      {icon}
    </Pressable>
  );
}
