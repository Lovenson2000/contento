import { Content } from "@/lib/types";
import { formatRemindTime } from "@/lib/utils/time";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Text, View } from "react-native";

export default function ContentActions({ content }: { content: Content }) {
  return (
    <View>
      <View className="flex-row items-center justify-between">
        <View className="px-2">
          {content.remindAt ? (
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
          ) : (
            <Pressable
              onPress={() => alert("Add Reminder clicked")}
              className="max-w-40"
            >
              <Text className="text-slate-700 font-semibold">Add Reminder</Text>
            </Pressable>
          )}
        </View>

        <View className="flex-row items-center justify-center gap-8 p-4">
          <Pressable onPress={() => alert("Delete clicked")}>
            <Ionicons name="trash-outline" size={20} color="#051542" />
          </Pressable>
          <Pressable onPress={() => alert("Favorite clicked")}>
            <Ionicons name="heart-outline" size={20} color="#051542" />
          </Pressable>
          <Pressable onPress={() => alert("Share clicked")}>
            <Ionicons name="share-outline" size={20} color="#051542" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
