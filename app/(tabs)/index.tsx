import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  Image,
  ImageSourcePropType,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { contents } from "@/lib/constants/contents";
import { Content } from "@/lib/types";
import { formatRemindTime } from "@/lib/utils/time";

const socialMediaIcons: Record<string, ImageSourcePropType> = {
  YouTube: require("@/assets/images/youtube.png"),
  Tiktok: require("@/assets/images/tiktok.png"),
  Instagram: require("@/assets/images/instagram.png"),
  Twitter: require("@/assets/images/twitter.png"),
  Facebook: require("@/assets/images/facebook.png"),
  Reddit: require("@/assets/images/reddit.png"),
  LinkedIn: require("@/assets/images/linkedin.png"),
  Medium: require("@/assets/images/medium.png"),
  Quora: require("@/assets/images/quora.png"),
};

export default function Index() {
  return (
    <View className="bg-white flex-1 p-4">
      <SafeAreaView className="flex-1 w-full">
        <FlatList
          data={contents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SingleContentItem content={item} />}
          className="flex-1 w-full"
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
      </SafeAreaView>
    </View>
  );
}

function SingleContentItem({ content }: { content: Content }) {
  const iconSource = socialMediaIcons[content.source];

  return (
    <TouchableOpacity className="flex-row items-center border border-slate-100 p-4 rounded-md mb-6 w-full">
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
