import { View, Text, Pressable, SafeAreaView } from "react-native";
import { useRouter, usePathname } from "expo-router";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const titleMap: Record<string, string> = {
    "/": "Home",
    "/(tabs)": "Home",
    "/(tabs)/index": "Home",
    "/settings": "Settings",
    "/(home)/content-details": "Details",
  };

  const title = titleMap[pathname] || "Content";
  const isHomePage = pathname === "/";
  const isSettingsPage = pathname === "/settings";

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff" }}>
      <View
        className={`h-16 bg-white ${
          isHomePage || isSettingsPage
            ? "items-center"
            : "flex-row items-center justify-between"
        } px-4 border-b border-slate-200`}
      >
        {isHomePage || isSettingsPage ? (
          <Text className="text-2xl text-center font-medium center text-slate-900">
            {title}
          </Text>
        ) : (
          <>
            <Pressable onPress={() => router.back()}>
              <Text className="text-xl">←</Text>
            </Pressable>
            <Text className="text-3xl font-medium center text-slate-900">
              {title}
            </Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
