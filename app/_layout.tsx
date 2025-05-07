import { StatusBar } from "expo-status-bar";
import { View, Text, Pressable, SafeAreaView } from "react-native";
import { useRouter, Stack, usePathname } from "expo-router";
import "../styles/global.css";
import { useEffect, useState } from "react";
export default function RootLayout() {
  return (
    <Stack screenOptions={{ header: () => <Header /> }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="+not-found" />
      <StatusBar style="light" />
    </Stack>
  );
}

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);
  const isHomePage = currentPath === "/";
  const isSavedContentPage = currentPath === "/saved-content";

  const titleMap: Record<string, string> = {
    "/": "Home",
    "/(tabs)": "Home",
    "/(tabs)/index": "Home",
    "/(tabs)/saved-content": "Saved",
    "/(home)/content-details": "Details",
  };

  const [title, setTitle] = useState(titleMap[pathname] || "Content");

  useEffect(() => {
    console.log("Route changed to:", pathname);
    setTitle(titleMap[pathname] || "Content");
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff" }}>
      <View
        className={`h-8 bg-white ${
          isHomePage || isSavedContentPage
            ? "items-center"
            : "flex-row items-center justify-between"
        } px-4 border-b border-[#fdfbfb]`}
      >
        {isHomePage || isSavedContentPage ? (
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
