import Button from "@/components/Button";
import Input from "@/components/Input";
import LogoSection from "@/components/LogoSection";
import SignInWithGoogle from "@/components/SignInWithGoogle";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

import React, { useState } from "react";
import {
  Alert,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    <SafeAreaView className="flex-1 items-center bg-white justify-center">
      <View className="px-8 w-full">
        <LogoSection />
        <Input
          label="Email"
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
        />

        <Input
          label="Password"
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry
        />

        <TouchableOpacity className="self-end mb-5">
          <Text className="text-[#051542] font-normal">Forgot password?</Text>
        </TouchableOpacity>

        <Button title="Log In" onPress={signInWithEmail} disabled={loading} />

        <View className="flex-row items-center my-5">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="mx-2 text-sm text-gray-500">Or</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        <SignInWithGoogle />
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-500">Don&apos;t have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text className="text-indigo-600 font-medium"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
