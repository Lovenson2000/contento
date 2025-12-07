import { IosLogoImage } from "@/lib/constants/icons";
import { Image, View } from "react-native";
export default function LogoSection() {
  return (
    <View className="items-center mb-10">
      <Image source={IosLogoImage} className="w-24 h-24" />
    </View>
  );
}
