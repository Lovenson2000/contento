import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "@/lib/context/ThemeContext";

export default function TabLayout() {
  const theme = useTheme();
  const isDarkTheme = theme === "dark";
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: `${isDarkTheme ? "white" : "#051542"}`,
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: `${isDarkTheme ? "black" : "white"}`,
          borderTopColor: `${isDarkTheme ? "#262e3d" : "#e2e8f0"}`,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={24}
              color={`${isDarkTheme ? "white" : color}`}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "bookmark-check" : "bookmark-check-outline"}
              size={24}
              color={`${isDarkTheme ? "white" : color}`}
            />
          ),
        }}
      />
    </Tabs>
  );
}
