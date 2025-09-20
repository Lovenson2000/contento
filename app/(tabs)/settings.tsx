import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  ImageSourcePropType,
  Linking,
} from "react-native";

const DeleteAccountIcon = require("@/assets/images/lock.png");
const LogOutIcon = require("@/assets/images/log-out.png");
const ContactUsIcon = require("@/assets/images/envelope.png");
const PrivacyAndPolicyIcon = require("@/assets/images/shield.png");

export default function SettingsScreen() {
  const router = useRouter();
  const signout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      router.push("/");
      console.log("Signed out successfully");
    }
  };

  const openMailClient = () => {
    Linking.openURL("mailto:beaucicotlovenson@gmail.com");
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4 w-full">
        <SectionHeader title="Account Settings" />
        <SettingsOption
          iconSource={LogOutIcon}
          label="Log out"
          onPress={signout}
        />
        <SettingsOption iconSource={DeleteAccountIcon} label="Delete Account" />

        <SectionHeader title="Support" />
        <SettingsOption
          iconSource={ContactUsIcon}
          label="Contact Us"
          onPress={openMailClient}
        />
        <SettingsOption
          iconSource={PrivacyAndPolicyIcon}
          label="Privacy and Policy"
        />
      </View>
    </ScrollView>
  );
}

export function SectionHeader({ title }: { title: string }) {
  return (
    <View className="mt-4 mb-2">
      <Text className="text-slate-500 font-bold text-[1.4rem]">{title}</Text>
    </View>
  );
}

interface SettingsOptionProps {
  iconSource: ImageSourcePropType;
  label: string;
  onPress?: () => void;
}

export function SettingsOption({
  iconSource,
  label,
  onPress,
}: SettingsOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center py-4 border-b border-slate-200"
    >
      <Image
        source={iconSource}
        style={{ width: 28, height: 28, marginRight: 12 }}
        resizeMode="contain"
      />
      <Text className="text-[1.2rem] font-medium text-slate-800">{label}</Text>
    </Pressable>
  );
}
