import ConfirmDeleteAccountModal from "@/components/settings/ConfirmDeleteAccountModal";
import SectionHeader from "@/components/settings/SectionHeader";
import SettingsOption from "@/components/settings/SettingsOption";
import { useAuth } from "@/context/AuthContext";
import {
  ContactUsIcon,
  DeleteAccountIcon,
  LogOutIcon,
  PrivacyAndPolicyIcon,
} from "@/lib/constants/icons";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, ScrollView, Linking } from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const user = useAuth()?.user;
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const signout = async () => {
    if (!user) return;
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      router.push("/");
      console.log("Signed out successfully");
    }
  };

  const goToLogin = () => {
    router.push("/login");
  };

  const deleteAccount = async () => {
    if (!user) return;
    const { error } = await supabase.auth.admin.deleteUser(user.id);
    if (error) {
      console.error("Error deleting account:", error.message);
    } else {
      queryClient.clear();
      setShowDeleteModal(false);
      router.push("/");
      console.log("Account deleted successfully");
    }
  };

  const openMailClient = () => {
    Linking.openURL("mailto:beaucicotlovenson@gmail.com");
  };

  const openPrivacyPolicy = () => {
    Linking.openURL("https://contentoapp.netlify.app/privacy");
  };

  return (
    <>
      <ScrollView className="flex-1 bg-white">
        <View className="p-4 w-full">
          <SectionHeader title="Account Settings" />
          <SettingsOption
            iconSource={LogOutIcon}
            label={user ? "Log Out" : "Log In"}
            onPress={user ? signout : goToLogin}
          />
          <SettingsOption
            iconSource={DeleteAccountIcon}
            label="Delete Account"
            onPress={() => setShowDeleteModal(true)}
          />
          <SectionHeader title="Support" />
          <SettingsOption
            iconSource={ContactUsIcon}
            label="Contact Us"
            onPress={openMailClient}
          />
          <SettingsOption
            iconSource={PrivacyAndPolicyIcon}
            label="Privacy and Policy"
            onPress={openPrivacyPolicy}
          />
        </View>
      </ScrollView>
      <ConfirmDeleteAccountModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteAccount={deleteAccount}
      />
    </>
  );
}
