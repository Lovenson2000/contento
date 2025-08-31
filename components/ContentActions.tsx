import { useContent } from "@/lib/api/hooks/useContent";
import { Content } from "@/lib/types";
import { formatRemindTime } from "@/lib/utils/time";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import CrossPlatformDateTimePicker from "./DateTimePicker";
import { useRouter } from "expo-router";

type ContentActionsProps = {
  content: Content;
};

export default function ContentActions({ content }: ContentActionsProps) {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [dateValue, setDateValue] = useState(new Date());
  const {
    deleteContentMutation,
    markContentAsFavorite,
    removeContentFromFavorites,
    updateContentReminderDate,
  } = useContent();

  const router = useRouter();

  const handleAddReminder = () => {
    setDateValue(new Date());
    setIsDatePickerVisible(true);
  };

  const handleDeleteContent = async () => {
    try {
      await deleteContentMutation.mutateAsync({ id: content.id });
      router.back();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAsFavorite = async () => {
    try {
      await markContentAsFavorite.mutateAsync({ contentId: content.id });
      alert("Content marked as favorite");
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      await removeContentFromFavorites.mutateAsync({ contentId: content.id });
      alert("Content removed from favorites");
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateContentReminderDate = async (newDate: Date) => {
    try {
      await updateContentReminderDate.mutateAsync({
        contentId: content.id,
        newDate: newDate,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsDatePickerVisible(false);
    }
  };

  return (
    <View>
      <View className="flex-row items-center justify-between">
        <View className="px-2">
          {content.remindAt ? (
            <Pressable onPress={handleAddReminder}>
              <View className="flex-row items-center gap-2 border rounded-md border-slate-100 px-2 py-1">
                <Ionicons
                  name="notifications-outline"
                  size={16}
                  color="#334155"
                />
                <Text className="text-slate-800">
                  {formatRemindTime(new Date(content.remindAt))}
                </Text>
              </View>
            </Pressable>
          ) : (
            <Pressable onPress={handleAddReminder} className="max-w-40">
              <Text className="text-slate-700 font-semibold">Add Reminder</Text>
            </Pressable>
          )}
        </View>

        <View className="flex-row items-center justify-center gap-8 p-4">
          <Pressable onPress={handleDeleteContent}>
            <Ionicons name="trash-outline" size={20} color="#051542" />
          </Pressable>
          {content.isFavorite ? (
            <Pressable
              onPress={handleRemoveFromFavorites}
              disabled={removeContentFromFavorites.isPending}
            >
              <Ionicons
                name="heart"
                size={20}
                color={removeContentFromFavorites.isPending ? "#94a3b8" : "red"}
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={handleMarkAsFavorite}
              disabled={markContentAsFavorite.isPending}
            >
              <Ionicons
                name="heart-outline"
                size={20}
                color={markContentAsFavorite.isPending ? "#94a3b8" : "#051542"}
              />
            </Pressable>
          )}

          <Pressable onPress={() => alert("Share clicked")}>
            <Ionicons name="share-outline" size={20} color="#051542" />
          </Pressable>
        </View>
      </View>
      <CrossPlatformDateTimePicker
        value={dateValue}
        visible={isDatePickerVisible}
        onChange={handleUpdateContentReminderDate}
        onDismiss={() => setIsDatePickerVisible(false)}
      />
    </View>
  );
}
