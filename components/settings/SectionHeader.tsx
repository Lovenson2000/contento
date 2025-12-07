import { Text, View } from "react-native";

export default function SectionHeader({ title }: { title: string }) {
  return (
    <View className="mt-4 mb-2">
      <Text className="text-slate-500 dark:text-slate-200 font-bold text-[1.4rem]">
        {title}
      </Text>
    </View>
  );
}
