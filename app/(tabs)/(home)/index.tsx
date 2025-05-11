import {
  Text,
  View,
  FlatList,
  Pressable,
  SafeAreaView,
  Image,
  TextInput,
  Modal,
  ScrollView,
  Keyboard,
  KeyboardEvent,
  Animated,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { contents } from "@/lib/constants/contents";
import { useEffect, useRef, useState } from "react";
import SingleContentItem from "@/components/SingleContentItem";
import ContentsFilters from "@/components/ContentFilters";
import { socialMediaIcons } from "@/lib/constants/social-icons";
import TagsFilter from "@/components/TagsFilter";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Index() {
  const [sourceModalVisible, setSourceModalVisible] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [filteredContents, setFilteredContents] = useState(contents);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddContentModalVisible, setAddContentModalVisible] = useState(false);

  const allTags = Array.from(
    new Set(contents.flatMap((item) => item.tags ?? []))
  );

  const handleSourceSelect = (source: string) => {
    setSelectedSource(source);
    setSourceModalVisible(false);
  };

  const handleAddContentModalClose = () => {
    setAddContentModalVisible(false);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedSource(null);
    setSelectedTags([]);
    setShowFavorites(false);
  };

  useEffect(() => {
    let result = contents;

    if (selectedSource) {
      result = result.filter((item) => item.source === selectedSource);
    }

    if (selectedTags.length > 0) {
      result = result.filter((item) =>
        item.tags?.some((tag) => selectedTags.includes(tag))
      );
    }

    if (showFavorites) {
      result = result.filter((item) => item.isFavorite);
    }

    if (searchQuery.trim()) {
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags?.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    setFilteredContents(result);
  }, [selectedSource, selectedTags, showFavorites, searchQuery]);

  return (
    <View className="bg-white flex-1 p-4">
      <View className="flex-row items-center justify-between mt-2 mb-6">
        <Text className="text-4xl font-semibold text-slate-800">My Saves</Text>
        <Pressable onPress={() => setAddContentModalVisible(true)}>
          <Entypo name="plus" size={40} color="#051542" />
        </Pressable>
      </View>
      <AddNewContentModal
        isVisible={isAddContentModalVisible}
        onClose={handleAddContentModalClose}
      />
      <View className="flex-row items-center border rounded-lg bg-gray-50 border-slate-100 px-2 py-0.5 mb-4">
        <Ionicons name="search" size={20} color="#64748b" className="mr-2" />
        <TextInput
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="flex-1 py-2 placeholder:text-slate-500"
        />
      </View>

      <ContentsFilters
        onSourcePress={() => setSourceModalVisible(true)}
        onClearFilter={clearFilters}
        onTagsPress={() => setShowTags((prev) => !prev)}
        selectedSource={selectedSource}
        selectedTags={selectedTags}
        showFavorites={showFavorites}
        onFavoritePress={() => setShowFavorites((prev) => !prev)}
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

type AddNewContentModalProps = {
  isVisible: boolean;
  onClose: () => void;
};
export function AddNewContentModal({
  isVisible,
  onClose,
}: AddNewContentModalProps) {
  const [contentUrl, setContentUrl] = useState("");
  const [tags, setTags] = useState("");
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [reminderDate, setReminderDate] = useState<Date | null>(null);
  const modalHeight = useRef(new Animated.Value(0.5)).current;

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDateTimePicker(false);
    if (selectedDate) {
      setReminderDate(selectedDate);
    }
  };

  useEffect(() => {
    const keyboardShow = Keyboard.addListener(
      "keyboardDidShow",
      _keyboardDidShow
    );
    const keyboardHide = Keyboard.addListener(
      "keyboardDidHide",
      _keyboardDidHide
    );

    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, []);

  const _keyboardDidShow = (e: KeyboardEvent) => {
    Animated.timing(modalHeight, {
      toValue: 0.85,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const _keyboardDidHide = () => {
    Animated.timing(modalHeight, {
      toValue: 0.5,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View className="flex-1 bg-black/50 justify-end">
          <Animated.View
            style={{
              height: modalHeight.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            }}
            className="w-full bg-white p-4 rounded-t-2xl"
          >
            <View className="w-full h-1/2 bg-white p-4 rounded-t-2xl">
              <View className="rounded-t-xl text-center relative">
                <Pressable onPress={onClose} className="absolute top-0 right-0">
                  <MaterialCommunityIcons
                    name="close"
                    color="#051542"
                    size={24}
                  />
                </Pressable>
                <Text className="text-center text-2xl my-8">
                  Add New Content
                </Text>
              </View>
              <View className="mt-6">
                <Text className="text-[##051542] text-xl font-medium mb-1">
                  URL
                </Text>
                <TextInput
                  onChangeText={setContentUrl}
                  value={contentUrl}
                  placeholder="e.g https://www.contento.dev/"
                  placeholderTextColor="#535c73"
                  className="border border-slate-200 bg-white rounded-lg p-4 text-slate-900"
                />
              </View>

              <View className="mt-4">
                <Text className="text-[##051542] text-xl font-medium mb-1">
                  Tags (optional)
                </Text>
                <TextInput
                  onChangeText={setTags}
                  value={tags}
                  placeholder="e.g education, news, science"
                  placeholderTextColor="#535c73"
                  className="border border-slate-200 bg-white rounded-lg p-4 text-slate-900"
                />
              </View>

              {/* Reminder */}
              <View className="mt-4">
                <Pressable
                  onPress={() => setShowDateTimePicker(true)}
                  className="py-2"
                >
                  <Text className="text-[#364aca] font-medium">
                    {reminderDate
                      ? `Reminder: ${reminderDate.toLocaleString()}`
                      : "Add Reminder"}
                  </Text>
                </Pressable>
                {showDateTimePicker && (
                  <DateTimePicker
                    value={reminderDate || new Date()}
                    mode="datetime"
                    display="default"
                    onChange={onChangeDate}
                  />
                )}
              </View>
              <View className="flex-row gap-x-4 mt-6">
                <Pressable
                  onPress={onClose}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 items-center"
                >
                  <Text className="text-gray-700 font-medium">Cancel</Text>
                </Pressable>
                <Pressable className="flex-1 px-4 py-3 bg-[#364aca] rounded-lg items-center">
                  <Text className="text-white font-medium">Save Content</Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}
