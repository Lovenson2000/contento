import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ContentDetailPage() {
  const params = useLocalSearchParams();
  const id = params?.id;

  return (
    <View>
      <Text className="text-lg font-semibold">Details for Content {id}</Text>
    </View>
  );
}
