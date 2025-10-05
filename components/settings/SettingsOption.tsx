import React from "react";
import { Text, Pressable, Image, ImageSourcePropType } from "react-native";

interface SettingsOptionProps {
  iconSource: ImageSourcePropType;
  label: string;
  onPress?: () => void;
}

export default function SettingsOption({
  iconSource,
  label,
  onPress,
}: SettingsOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center py-4 border-b border-slate-200"
    >
      <Image
        source={iconSource}
        style={{ width: 28, height: 28, marginRight: 12 }}
        resizeMode="contain"
      />
      <Text className="text-[1.2rem] font-medium text-slate-800">{label}</Text>
    </Pressable>
  );
}
