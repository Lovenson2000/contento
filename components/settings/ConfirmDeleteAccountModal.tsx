import {
  View,
  ScrollView,
  Linking,
  Modal,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";

type ConfirmDeleteAccountModalProps = {
  showDeleteModal: boolean;
  setShowDeleteModal: (showModal: boolean) => void;
  deleteAccount: () => void;
};
export default function ConfirmDeleteAccountModal({
  showDeleteModal,
  setShowDeleteModal,
  deleteAccount,
}: ConfirmDeleteAccountModalProps) {
  return (
    <Modal
      visible={showDeleteModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowDeleteModal(false)}
    >
      <Pressable
        className="flex-1 bg-black/50 justify-center items-center px-6"
        onPress={() => setShowDeleteModal(false)}
      >
        <Pressable
          className="bg-white rounded-2xl p-6 w-full max-w-md"
          onPress={(e) => e.stopPropagation()}
        >
          <Text className="text-2xl font-bold text-gray-900 mb-3">
            Delete Account?
          </Text>

          <Text className="text-base text-gray-700 mb-4">
            Are you sure you want to delete your account? This action will:
          </Text>

          <View className="mb-6 space-y-2">
            <View className="flex-row items-start mb-2">
              <Text className="text-red-500 mr-2">•</Text>
              <Text className="text-gray-700 flex-1">
                will delete all your saved content and data
              </Text>
            </View>
            <View className="flex-row items-start mb-2">
              <Text className="text-red-500 mr-2">•</Text>
              <Text className="text-gray-700 flex-1">
                will remove your account and profile information
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-red-500 mr-2">•</Text>
              <Text className="text-gray-700 flex-1">Cannot be reversed</Text>
            </View>
          </View>

          <View className="flex-col gap-4 space-y-3">
            <TouchableOpacity
              className="bg-red-600 py-4 rounded-xl"
              onPress={deleteAccount}
            >
              <Text className="text-white text-center font-semibold text-base">
                Delete My Account
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-gray-200 py-4 rounded-xl"
              onPress={() => setShowDeleteModal(false)}
            >
              <Text className="text-gray-900 text-center font-semibold text-base">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
