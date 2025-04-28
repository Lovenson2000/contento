import { Text, View } from "react-native";
import { Image } from "expo-image";
const LogoImage = require("@/assets/images/logo.jpg");
export default function Index() {
  return (
    <View className="bg-white flex-1 items-center justify-center">
      <View className="flex flex-col items-center">
        <Image source={LogoImage} style={{ width: 200, height: 200 }} />
        <Text className="text-4xl">Welcome to Contento</Text>
      </View>
    </View>
  );
}
