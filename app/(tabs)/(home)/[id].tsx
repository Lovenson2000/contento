import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Content } from "@/lib/types";
import TwitterScreen from "@/components/screens/TwitterScreen";
import YoutubeScreen from "@/components/screens/YoutubeScreen";
import { fetchContentById } from "@/lib/api/content";

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
    </View>
  );
}
