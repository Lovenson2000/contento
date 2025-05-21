import { useEffect, useState } from "react";
import AddNewContentModal from "@/components/AddContentModal";
import { useShareIntentContext } from "expo-share-intent";
import { useRouter } from "expo-router";
import { View } from "react-native";

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
    if ((hasShareIntent && shareIntent?.webUrl) || shareIntent?.text) {
      setInitialShareData({
        title: shareIntent.text?.slice(0, 70) ?? "",
        url: shareIntent.webUrl ?? "",
      });
      setIsModalVisible(true);
    } else {
      router.replace("/");
    }
  }, []);

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
