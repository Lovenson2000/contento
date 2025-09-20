import { LogoImage } from "@/lib/constants/icons";
import { Image, Text, View } from "react-native";
export default function LogoSection() {
  return (
    <View className="items-center mb-10">
      <Image source={LogoImage} className="w-60 h-48" />
      <Text className="text-center text-gray-600 mt-1">
        Sign in now to save and enjoy content you love
      </Text>
    </View>
  );
}
