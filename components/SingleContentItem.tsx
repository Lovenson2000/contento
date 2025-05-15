import { useState } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { socialMediaIcons } from "@/lib/constants/social-icons";
import { Content } from "@/lib/types";
import { truncateText } from "@/lib/utils/content";
import { formatRemindTime } from "@/lib/utils/time";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import SingleContentMenuModal from "./SingleContentMenuModal";

export default function SingleContentItem({ content }: { content: Content }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const router = useRouter();

  const iconSource =
    socialMediaIcons[content.source?.toLocaleLowerCase() as string];

  const handleMenuPress = (event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    setMenuPosition({ top: pageY, left: pageX });
    setMenuVisible(true);
  };

  return (
    <>
      <TouchableOpacity
        className="flex-row items-center border border-slate-100 p-4 rounded-md mb-6 w-full"
        onPress={() => router.push(`/${content.id}`)}
      >
        <Pressable className="absolute right-4 top-4" onPress={handleMenuPress}>
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
            <Text className="text-sm text-gray-500">{content.source}</Text>
          </View>
        </View>

        <View className="absolute right-4 bottom-4">
          {content.remindAt ? (
            <View className="flex-row items-center text-xs flex-1 gap-2 border rounded-md border-slate-100 px-2 py-1 text-gray-400">
              <Ionicons
                name="notifications-outline"
                size={16}
                color="#334155"
              />
              <Text className="text-sm text-slate-700">
                {formatRemindTime(new Date(content.remindAt))}
              </Text>
            </View>
          ) : (
            <Pressable onPress={() => alert("Add Reminder clicked")}>
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
        onDelete={() => {
          setMenuVisible(false);
          alert("Delete clicked");
        }}
        onEdit={() => {
          setMenuVisible(false);
          alert("Edit clicked");
        }}
        onAddToFavorites={() => {
          setMenuVisible(false);
          alert("Add to Favorites clicked");
        }}
        position={menuPosition}
      />
    </>
  );
}
