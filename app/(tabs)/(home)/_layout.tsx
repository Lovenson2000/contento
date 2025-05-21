import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="[id]" />
      </Stack>
    </AuthProvider>
  );
}
