import { useEffect, useState } from "react";
import AddNewContentModal from "@/components/AddContentModal";
import { useShareIntentContext } from "expo-share-intent";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { extractMetadata } from "@/lib/utils/extract_metadata";

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
      if (!hasShareIntent) return;

      const url = shareIntent.webUrl ?? "";
      const metadata = await extractMetadata(url);

      setInitialShareData({
        title: metadata?.title ?? "",
        url,
      });

      setIsModalVisible(true);
    };

    handleShareIntent();
  }, [hasShareIntent, shareIntent.webUrl]);

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
