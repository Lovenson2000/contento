import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getContentById } from "@/lib/utils/content";
import { Content } from "@/lib/types";
import TwitterScreen from "@/components/screens/TwitterScreen";
import YoutubeScreen from "@/components/screens/YoutubeScreen";

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
    <View style={styles.contentScreenContainer}>
      {content.source.toLocaleLowerCase() === "youtube" && (
        <YoutubeScreen content={content} />
      )}

      {content.source.toLocaleLowerCase() === "twitter" && (
        <TwitterScreen content={content} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contentScreenContainer: {
    backgroundColor: "white",
    flex: 1,
    padding: 16,
  },
});
