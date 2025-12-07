import { useTheme } from "@/lib/context/ThemeContext";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const ContentImage = require("@/assets/images/content.jpg");
export default function EmptySavesScreen() {
  const router = useRouter();
  const theme = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <View className="h-3/4 justify-center items-center px-">
      {!isDarkTheme && (
        <Image
          source={ContentImage}
          className="w-60 h-60"
          resizeMode="contain"
        />
      )}
      <Text className="text-lg dark:text-slate-100 font-semibold text-center text-gray-800 mt-4">
        Sign in to save your favorite content
      </Text>
      <Text className="text-center dark:text-slate-200 text-gray-500 mb-6">
        Log in or create an account to start saving and organizing your content.
      </Text>
      <TouchableOpacity
        onPress={() => router.push("/login")}
        className="bg-blue-600 px-6 py-3 rounded-full"
      >
        <Text className="text-white font-semibold">Sign In or Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
