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
import { OnboardingProvider, useOnboarding } from "@/context/OnboardingContext";
import LoadingScreen from "@/components/screens/LoadingScreen";
import { ThemeProvider } from "@/lib/context/ThemeContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldShowAlert: true,
  }),
});

function RootNavigator() {
  const { hasSeenOnboarding } = useOnboarding();
  const router = useRouter();

  useEffect(() => {
    if (hasSeenOnboarding === false) {
      router.replace("/onboarding");
    }
  }, [hasSeenOnboarding, router]);

  if (hasSeenOnboarding === null) {
    return <LoadingScreen />;
  }

  return (
    <Stack screenOptions={{ header: () => <Header /> }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
    </Stack>
  );
}

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
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <OnboardingProvider>
            <ShareIntentProvider
              options={{
                resetOnBackground: true,
                onResetShareIntent: () => router.replace("/"),
              }}
            >
              <RootNavigator />
              <StatusBar style="light" />
            </ShareIntentProvider>
          </OnboardingProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
