import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Content } from "@/lib/types";
import TwitterScreen from "@/components/screens/TwitterScreen";
import YoutubeScreen from "@/components/screens/YoutubeScreen";
import { fetchContentById } from "@/lib/api/content";
import LinkedinScreen from "@/components/screens/LinkedinScreen";
import QuoraScreen from "@/components/screens/QuoraScreen";
import InstagramScreen from "@/components/screens/InstagramScreen";
import FacebookScreen from "@/components/screens/FacebookScreen";
import RedditScreen from "@/components/screens/RedditScreen";
import TiktokScreen from "@/components/screens/TiktokScreen";
import MediumScreen from "@/components/screens/MediumScreen";
import BlueSkyScreen from "@/components/screens/BlueskyScreen";
import ThreadsScreen from "@/components/screens/ThreadsScreen";
import PinterestScreen from "@/components/screens/PinterestScreen";

export default function ContentDetailPage() {
  const params = useLocalSearchParams();
  const id = params?.id as string;

  const [content, setContent] = useState<Content | undefined>();

  useEffect(() => {
    if (id) {
      fetchContentById(id).then((result) => {
        setContent(result || undefined);
      });
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
    <View className="flex-1 bg-white p-4">
      {content?.source?.toLocaleLowerCase() === "youtube" && (
        <YoutubeScreen content={content} />
      )}

      {content?.source?.toLocaleLowerCase() === "twitter" && (
        <TwitterScreen content={content} />
      )}
      {content?.source?.toLowerCase() === "linkedin" && (
        <LinkedinScreen content={content} />
      )}
      {content?.source?.toLowerCase() === "quora" && (
        <QuoraScreen content={content} />
      )}
      {content?.source?.toLowerCase() === "instagram" && (
        <InstagramScreen content={content} />
      )}
      {content?.source?.toLowerCase() === "facebook" && (
        <FacebookScreen content={content} />
      )}
      {content?.source?.toLowerCase() === "reddit" && (
        <RedditScreen content={content} />
      )}
      {content?.source?.toLowerCase() === "tiktok" && (
        <TiktokScreen content={content} />
      )}
      {content?.source?.toLowerCase() === "medium" && (
        <MediumScreen content={content} />
      )}
      {content?.source?.toLowerCase() === "bluesky" && (
        <BlueSkyScreen content={content} />
      )}
      {content?.source?.toLowerCase() === "threads" && (
        <ThreadsScreen content={content} />
      )}
      {content?.source?.toLowerCase() === "pinterest" && (
        <PinterestScreen content={content} />
      )}
      {content?.source?.toLowerCase() === "unknown" && (
        <BlueSkyScreen content={content} />
      )}
    </View>
  );
}
