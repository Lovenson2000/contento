import { useEffect, useState } from "react";
import AddNewContentModal from "@/components/AddContentModal";
import { useShareIntentContext } from "expo-share-intent";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { extractYoutubeIdFromUrl, getContentSource } from "@/lib/utils/content";
import { fetchYoutubeVideoDetails } from "@/lib/api/youtube";

export default function ShareScreen() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initialShareData, setInitialShareData] = useState<{
    title?: string;
    url?: string;
  } | null>(null);

  const { shareIntent, hasShareIntent, resetShareIntent } =
    useShareIntentContext();

  useEffect(() => {
    const handleShareIntent = async () => {
      if ((hasShareIntent && shareIntent?.webUrl) || shareIntent?.text) {
        // FOR NOW WE CAN ONLY AUTO FETCH YOUTUBE TITLES
        const source = getContentSource(shareIntent.webUrl ?? "");
        if (source?.toLowerCase() === "youtube") {
          try {
            const videoId = extractYoutubeIdFromUrl(shareIntent.webUrl ?? "");

            if (videoId) {
              const data = await fetchYoutubeVideoDetails(videoId);
              const videoTitle = data.snippet?.title;

              setInitialShareData({
                title: videoTitle,
                url: shareIntent.webUrl ?? "",
              });
            }
          } catch (error) {
            console.error("Failed to fetch YouTube title:", error);
          }
        }
        setIsModalVisible(true);
      } else {
        router.replace("/");
      }
    };

    handleShareIntent();
  }, [hasShareIntent, shareIntent, router]);

  const handleClose = () => {
    setIsModalVisible(false);
    resetShareIntent();
    router.replace("/");
  };

  return (
    <View className="flex-1 bg-white">
      <AddNewContentModal
        isVisible={isModalVisible}
        onClose={handleClose}
        onContentAdded={handleClose}
        initialData={initialShareData ?? undefined}
      />
    </View>
  );
}
