import { LogoImage } from "@/lib/constants/icons";
import { Image, View } from "react-native";
export default function LogoSection() {
  return (
    <View className="items-center mb-10">
      <Image source={LogoImage} className="w-60 h-48" />
    </View>
  );
}
