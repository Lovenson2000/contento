import React, { useEffect } from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  SignInResponse,
} from "@react-native-google-signin/google-signin";
import { supabase } from "@/lib/supabase";

export default function SignInWithGoogle() {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      webClientId:
        "261684861816-eio2n0qt1fss14ub16atphhure5eiq8i.apps.googleusercontent.com",
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (isSignInResponse(userInfo)) {
        console.log(userInfo);

        if (userInfo?.data?.idToken) {
          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: userInfo.data.idToken,
          });

          console.log("Supabase Sign-In:", error, data);
          if (error) {
            alert("Error signing in with Supabase: " + error.message);
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
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Light}
      onPress={handleGoogleSignIn}
    />
  );
}
