import React from "react";
import { TextInput, Text, View } from "react-native";

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  className = "",
  inputClassName = "",
  labelClassName = "",
}: InputProps) {
  return (
    <View className={`w-full mb-4 ${className}`}>
      {label && (
        <Text
          className={`text-base font-semibold text-gray-700 mb-1 ${labelClassName}`}
        >
          {label}
        </Text>
      )}
      <TextInput
        className={`border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900 bg-white ${inputClassName}`}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#A0AEC0"
      />
    </View>
  );
}
