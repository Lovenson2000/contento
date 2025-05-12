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
      className={`py-3 px-4 rounded-lg items-center justify-center ${
        disabled ? "bg-gray-400" : "bg-blue-500"
      } ${className}`}
      onPress={onPress}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text className={`text-white font-semibold ${textClassName}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
