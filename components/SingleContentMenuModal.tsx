import {
  Linking,
  Modal,
  Pressable,
  View,
  Platform,
  Alert,
  Dimensions,
} from "react-native";
import { MaterialIcons, Feather, AntDesign, Entypo } from "@expo/vector-icons";
import SingleMenuItem from "./SingleMenuItem";
import { Content } from "@/lib/types";
import * as WebBrowser from "expo-web-browser";
import { capitalizeFirstLetter, normalizeUrl } from "@/lib/utils/content";
import { useTheme } from "@/lib/context/ThemeContext";

type Props = {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onAddToFavorites: () => void;
  onRemoveFromFavorites: () => void;
  onRemoveReminder: () => void;
  isFavorite?: boolean;
  menuY: number;
  content: Content;
};

export default function SingleContentMenuModal({
  visible,
  onClose,
  onDelete,
  onEdit,
  onAddToFavorites,
  onRemoveFromFavorites,
  onRemoveReminder,
  isFavorite,
  menuY,
  content,
}: Props) {
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const MODAL_HEIGHT = 230;
  const PADDING = 20;

  const top =
    menuY + MODAL_HEIGHT + PADDING > SCREEN_HEIGHT
      ? SCREEN_HEIGHT - MODAL_HEIGHT - PADDING
      : menuY;

  const theme = useTheme();
  const isDarkTheme = theme === "dark";
  const handleOpenLink = async () => {
    const url = normalizeUrl(content.url);

    try {
      if (Platform.OS === "android") {
        await Linking.openURL(url);
      } else {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          await WebBrowser.openBrowserAsync(url);
        }
      }
    } catch (error) {
      console.warn("Failed to open URL:", url, error);
      try {
        await WebBrowser.openBrowserAsync(url);
      } catch {
        Alert.alert("Error", "Could not open the link.");
      }
    } finally {
      onClose();
    }
  };
  const handleFavoriteToggle = async () => {
    if (isFavorite) {
      onRemoveFromFavorites();
    } else {
      onAddToFavorites();
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable className="flex-1" onPress={onClose}>
        <View
          className="absolute w-60 dark:bg-slate-700 bg-white rounded-lg py-1 z-50"
          style={{
            top: top + 40,
            right: 15,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <SingleMenuItem
            label={
              content.source?.toLocaleLowerCase() === "unknown"
                ? "Open"
                : `Open in ${capitalizeFirstLetter(content.source!)}`
            }
            onPress={() => {
              handleOpenLink();
            }}
            icon={
              <Entypo
                name="link"
                size={18}
                color={`${isDarkTheme ? "white" : "#334155"}`}
              />
            }
          />

          <SingleMenuItem
            label="Edit"
            onPress={() => {
              onEdit();
              onClose();
            }}
            icon={
              <Feather
                name="edit-2"
                size={18}
                color={`${isDarkTheme ? "white" : "#334155"}`}
              />
            }
          />

          <SingleMenuItem
            label={isFavorite ? "Mark Not Favorite" : "Add To Favorites"}
            onPress={handleFavoriteToggle}
            icon={
              isFavorite ? (
                <AntDesign
                  name="star"
                  size={18}
                  color={`${isDarkTheme ? "white" : "#334155"}`}
                />
              ) : (
                <AntDesign
                  name="staro"
                  size={18}
                  color={`${isDarkTheme ? "white" : "#334155"}`}
                />
              )
            }
          />

          {content.remindAt && (
            <SingleMenuItem
              label="Remove Reminder"
              onPress={() => {
                onRemoveReminder();
                onClose();
              }}
              icon={
                <MaterialIcons
                  name="alarm-off"
                  size={18}
                  color={`${isDarkTheme ? "white" : "#334155"}`}
                />
              }
            />
          )}

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
