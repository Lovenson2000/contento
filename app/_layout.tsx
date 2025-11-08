import { StatusBar } from "expo-status-bar";
import { Stack, useRouter } from "expo-router";
import "../styles/global.css";
import Header from "@/components/Header";
import { ShareIntentProvider } from "expo-share-intent";
import * as Notifications from "expo-notifications";
import { AuthProvider } from "@/context/AuthContext";
import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/config/react-query-provider";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldShowAlert: true,
  }),
});

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;
        if (data?.contentId) {
          const contentId =
            typeof data.contentId === "string"
              ? data.contentId
              : JSON.stringify(data.contentId);
          router.push(`/${contentId}`);
        }
      }
    );

    return () => subscription.remove();
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
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
          </Stack>
          <StatusBar style="light" />
        </ShareIntentProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
