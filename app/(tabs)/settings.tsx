import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, Pressable, ScrollView, Image } from "react-native";

const LogoImage = require("@/assets/images/full-logo.png");

export default function SettingsScreen() {
  const user = useAuth()?.user;

  const signout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      console.log("Signed out successfully");
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <SectionHeader title="Account" />
        <Pressable
          onPress={signout}
          className="flex-row gap-4 items-center py-4"
        >
          <MaterialCommunityIcons name="logout" size={24} color="#051542" />
          <Text className="text-[#051542] text-xl">Log out</Text>
        </Pressable>
        <SettingsOption icon="❌" label="Delete Account" />

        <SectionHeader title="Support" />
        <SettingsOption icon="📞" label="Contact Us" />
        <SettingsOption icon="🔒" label="Privacy and Policy" />
      </View>
    </ScrollView>
  );
}

export function SectionHeader({ title }: { title: string }) {
  return (
    <View className="mt-4 mb-2">
      <Text className="text-slate-500 font-semibold text-sm">{title}</Text>
    </View>
  );
}

interface SettingsOptionProps {
  icon: string;
  label: string;
  onPress?: () => void;
}

export function SettingsOption({ icon, label, onPress }: SettingsOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center py-4 border-b border-slate-200"
    >
      <Text className="text-xl mr-3">{icon}</Text>
      <Text className="text-base text-slate-800">{label}</Text>
    </Pressable>
  );
}
