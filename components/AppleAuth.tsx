import { Platform, Image, Text, Pressable } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { supabase } from "@/lib/supabase";
const AppleIcon = require("@/assets/images/apple.png");

export default function AppleAuth() {
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
      className="flex-row items-center border border-slate-200 justify-center bg-white py-3 px-5 rounded-lg gap-2"
    >
      <Image source={AppleIcon} className="w-[30px] h-[30px]" />
      <Text className="text-[#051542] text-xl ml-2">Continue with Apple</Text>
    </Pressable>
  );
}
