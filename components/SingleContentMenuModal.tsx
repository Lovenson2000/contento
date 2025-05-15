import React from "react";
import { Modal, Pressable, View } from "react-native";
import { MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";
import SingleMenuItem from "./SingleMenuItem";

type Props = {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onAddToFavorites: () => void;
  onRemoveFromFavorites: () => void;
  isFavorite?: boolean;
  position: { top: number; left: number };
};

export default function SingleContentMenuModal({
  visible,
  onClose,
  onDelete,
  onEdit,
  onAddToFavorites,
  onRemoveFromFavorites,
  isFavorite,
  position,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable className="flex-1" onPress={onClose}>
        <View
          className="absolute w-52 bg-white rounded-lg p-2 z-50"
          style={{
            top: position.top + 25,
            left: position.left - 160,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <SingleMenuItem
            label="Edit"
            onPress={() => {
              onEdit();
              onClose();
            }}
            icon={<Feather name="edit-2" size={18} color="#334155" />}
          />

          <SingleMenuItem
            label={isFavorite ? "Mark Not Favorite" : "Add To Favorites"}
            onPress={() => {
              isFavorite ? onRemoveFromFavorites() : onAddToFavorites();
              onClose();
            }}
            icon={<AntDesign name="staro" size={18} color="#334155" />}
          />

          <SingleMenuItem
            label="Delete"
            onPress={() => {
              onDelete();
              onClose();
            }}
            icon={
              <MaterialIcons name="delete-outline" size={20} color="#DC2626" />
            }
            isDestructive
          />
        </View>
      </Pressable>
    </Modal>
  );
}
