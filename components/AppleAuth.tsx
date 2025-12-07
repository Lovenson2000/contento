import { Platform, Text, Pressable } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "@/lib/context/ThemeContext";

export default function AppleAuth() {
  const router = useRouter();
  const theme = useTheme();
  const isDarkTheme = theme === "dark";

  if (Platform.OS !== "ios") return null;

  const handleAppleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential.identityToken) {
        throw new Error("No identityToken.");
      }

      const { error } = await supabase.auth.signInWithIdToken({
        provider: "apple",
        token: credential.identityToken,
      });

      if (!error && credential.fullName) {
        const nameParts = [
          credential.fullName.givenName,
          credential.fullName.middleName,
          credential.fullName.familyName,
        ].filter(Boolean);

        await supabase.auth.updateUser({
          data: {
            full_name: nameParts.join(" "),
            given_name: credential.fullName.givenName,
            family_name: credential.fullName.familyName,
          },
        });
        router.replace("/(tabs)");
      }
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        (err as any).code === "ERR_REQUEST_CANCELED"
      ) {
        console.log("Apple sign-in cancelled");
      } else {
        console.log("Apple sign-in error:", err);
      }
    }
  };

  return (
    <Pressable
      onPress={handleAppleSignIn}
      className="flex-row items-center border dark:border-slate-700 border-slate-200 justify-center dark:bg-slate-900 bg-white py-4 px-5 rounded-lg gap-0.5"
    >
      <FontAwesome
        name="apple"
        size={24}
        color={`${isDarkTheme ? "white" : "#374151"}`}
      />
      <Text className="dark:text-slate-50 text-[#051542] text-xl ml-2">
        Continue with Apple
      </Text>
    </Pressable>
  );
}
