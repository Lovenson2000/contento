import { socialMediaIcons } from "@/lib/constants/social-icons";
import { Content } from "@/lib/types";
import { formatRemindTime } from "@/lib/utils/time";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

export default function SingleContentItem({ content }: { content: Content }) {
  const iconSource = socialMediaIcons[content.source];
  const router = useRouter();

  return (
    <TouchableOpacity
      className="flex-row items-center border border-slate-100 p-4 rounded-md mb-6 w-full"
      onPress={() => router.push(`/${content.id}`)}
    >
      <Pressable
        className="absolute right-4 top-4"
        onPress={() => alert("Menu clicked")}
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
          <Text className="text-2xl">{content.title}</Text>
          <Text className="text-sm text-gray-500">{content.source}</Text>
        </View>
      </View>
      <View className="absolute right-4 bottom-4">
        {content.remindAt ? (
          <View className="flex-row items-center text-xs flex-1 gap-2 border rounded-md border-slate-100 px-2 py-1 text-gray-400">
            <Ionicons name="notifications-outline" size={16} color="#334155" />
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
  );
}
