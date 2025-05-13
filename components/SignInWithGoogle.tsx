import React, { useEffect } from "react";
import {
  GoogleSignin,
  statusCodes,
  SignInResponse,
} from "@react-native-google-signin/google-signin";
import { supabase } from "@/lib/supabase";
import { Pressable, StyleSheet, Text, Image } from "react-native";
import { useRouter } from "expo-router";
const GoogleIcon = require("@/assets/images/google.png");

export default function SignInWithGoogle() {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive"],
      iosClientId:
        "261684861816-7solo5na1ar1u3547qe2ieu49477omgm.apps.googleusercontent.com",
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      profileImageSize: 120,
      webClientId:
        "261684861816-eio2n0qt1fss14ub16atphhure5eiq8i.apps.googleusercontent.com",
    });
  }, []);

  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (isSignInResponse(userInfo)) {
        if (userInfo?.data?.idToken) {
          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: userInfo.data.idToken,
          });

          console.log("Supabase Sign-In:", error, data);
          if (error) {
            alert("Error signing in with Supabase: " + error.message);
          } else {
            // ✅ navigate to the home screen after successful sign-in
            router.replace("/(tabs)");
          }
        } else {
          throw new Error("No ID token present!");
        }
      } else {
        console.log("Sign-in was cancelled or failed.");
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("Sign-In cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign-In in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play Services not available");
      } else {
        console.log("Error during Google Sign-In: ", error.message);
      }
    }
  };

  const isSignInResponse = (response: any): response is SignInResponse => {
    return response ?? response.idToken ?? response.user;
  };

  return (
    <Pressable style={styles.customGoogleButton} onPress={handleGoogleSignIn}>
      <Image source={GoogleIcon} style={styles.icon} />
      <Text style={styles.googleButtonText}>Continue with Google</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  customGoogleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    gap: 4,
  },
  googleButtonText: {
    color: "#051542",
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
