import { fetchYoutubeVideoDetails } from "@/lib/api/youtube";
import { extractYoutubeIdFromUrl } from "@/lib/utils/content";
import {
  ActivityIndicator,
  Text,
  Pressable,
  View,
  StyleSheet,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { Content } from "@/lib/types";
import { formatRemindTime, formatYoutubeVideoDuration } from "@/lib/utils/time";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function YoutubeScreen({ content }: { content: Content }) {
  const [playing, setPlaying] = useState(false);
  const [videoData, setVideoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const videoId = extractYoutubeIdFromUrl(content.url);

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    async function loadVideoData() {
      try {
        const data = await fetchYoutubeVideoDetails(videoId);
        setVideoData(data);
      } catch (error) {
        console.error("Failed to fetch video details:", error);
      } finally {
        setLoading(false);
      }
    }

    if (videoId) loadVideoData();
  }, [videoId]);

  if (loading) {
    return (
      <View className="p-4">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!videoData) {
    return (
      <View className="p-4">
        <Text className="text-red-500">Failed to load video data.</Text>
      </View>
    );
  }

  return (
    <View className="py-4 px-2">
      <YoutubePlayer
        height={200}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
        webViewStyle={{
          borderRadius: 10,
        }}
      />
      <View className="mt-4 space-y-2">
        <Text className="text-xl font-semibold">
          {videoData.snippet?.title ?? "Untitled"}
        </Text>
      </View>

      <View className="mt-4 flex-row items-center justify-between">
        <View className="bg-red-400 w-40">
          {content.remindAt ? (
            <View className="flex-row items-center gap-2 border rounded-md border-slate-100 px-2 py-1">
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
            <Pressable
              onPress={() => alert("Add Reminder clicked")}
              className="max-w-40"
            >
              <Text className="text-sm text-red-600 px-2 py-1 rounded-lg">
                Add Reminder
              </Text>
            </Pressable>
          )}
        </View>

        <View className="flex-row">
          <Pressable onPress={() => alert("Delete clicked")}>
            <Ionicons name="trash-outline" size={24} color="#051542" />
          </Pressable>
          <Pressable onPress={() => alert("Favorite clicked")}>
            <Ionicons name="heart-outline" size={24} color="#051542" />
          </Pressable>
          <Pressable onPress={() => alert("Share clicked")}>
            <Ionicons name="share-outline" size={24} color="#051542" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
