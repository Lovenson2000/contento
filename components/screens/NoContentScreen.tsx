import { Image, Text, TouchableOpacity, View } from "react-native";

const ContentImage = require("@/assets/images/content.jpg");
export default function NoContentScreen() {
  return (
    <View className="h-3/4 justify-center items-center px-">
      <Image source={ContentImage} className="w-60 h-60" resizeMode="contain" />
      <Text className="text-lg font-semibold text-center text-gray-800 mt-4">
        Sign in to save your favorite content
      </Text>
      <Text className="text-center text-gray-500 mb-6">
        You haven't added any content yet
      </Text>
      <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-full">
        <Text className="text-white font-semibold">Add URL</Text>
      </TouchableOpacity>
    </View>
  );
}
