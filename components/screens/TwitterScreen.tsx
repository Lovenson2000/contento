import { Content } from "@/lib/types";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Tweet } from "rn-tweet-embed";
import ContentActions from "../ContentActions";

export default function TwitterScreen({ content }: { content: Content }) {
  return (
    <SafeAreaView className="bg-red-700">
      <View className="p-4">
        <Tweet
          theme="light"
          tweetUrl={content.url}
          embedParams={{
            align: "center",
          }}
          webViewProps={{
            style: {
              borderRadius: 10,
              overflow: "hidden",
              maxHeight: 700,
              backgroundColor: "white",
            },
            scrollEnabled: true,
            allowsAirPlayForMediaPlayback: true,
            allowsPictureInPictureMediaPlayback: true,
            mediaPlaybackRequiresUserAction: false,
            allowsInlineMediaPlayback: true,
            allowsLinkPreview: true,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
