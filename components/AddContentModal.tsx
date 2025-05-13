import {
  Text,
  View,
  Pressable,
  Modal,
  Keyboard,
  KeyboardEvent,
  Animated,
  TextInput,
} from "react-native";

import { useEffect, useRef, useState } from "react";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";

type AddNewContentModalProps = {
  isVisible: boolean;
  onClose: () => void;
};
export default function AddNewContentModal({
  isVisible,
  onClose,
}: AddNewContentModalProps) {
  const [contentUrl, setContentUrl] = useState("");
  const [tags, setTags] = useState("");
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [reminderDate, setReminderDate] = useState<Date | null>(null);
  const modalHeight = useRef(new Animated.Value(0.5)).current;

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDateTimePicker(false);
    if (selectedDate) {
      setReminderDate(selectedDate);
    }
  };

  useEffect(() => {
    const keyboardShow = Keyboard.addListener(
      "keyboardDidShow",
      _keyboardDidShow
    );
    const keyboardHide = Keyboard.addListener(
      "keyboardDidHide",
      _keyboardDidHide
    );

    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, []);

  const _keyboardDidShow = (e: KeyboardEvent) => {
    Animated.timing(modalHeight, {
      toValue: 0.85,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const _keyboardDidHide = () => {
    Animated.timing(modalHeight, {
      toValue: 0.5,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View className="flex-1 bg-black/50 justify-end">
          <Animated.View
            style={{
              height: modalHeight.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            }}
            className="w-full bg-white p-4 rounded-t-2xl"
          >
            <View className="w-full h-1/2 bg-white p-4 rounded-t-2xl">
              <View className="rounded-t-xl text-center relative">
                <Pressable onPress={onClose} className="absolute top-0 right-0">
                  <MaterialCommunityIcons
                    name="close"
                    color="#051542"
                    size={24}
                  />
                </Pressable>
                <Text className="text-center text-2xl my-8">
                  Add New Content
                </Text>
              </View>
              <View className="mt-6">
                <Text className="text-[##051542] text-xl font-medium mb-1">
                  URL
                </Text>
                <TextInput
                  onChangeText={setContentUrl}
                  value={contentUrl}
                  placeholder="e.g https://www.contento.dev/"
                  placeholderTextColor="#535c73"
                  className="border border-slate-200 bg-white rounded-lg p-4 text-slate-900"
                />
              </View>

              <View className="mt-4">
                <Text className="text-[##051542] text-xl font-medium mb-1">
                  Tags (optional)
                </Text>
                <TextInput
                  onChangeText={setTags}
                  value={tags}
                  placeholder="e.g education, news, science"
                  placeholderTextColor="#535c73"
                  className="border border-slate-200 bg-white rounded-lg p-4 text-slate-900"
                />
              </View>

              {/* Reminder */}
              <View className="mt-4">
                <Pressable
                  onPress={() => setShowDateTimePicker(true)}
                  className="py-2"
                >
                  <Text className="text-[#364aca] font-medium">
                    {reminderDate
                      ? `Reminder: ${reminderDate.toLocaleString()}`
                      : "Add Reminder"}
                  </Text>
                </Pressable>
                {showDateTimePicker && (
                  <DateTimePicker
                    value={reminderDate || new Date()}
                    mode="datetime"
                    display="default"
                    onChange={onChangeDate}
                  />
                )}
              </View>
              <View className="flex-row gap-x-4 mt-6">
                <Pressable
                  onPress={onClose}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 items-center"
                >
                  <Text className="text-gray-700 font-medium">Cancel</Text>
                </Pressable>
                <Pressable className="flex-1 px-4 py-3 bg-[#364aca] rounded-lg items-center">
                  <Text className="text-white font-medium">Save Content</Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}
