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
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { contents } from "@/lib/constants/contents";
import { useEffect, useState } from "react";
import SingleContentItem from "@/components/SingleContentItem";
import ContentsFilters from "@/components/ContentFilters";
import { socialMediaIcons } from "@/lib/constants/social-icons";
import TagsFilter from "@/components/TagsFilter";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import AddNewContentModal from "@/components/AddContentModal";
import EmptySavesScreen from "@/components/screens/EmptySavesScreen";

export default function Index() {
  const [sourceModalVisible, setSourceModalVisible] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [filteredContents, setFilteredContents] = useState(contents);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddContentModalVisible, setAddContentModalVisible] = useState(false);

  const signout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      console.log("Signed out successfully");
    }
  };

  const user = useAuth()?.user;

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
          item?.source?.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        {user && (
          <Pressable onPress={signout}>
            <MaterialCommunityIcons name="logout" size={24} color="black" />
          </Pressable>
        )}
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
        {!user && <EmptySavesScreen />}
        <FlatList
          data={user ? filteredContents : []}
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
