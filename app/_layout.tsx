import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import "../styles/global.css";
import Header from "@/components/Header";
export default function RootLayout() {
  return (
    <Stack screenOptions={{ header: () => <Header /> }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="+not-found" />
      <StatusBar style="light" />
    </Stack>
  );
}
