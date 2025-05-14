import { fetchYoutubeVideoDetails } from "@/lib/api/youtube";
import { extractYoutubeIdFromUrl } from "@/lib/utils/content";
import { ActivityIndicator, Text, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { Content } from "@/lib/types";
import ContentActions from "../ContentActions";

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
    <View className="py-4">
      <YoutubePlayer
        height={200}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
        webViewStyle={{
          borderRadius: 10,
        }}
      />
      <View className="mt-4 mb-4">
        <Text className="text-xl font-semibold">
          {videoData.snippet?.title ?? "Untitled"}
        </Text>
      </View>
      <ContentActions content={content} />
    </View>
  );
}
