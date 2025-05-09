import { Content } from "@/lib/types";
import { formatRemindTime } from "@/lib/utils/time";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ContentActions({ content }: { content: Content }) {
  return (
    <View>
      <View style={styles.bottomContainer}>
        <View className="bg-red-400 w-40">
          {content.remindAt ? (
            <View className="flex-row items-center gap-2 border rounded-md border-slate-100 px-2 py-1">
              <Ionicons
                name="notifications-outline"
                size={16}
                color="#334155"
              />
              <Text style={styles.remindTime}>
                {formatRemindTime(new Date(content.remindAt))}
              </Text>
            </View>
          ) : (
            <Pressable
              onPress={() => alert("Add Reminder clicked")}
              className="max-w-40"
            >
              <Text style={styles.reminderButton}>Add Reminder</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.iconsContainer}>
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

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
    paddingBlock: 3,
  },
  reminderButton: {
    paddingInline: 4,
    paddingBlock: 3,
    backgroundColor: "",
  },
  remindTime: {
    color: "#334155",
    fontSize: 16,
  },
});
