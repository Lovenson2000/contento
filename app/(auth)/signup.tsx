import { useState } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import Button from "@/components/Button";
import Input from "@/components/Input";
import SignInWithGoogle from "@/components/SignInWithGoogle";
import LogoSection from "@/components/LogoSection";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <LogoSection />
      <View className="px-8 w-full">
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
        <Button title="Sign Up" onPress={signUpWithEmail} disabled={loading} />

        <View className="flex-row items-center my-5">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="mx-2 text-sm text-gray-500">Or</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        <SignInWithGoogle />
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-500">Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text className="text-blue-500 font-medium"> Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
