import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  textClassName?: string;
}

export default function Button({
  title,
  onPress,
  disabled = false,
  loading = false,
  className = "",
  textClassName = "",
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={`p-4 rounded-lg items-center justify-center ${
        disabled ? "bg-gray-400" : "bg-indigo-600"
      } ${className}`}
      onPress={onPress}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text className={`text-white text-xl ${textClassName}`}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
