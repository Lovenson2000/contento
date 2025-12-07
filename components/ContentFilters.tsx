import { useAuth } from "@/context/AuthContext";
import { getSocialIcon } from "@/lib/constants/social-icons";
import { useTheme } from "@/lib/context/ThemeContext";
import { capitalizeFirstLetter } from "@/lib/utils/content";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";

export default function ContentsFilters({
  onSourcePress,
  onClearFilter,
  onTagsPress,
  selectedSource,
  selectedTags,
  showFavorites,
  onFavoritePress,
}: {
  onSourcePress: () => void;
  onClearFilter: () => void;
  onTagsPress: () => void;
  selectedSource: string | null;
  selectedTags: string[];
  showFavorites: boolean;
  onFavoritePress: () => void;
}) {
  const user = useAuth().user;
  const theme = useTheme();
  const isDarkTheme = theme === "dark";

  const resolvedIcon = selectedSource
    ? getSocialIcon(selectedSource, isDarkTheme)
    : undefined;
  const iconSource = resolvedIcon
    ? (resolvedIcon as ImageSourcePropType)
    : null;

  const selectedSourceLabel = selectedSource
    ? capitalizeFirstLetter(selectedSource)
    : null;

  return (
    <View className="flex-row items-center justify-between mb-4">
      <Pressable
        className={`py-2 px-4 rounded-full ${
          !selectedSource && selectedTags.length === 0 && !showFavorites
            ? "dark:bg-slate-700 bg-slate-100"
            : "border dark:border-slate-800 border-slate-100"
        }`}
        onPress={onClearFilter}
        disabled={!user}
      >
        <Text className="dark:text-white">All</Text>
      </Pressable>

      <Pressable
        className={`py-2 px-3 rounded-full ${
          selectedSource
            ? "dark:bg-slate-700 bg-slate-100"
            : "border dark:border-slate-700 border-slate-100"
        }`}
        onPress={onSourcePress}
        disabled={!user}
      >
        <View className="flex-row items-center justify-center gap-1.5">
          {iconSource ? (
            <>
              <Image source={iconSource} style={{ width: 16, height: 16 }} />
              <Text>{selectedSourceLabel}</Text>
            </>
          ) : (
            <>
              <Entypo
                name="network"
                size={20}
                color={`${isDarkTheme ? "white" : "black"}`}
              />
              <Text className="dark:text-white">Sources</Text>
            </>
          )}
        </View>
      </Pressable>

      <Pressable
        className={`py-2 px-3 rounded-full ${
          selectedTags.length > 0
            ? "dark:bg-slate-700 bg-slate-100"
            : "border dark:border-slate-700 border-slate-100"
        }`}
        onPress={onTagsPress}
        disabled={!user}
      >
        <View className="flex-row items-center justify-center gap-1.5">
          <FontAwesome
            name="tags"
            size={16}
            color={`${isDarkTheme ? "white" : "#041031"}`}
          />
          <Text className="dark:text-white">Tags</Text>
        </View>
      </Pressable>

      <Pressable
        className={`py-2 px-3 rounded-full 
            ${
              showFavorites
                ? "dark:bg-slate-700 bg-slate-100"
                : "border dark:border-slate-700 border-slate-100"
            }`}
        onPress={onFavoritePress}
        disabled={!user}
      >
        <View className="flex-row items-center justify-center gap-1.5">
          <FontAwesome
            name="star-o"
            size={16}
            color={`${isDarkTheme ? "white" : "#041031"}`}
          />
          <Text className="dark:text-white">Favorites</Text>
        </View>
      </Pressable>
    </View>
  );
}
