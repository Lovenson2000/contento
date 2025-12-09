import { Content } from "@/lib/types";
import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import WebView from "react-native-webview";

export default function UnknownSourceScreen({ content }: { content: Content }) {
  const [loading, setLoading] = useState(true);

  return (
    <View className="flex-1 p-4">
      {loading && <ActivityIndicator size="large" />}
      <WebView
        source={{ uri: content.url }}
        onLoadEnd={() => setLoading(false)}
        style={{ borderRadius: 10 }}
      />
      <View className="mt-4">
        <Text className="text-xl dark:text-slate-50 font-semibold">
          {content.title ?? content.url}
        </Text>
      </View>
    </View>
  );
}
