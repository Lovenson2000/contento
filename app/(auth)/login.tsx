import AppleAuth from "@/components/AppleAuth";
import Button from "@/components/Button";
import Input from "@/components/Input";
import LogoSection from "@/components/LogoSection";
import SignInWithGoogle from "@/components/SignInWithGoogle";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

import { useState } from "react";
import {
  Alert,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Platform,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isIos = Platform.OS === "ios";

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
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
    <SafeAreaView className="flex-1 items-center dark:bg-zinc-950 bg-white justify-center">
      <View className="px-8 w-full">
        <LogoSection />
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
        <Button title="Log In" onPress={signInWithEmail} disabled={loading} />

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
            Don&apos;t have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text className="text-indigo-600 font-medium"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
