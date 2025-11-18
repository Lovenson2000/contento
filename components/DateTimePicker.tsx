import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Modal, Platform, View, StyleSheet } from "react-native";

type Props = {
  value: Date;
  visible: boolean;
  onChange: (date: Date) => void;
  onDismiss?: () => void;
};

export default function CrossPlatformDateTimePicker({
  value,
  visible,
  onChange,
  onDismiss,
}: Props) {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(null);

  if (!visible) return null;

  if (Platform.OS === "android") {
    return (
      <>
        {!showTimePicker && (
          <DateTimePicker
            value={tempDate ?? value}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              if (event.type === "dismissed") {
                setTempDate(null);
                setShowTimePicker(false);
                onDismiss?.();
                return;
              }

              if (selectedDate) {
                setTempDate(selectedDate);
                setShowTimePicker(true);
              }
            }}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={tempDate ?? value}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              if (event.type === "dismissed") {
                setTempDate(null);
                setShowTimePicker(false);
                onDismiss?.();
                return;
              }

              if (selectedTime && tempDate) {
                const combined = new Date(tempDate);
                combined.setHours(selectedTime.getHours());
                combined.setMinutes(selectedTime.getMinutes());
                setTempDate(null);
                setShowTimePicker(false);
                onChange(combined);
              }
            }}
          />
        )}
      </>
    );
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View className="flex-1 bg-slate-900/40 justify-center items-center">
        <View
          style={StyleSheet.absoluteFillObject}
          onStartShouldSetResponder={() => {
            onDismiss?.();
            return true;
          }}
        />
        <View className="w-[90%] bg-slate-800 rounded-2xl p-2">
          <DateTimePicker
            value={value}
            mode="datetime"
            display="spinner"
            onChange={(event, selectedDate) => {
              if (event.type === "dismissed") {
                onDismiss?.();
                return;
              }
              if (selectedDate) {
                onChange(selectedDate);
              }
            }}
          />
        </View>
      </View>
    </Modal>
  );
}
