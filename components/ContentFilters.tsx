import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MediumIcon,
  PinterestIcon,
  QuoraIcon,
  RedditIcon,
  ThreadsIcon,
  TiktokIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/lib/constants/icons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";

const socialMediaIcons: Record<string, ImageSourcePropType> = {
  YouTube: YoutubeIcon,
  Tiktok: TiktokIcon,
  Instagram: InstagramIcon,
  Twitter: TwitterIcon,
  Facebook: FacebookIcon,
  Reddit: RedditIcon,
  LinkedIn: LinkedInIcon,
  Medium: MediumIcon,
  Quora: QuoraIcon,
  Threads: ThreadsIcon,
  Pinterest: PinterestIcon,
};

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
  const iconSource =
    selectedSource && socialMediaIcons[selectedSource]
      ? socialMediaIcons[selectedSource]
      : null;

  return (
    <View className="flex-row items-center justify-between mb-4">
      <Pressable
        className={`py-2 px-4 rounded-full ${
          !selectedSource && selectedTags.length === 0
            ? "bg-slate-100"
            : "border border-slate-100"
        }`}
        onPress={onClearFilter}
      >
        <Text>All</Text>
      </Pressable>

      <Pressable
        className={`py-2 px-3 rounded-full ${
          selectedSource ? "bg-slate-100" : "border border-slate-100"
        }`}
        onPress={onSourcePress}
      >
        <View className="flex-row items-center justify-center gap-1.5">
          {iconSource ? (
            <>
              <Image source={iconSource} style={{ width: 16, height: 16 }} />
              <Text>{selectedSource}</Text>
            </>
          ) : (
            <>
              <Entypo name="network" size={20} color="black" />
              <Text>Sources</Text>
            </>
          )}
        </View>
      </Pressable>

      <Pressable
        className={`py-2 px-3 rounded-full ${
          selectedTags.length > 0 ? "bg-slate-100" : "border border-slate-100"
        }`}
        onPress={onTagsPress}
      >
        <View className="flex-row items-center justify-center gap-1.5">
          <FontAwesome name="tags" size={16} color="#041031" />
          <Text>Tags</Text>
        </View>
      </Pressable>

      <Pressable
        className={`py-2 px-3 rounded-full 
            ${showFavorites ? "bg-slate-100" : "border border-slate-100"}`}
        onPress={onFavoritePress}
      >
        <View className="flex-row items-center justify-center gap-1.5">
          <FontAwesome name="star-o" size={16} color="#041031" />
          <Text>Favorites</Text>
        </View>
      </Pressable>
    </View>
  );
}
