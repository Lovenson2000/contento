import { useState } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import Button from "@/components/Button";
import Input from "@/components/Input";
import SignInWithGoogle from "@/components/SignInWithGoogle";
import LogoSection from "@/components/LogoSection";
import AppleAuth from "@/components/AppleAuth";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isIos = Platform.OS === "ios";

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
    } else {
      router.replace("/(tabs)");
    }
  }

  return (
    <SafeAreaView className="flex-1 dark:bg-zinc-950 bg-white items-center justify-center">
      <LogoSection />
      <View className="px-8 w-full">
        <Input
          label="Email"
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          labelClassName="dark:text-slate-100 text-slate-900"
          inputClassName="border border-slate-200 dark:bg-slate-900 dark:border-slate-700 bg-white rounded-lg p-4 dark:text-slate-200 text-slate-900"
        />

        <Input
          label="Password"
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry
          labelClassName="dark:text-slate-100 text-slate-900"
          inputClassName="border border-slate-200 dark:bg-slate-900 dark:border-slate-700 bg-white rounded-lg p-4 dark:text-slate-200 text-slate-900"
        />
        <Button title="Sign Up" onPress={signUpWithEmail} disabled={loading} />

        <View className="flex-row items-center my-5">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="mx-2 text-sm text-gray-500">Or</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        <View className="flex flex-col gap-2">
          {isIos && <AppleAuth />}
          <SignInWithGoogle />
        </View>
        <View className="flex-row justify-center mt-8">
          <Text className="dark:text-slate-200 text-gray-500">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text className="text-indigo-600 font-medium"> Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
