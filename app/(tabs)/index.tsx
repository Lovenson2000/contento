import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  Image,
  ImageSourcePropType,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import { contents } from "@/lib/constants/contents";
import { Content } from "@/lib/types";
import { formatRemindTime } from "@/lib/utils/time";
import { useEffect, useState } from "react";

const socialMediaIcons: Record<string, ImageSourcePropType> = {
  YouTube: require("@/assets/images/youtube.png"),
  Tiktok: require("@/assets/images/tiktok.png"),
  Instagram: require("@/assets/images/instagram.png"),
  Twitter: require("@/assets/images/twitter.png"),
  Facebook: require("@/assets/images/facebook.png"),
  Reddit: require("@/assets/images/reddit.png"),
  LinkedIn: require("@/assets/images/linkedin.png"),
  Medium: require("@/assets/images/medium.png"),
  Quora: require("@/assets/images/quora.png"),
};

export default function Index() {
  const [sourceModalVisible, setSourceModalVisible] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [filteredContents, setFilteredContents] = useState(contents);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = Array.from(
    new Set(contents.flatMap((item) => item.tags ?? []))
  );

  const handleSourceSelect = (source: string) => {
    setSelectedSource(source);
    setSourceModalVisible(false);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedSource(null);
    setSelectedTags([]);
  };

  useEffect(() => {
    let result = contents;

    if (selectedSource) {
      result = result.filter((item) => item.source === selectedSource);
    }

    if (selectedTags.length > 0) {
      result = result.filter((item) =>
        selectedTags.every((tag) => item.tags?.includes(tag))
      );
    }

    setFilteredContents(result);
  }, [selectedSource, selectedTags]);

  return (
    <View className="bg-white flex-1 p-4">
      <TextInput
        onChangeText={() => console.log("Input changed")}
        value="text"
        className="border p-2 rounded-md bg-gray-50 border-slate-100 mb-4"
      />
      <ContentsFilters
        onSourcePress={() => setSourceModalVisible(true)}
        onClearFilter={() => {
          setFilteredContents(contents);
          setSelectedSource(null);
        }}
        onTagsPress={() => setShowTags((prev) => !prev)}
        selectedSource={selectedSource}
      />
      {showTags && (
        <TagsFilter
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
          allTags={allTags}
        />
      )}

      <SafeAreaView className="flex-1 w-full">
        <FlatList
          data={filteredContents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SingleContentItem content={item} />}
          className="flex-1 w-full"
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        <Modal
          visible={sourceModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setSourceModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-xl w-4/5 p-4">
              <Text className="text-xl mb-4">Select a Source</Text>
              <ScrollView>
                {Object.keys(socialMediaIcons).map((source) => (
                  <Pressable
                    key={source}
                    className="p-2 border-b border-slate-100 flex-row items-center gap-2"
                    onPress={() => handleSourceSelect(source)}
                  >
                    <Image
                      source={socialMediaIcons[source]}
                      style={{ width: 20, height: 20 }}
                    />
                    <Text>{source}</Text>
                  </Pressable>
                ))}
              </ScrollView>
              <Pressable
                className="mt-4 self-end"
                onPress={() => setSourceModalVisible(false)}
              >
                <Text className="text-slate-900 bg-slate-100 px-2 py-1 rounded-lg">
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

function SingleContentItem({ content }: { content: Content }) {
  const iconSource = socialMediaIcons[content.source];

  return (
    <TouchableOpacity className="flex-row items-center border border-slate-100 p-4 rounded-md mb-6 w-full">
      <Pressable
        className="absolute right-4 top-4"
        onPress={() => alert("Menu clicked")}
      >
        <MaterialCommunityIcons
          name="dots-vertical"
          size={20}
          color="#0f172a"
        />
      </Pressable>
      <View className="flex flex-row items-center justify-center mb-6">
        {iconSource && (
          <Image
            source={iconSource}
            style={{ width: 32, height: 32, marginRight: 10 }}
          />
        )}
        <View className="flex flex-col">
          <Text className="text-2xl">{content.title}</Text>
          <Text className="text-sm text-gray-500">{content.source}</Text>
        </View>
      </View>
      <View className="absolute right-4 bottom-4">
        {content.remindAt ? (
          <View className="flex-row items-center text-xs flex-1 gap-2 border rounded-md border-slate-100 px-2 py-1 text-gray-400">
            <Ionicons name="notifications-outline" size={16} color="#334155" />
            <Text className="text-sm text-slate-700">
              {formatRemindTime(new Date(content.remindAt))}
            </Text>
          </View>
        ) : (
          <Pressable onPress={() => alert("Add Reminder clicked")}>
            <Text className="text-sm text-slate-900 bg-gray-100 px-2 py-1 rounded-lg">
              Add Reminder
            </Text>
          </Pressable>
        )}
      </View>
    </TouchableOpacity>
  );
}

function ContentsFilters({
  onSourcePress,
  onClearFilter,
  onTagsPress,
  selectedSource,
}: {
  onSourcePress: () => void;
  onClearFilter: () => void;
  onTagsPress: () => void;
  selectedSource: string | null;
}) {
  const iconSource =
    selectedSource && socialMediaIcons[selectedSource]
      ? socialMediaIcons[selectedSource]
      : null;

  return (
    <View className="flex-row items-center justify-between mb-4">
      <Pressable
        className="py-2 px-4 rounded-full active:bg-slate-100 border border-slate-100"
        onPress={onClearFilter}
      >
        <Text>All</Text>
      </Pressable>

      <Pressable
        className="p-2 rounded-full active:bg-slate-100 border border-slate-100"
        onPress={onSourcePress}
      >
        <View className="flex-row items-center justify-center gap-1.5">
          {iconSource ? (
            <>
              <Image source={iconSource} style={{ width: 20, height: 20 }} />
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
        className="p-2 rounded-full active:bg-slate-100 border border-slate-100"
        onPress={onTagsPress}
      >
        <View className="flex-row items-center justify-center gap-1.5">
          <FontAwesome name="tags" size={20} color="black" />
          <Text>Tags</Text>
        </View>
      </Pressable>

      <Pressable
        className="p-2 rounded-full active:bg-slate-100 border-slate-100"
        // onPress={onFavoritePress}
      >
        <View className="flex-row items-center justify-center gap-1.5">
          <FontAwesome name="star-o" size={20} color="black" />
          <Text>Favorites</Text>
        </View>
      </Pressable>
    </View>
  );
}

function TagsFilter({
  selectedTags,
  onToggleTag,
  allTags,
}: {
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  allTags: string[];
}) {
  return (
    <View className="flex-row flex-wrap gap-2 mb-4">
      {allTags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <Pressable
            key={tag}
            onPress={() => onToggleTag(tag)}
            className={`px-3 py-1 rounded-full border ${
              isSelected
                ? "bg-dark-blue border-slate-900"
                : "bg-white border-slate-200"
            }`}
          >
            <Text className={isSelected ? "text-white" : "text-slate-800"}>
              {tag}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
