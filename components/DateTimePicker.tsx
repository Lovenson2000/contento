import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, View } from "react-native";

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

  if (Platform.OS === "ios") {
    return (
      <DateTimePicker
        value={value}
        mode="datetime"
        textColor="black"
        display="spinner"
        onChange={(event, selectedDate) => {
          if (selectedDate) {
            onChange(selectedDate);
          }
          onDismiss?.();
        }}
      />
    );
  }

  return (
    <View>
      {!showTimePicker && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (event.type === "dismissed") {
              onDismiss?.();
              return;
            }

            if (selectedDate) {
              const updated = new Date(selectedDate);
              const original = value;
              updated.setHours(original.getHours());
              updated.setMinutes(original.getMinutes());
              setTempDate(updated);
              setShowTimePicker(true);
            }
          }}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={value}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);

            if (event.type === "dismissed") {
              onDismiss?.();
              return;
            }

            if (selectedTime && tempDate) {
              const updated = new Date(tempDate);
              updated.setHours(selectedTime.getHours());
              updated.setMinutes(selectedTime.getMinutes());
              onChange(updated);
            }

            onDismiss?.();
          }}
        />
      )}
    </View>
  );
}
