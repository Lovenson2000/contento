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
    <SafeAreaView className="bg-white dark:bg-zinc-950">
      <View
        className={`h-16 bg-white dark:bg-zinc-950 ${
          isHomePage || isSettingsPage
            ? "items-center"
            : "flex-row items-center justify-between"
        } px-4 border-b dark:border-zinc-900 border-slate-200`}
      >
        {isHomePage || isSettingsPage ? (
          <Text className="text-2xl text-center font-medium center dark:text-slate-100 text-slate-900">
            {title}
          </Text>
        ) : (
          <>
            <Pressable onPress={() => router.back()}>
              <Text className="text-xl dark:text-slate-100 text-slate-900">
                ←
              </Text>
            </Pressable>
            <Text className="text-3xl font-medium center dark:text-slate-100 text-slate-900">
              {title}
            </Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
