import { Content } from "@/lib/types";
import { SafeAreaView, Text, View } from "react-native";
import { Tweet } from "rn-tweet-embed";

export default function TwitterScreen({ content }: { content: Content }) {
  return (
    <SafeAreaView>
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
