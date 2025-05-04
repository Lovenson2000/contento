import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { extractYoutubeIdFromUrl, getContentById } from "@/lib/utils/content";
import { Content } from "@/lib/types";
import { formatRemindTime } from "@/lib/utils/time";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ContentDetailPage() {
  const params = useLocalSearchParams();
  const id = params?.id as string;

  const [content, setContent] = useState<Content | undefined>();

  useEffect(() => {
    if (id) {
      const result = getContentById(id);
      setContent(result);
    }
  }, [id]);

  if (!content) {
    return (
      <View className="p-4">
        <Text>Loading content...</Text>
      </View>
    );
  }

  return (
    <View className="p-4">
      {content.source.toLocaleLowerCase() === "youtube" && (
        <YoutubeContentScreen content={content} />
      )}
    </View>
  );
}
function YoutubeContentScreen({ content }: { content: Content }) {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  return (
    <View>
      <View>
        <YoutubePlayer
          height={400}
          play={playing}
          videoId={extractYoutubeIdFromUrl(content.url)}
          onChangeState={onStateChange}
        />
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
    </View>
  );
}
