import { useState } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { socialMediaIcons } from "@/lib/constants/social-icons";
import { Content } from "@/lib/types";
import { capitalizeFirstLetter, truncateText } from "@/lib/utils/content";
import { formatRemindTime } from "@/lib/utils/time";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import SingleContentMenuModal from "./SingleContentMenuModal";
import CrossPlatformDateTimePicker from "./DateTimePicker";
import { useContent } from "@/lib/api/hooks/useContent";
import AddNewContentModal from "./AddContentModal";

type SingleContentItemProps = {
  content: Content;
};
export default function SingleContentItem({ content }: SingleContentItemProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [dateValue, setDateValue] = useState(new Date());
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const {
    deleteContentMutation,
    markContentAsFavorite,
    removeContentFromFavorites,
    updateContentReminderDate,
    removeContentReminder,
  } = useContent();

  const router = useRouter();

  const iconSource =
    socialMediaIcons[content.source?.toLocaleLowerCase() as string];

  const handleMenuPress = (event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    setMenuPosition({ top: pageY, left: pageX });
    setMenuVisible(true);
  };

  const handleAddReminder = () => {
    setDateValue(new Date());
    setIsDatePickerVisible(true);
  };

  const handleRemoveReminder = async () => {
    try {
      await removeContentReminder.mutateAsync({ contentId: content.id });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteContent = async () => {
    try {
      await deleteContentMutation.mutateAsync({ id: content.id });
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAsFavorite = async () => {
    try {
      await markContentAsFavorite.mutateAsync({ contentId: content.id });
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      await removeContentFromFavorites.mutateAsync({ contentId: content.id });
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

  const handleEditContent = () => {
    setMenuVisible(false);
    setIsEditModalVisible(true);
  };

  const handleContentUpdated = () => {
    setIsEditModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        className="flex-row items-center border border-slate-100 p-4 rounded-md mb-6 w-full"
        onPress={() => router.push(`/${content.id}`)}
      >
        <Pressable
          className="absolute right-4 px-2 py-1 top-4"
          onPress={handleMenuPress}
        >
          <MaterialCommunityIcons
            name="dots-vertical"
            size={20}
            color="#0f172a"
          />
        </Pressable>

        <View className="flex flex-row items-center justify-center mb-6">
          {iconSource && (
            <Image
              source={iconSource}
              style={{ width: 32, height: 32, marginRight: 10 }}
            />
          )}
          <View className="flex flex-col">
            <Text className="text-xl">{truncateText(content.title, 30)}</Text>
            <Text className="text-sm text-gray-500">
              {capitalizeFirstLetter(content.source!)}
            </Text>
          </View>
        </View>

        <View className="absolute right-4 bottom-4">
          {content.remindAt ? (
            <Pressable
              className="flex-row items-center text-xs flex-1 gap-2 border rounded-md border-slate-100 px-2 py-1 text-gray-400"
              onPress={handleAddReminder}
            >
              <Ionicons
                name="notifications-outline"
                size={16}
                color="#334155"
              />
              <Text className="text-sm text-slate-700">
                {formatRemindTime(new Date(content.remindAt))}
              </Text>
            </Pressable>
          ) : (
            <Pressable onPress={handleAddReminder}>
              <Text className="text-sm text-slate-900 bg-gray-100 px-2 py-1 rounded-lg">
                Add Reminder
              </Text>
            </Pressable>
          )}
        </View>
      </TouchableOpacity>

      <SingleContentMenuModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onDelete={handleDeleteContent}
        onEdit={handleEditContent}
        onAddToFavorites={handleMarkAsFavorite}
        onRemoveReminder={handleRemoveReminder}
        onRemoveFromFavorites={handleRemoveFromFavorites}
        isFavorite={content.isFavorite}
        position={menuPosition}
        content={content}
      />
      <CrossPlatformDateTimePicker
        value={dateValue}
        visible={isDatePickerVisible}
        onChange={handleUpdateContentReminderDate}
        onDismiss={() => setIsDatePickerVisible(false)}
      />
      <AddNewContentModal
        isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onContentAdded={handleContentUpdated}
        initialData={{
          title: content.title,
          url: content.url,
          id: content.id,
          tags: content.tags,
          remindAt: content.remindAt ? new Date(content.remindAt) : null,
        }}
      />
    </>
  );
}
