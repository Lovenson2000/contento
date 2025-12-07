import { Content } from "@/lib/types";
import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import WebView from "react-native-webview";

export default function QuoraScreen({ content }: { content: Content }) {
  const [loading, setLoading] = useState(true);

  return (
    <View className="flex-1 p-4 dark:bg-zinc-950">
      {loading && <ActivityIndicator size="large" />}
      <WebView
        source={{ uri: content.url }}
        onLoadEnd={() => setLoading(false)}
        style={{ borderRadius: 10 }}
      />
      <View className="mt-4">
        <Text className="text-xl dark:text-slate-100 font-semibold">
          {content.title ?? "Quora Content"}
        </Text>
      </View>
    </View>
  );
}
