import { Content } from "@/lib/types";
import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import WebView from "react-native-webview";
export default function TiktokScreen({ content }: { content: Content }) {
  const [loading, setLoading] = useState(true);

  return (
    <View className="flex-1 p-4">
      {loading && <ActivityIndicator size="large" />}
      <WebView
        source={{ uri: content.url }}
        onLoadEnd={() => setLoading(false)}
        style={{ borderRadius: 10 }}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
      />
      <View className="mt-4">
        <Text className="text-xl font-semibold">
          {content.title ?? "TikTok Video"}
        </Text>
      </View>
    </View>
  );
}
