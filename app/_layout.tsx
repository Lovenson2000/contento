import { StatusBar } from "expo-status-bar";
import { Stack, useRouter } from "expo-router";
import "../styles/global.css";
import Header from "@/components/Header";
import { ShareIntentProvider } from "expo-share-intent";

export default function RootLayout() {
  const router = useRouter();
  return (
    <ShareIntentProvider
      options={{
        resetOnBackground: true,
        onResetShareIntent: () =>
          // used when app going in background and when the reset button is pressed
          router.replace({
            pathname: "/",
          }),
      }}
    >
      <Stack screenOptions={{ header: () => <Header /> }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
        <StatusBar style="light" />
      </Stack>
    </ShareIntentProvider>
  );
}
