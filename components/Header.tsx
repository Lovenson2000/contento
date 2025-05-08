import { View, Text, Pressable, SafeAreaView } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { useEffect, useState } from "react";

export default function Header() {
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
    setTitle(titleMap[pathname] || "Content");
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff" }}>
      <View
        className={`h-16 bg-white ${
          isHomePage || isSavedContentPage
            ? "items-center"
            : "flex-row items-center justify-between"
        } px-4 border-b border-slate-200`}
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
