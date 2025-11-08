import { Image, Text, TouchableOpacity, View } from "react-native";

const ContentImage = require("@/assets/images/content.jpg");

interface NoContentScreenProps {
  onAddContentPress: () => void;
}
export default function NoContentScreen({
  onAddContentPress,
}: NoContentScreenProps) {
  return (
    <View className="h-3/4 justify-center items-center px-">
      <Image source={ContentImage} className="w-60 h-60" resizeMode="contain" />
      <Text className="text-lg font-medium text-center text-gray-800 my-4 px-6">
        Save content you love by just adding a URL
      </Text>

      <TouchableOpacity
        className="bg-blue-600 px-6 py-3 rounded-full"
        onPress={onAddContentPress}
      >
        <Text className="text-white font-semibold">Add URL</Text>
      </TouchableOpacity>
    </View>
  );
}
