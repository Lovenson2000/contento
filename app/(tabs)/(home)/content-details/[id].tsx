import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { extractYoutubeIdFromUrl, getContentById } from "@/lib/utils/content";
import { Content } from "@/lib/types";
import { formatRemindTime } from "@/lib/utils/time";
import Ionicons from "@expo/vector-icons/Ionicons";
import { fetchYoutubeVideoDetails } from "@/lib/api/youtube";

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

export function YoutubeContentScreen({ content }: { content: Content }) {
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

      <View className="mt-4">
        {content.remindAt ? (
          <View className="flex-row max-w-40 items-center gap-2 border rounded-md border-slate-100 px-2 py-1">
            <Ionicons name="notifications-outline" size={16} color="#334155" />
            <Text className="text-sm text-slate-700">
              {formatRemindTime(new Date(content.remindAt))}
            </Text>
          </View>
        ) : (
          <Pressable
            onPress={() => alert("Add Reminder clicked")}
            className="max-w-40"
          >
            <Text className="text-sm text-slate-900 bg-gray-100 px-2 py-1 rounded-lg">
              Add Reminder
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
