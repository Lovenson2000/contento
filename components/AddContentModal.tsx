import {
  Text,
  View,
  Pressable,
  Modal,
  Keyboard,
  KeyboardEvent,
  Animated,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuth } from "@/context/AuthContext";
import { getContentSource } from "@/lib/utils/content";
import CrossPlatformDateTimePicker from "./DateTimePicker";
import { useContent } from "@/lib/api/hooks/useContent";
import { useTheme } from "@/lib/context/ThemeContext";

type AddNewContentModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onContentAdded: () => void;
  initialData?: {
    id?: string;
    title?: string;
    url?: string;
    tags?: string[];
    remindAt?: Date | null;
  };
};

export default function AddNewContentModal({
  isVisible,
  onClose,
  onContentAdded,
  initialData,
}: AddNewContentModalProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [url, setUrl] = useState(initialData?.url ?? "");
  const [tags, setTags] = useState("");
  const [existingTags, setExistingTags] = useState<string[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const [reminderDate, setReminderDate] = useState<Date | null>(
    initialData?.remindAt ?? null
  );
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const modalHeight = useRef(new Animated.Value(0.7)).current;

  const user = useAuth()?.user;
  const { createContentMutation, updateContentMutation, getUserContents } =
    useContent();

  const { data: userContents = [] } = getUserContents(user?.id ?? "");

  const availableTags = useMemo(() => {
    const tagsFromContents = userContents.flatMap(
      (content) => content.tags ?? []
    );
    return Array.from(new Set(tagsFromContents)).filter(
      (tag): tag is string => !!tag
    );
  }, [userContents]);

  const suggestedTags = useMemo(
    () => availableTags.filter((tag) => !existingTags.includes(tag)),
    [availableTags, existingTags]
  );

  const isEditMode = !!initialData?.id;

  const theme = useTheme();
  const isDarkTheme = theme === "dark";

  const _keyboardDidShow = useCallback(
    (e: KeyboardEvent) => {
      Animated.timing(modalHeight, {
        toValue: 0.85,
        duration: 250,
        useNativeDriver: false,
      }).start();
    },
    [modalHeight]
  );

  const _keyboardDidHide = useCallback(() => {
    Animated.timing(modalHeight, {
      toValue: 0.7,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [modalHeight]);

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
  }, [_keyboardDidShow, _keyboardDidHide]);

  const handleRemoveTag = (tagToRemove: string) => {
    setExistingTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleAddSuggestedTag = (tagToAdd: string) => {
    setExistingTags((prev) =>
      prev.includes(tagToAdd) ? prev : [...prev, tagToAdd]
    );
    setShowTagSuggestions(false);
  };

  const handleDismissTagSuggestions = () => {
    setShowTagSuggestions(false);
  };

  const handleSaveContent = async () => {
    if (!url.trim()) return;

    try {
      const newTagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const allTags = Array.from(new Set([...existingTags, ...newTagsArray]));

      const source = getContentSource(url.trim());

      if (isEditMode && initialData?.id) {
        await updateContentMutation.mutateAsync({
          id: initialData.id,
          content: {
            url: url.trim(),
            tags: allTags,
            remindAt: reminderDate ?? undefined,
            title: title.trim(),
            source: source,
          },
        });
      } else {
        await createContentMutation.mutateAsync({
          content: {
            url: url.trim(),
            tags: allTags,
            remindAt: reminderDate ?? undefined,
            title: title.trim(),
            userId: user?.id,
            source: source,
          },
        });
      }

      setUrl("");
      setTags("");
      setTitle("");
      setExistingTags([]);
      setReminderDate(null);

      onContentAdded();
      onClose();
    } catch (err) {
      console.error("Failed to save content:", err);
    }
  };

  useEffect(() => {
    if (!isVisible) {
      setShowTagSuggestions(false);
      return;
    }

    if (initialData) {
      setTitle(initialData.title ?? "");
      setUrl(initialData.url ?? "");
      setExistingTags(initialData.tags ?? []);
      setTags("");
      setReminderDate(initialData.remindAt ?? null);
    } else {
      setExistingTags([]);
    }
  }, [initialData, isVisible]);

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <TouchableWithoutFeedback onPress={handleDismissTagSuggestions}>
          <View className="flex-1 bg-black/50 justify-end">
            <Animated.View
              style={{
                height: modalHeight.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              }}
              className="w-full dark:bg-slate-800 bg-white p-4 rounded-t-2xl"
            >
              <ScrollView
                className="flex-1"
                keyboardShouldPersistTaps="handled"
              >
                <View className="w-full dark:bg-slate-800 bg-white p-4 rounded-t-2xl">
                  <View className="rounded-t-xl text-center relative">
                    <Pressable
                      onPress={onClose}
                      className="absolute top-0 right-0 z-10"
                    >
                      <MaterialCommunityIcons
                        name="close"
                        color={`${isDarkTheme ? "white" : "#051542 "}`}
                        size={24}
                      />
                    </Pressable>
                    <Text className="text-center dark:text-slate-50 text-2xl my-8">
                      {isEditMode ? "Edit Content" : "Add New Content"}
                    </Text>
                  </View>
                  <View className="mt-6">
                    <Text className="dark:text-slate-50 text-[##051542] text-xl font-medium mb-1">
                      URL
                    </Text>
                    <TextInput
                      onChangeText={setUrl}
                      value={url}
                      placeholder="e.g https://www.contento.dev/"
                      placeholderTextColor="#535c73"
                      className="border border-slate-200 dark:bg-slate-900 dark:border-slate-700 bg-white rounded-lg p-4 dark:text-slate-100 text-slate-900"
                    />
                  </View>

                  <View className="mt-4">
                    <Text className="dark:text-slate-50 text-[#051542] text-xl font-medium mb-1">
                      Title (optional)
                    </Text>
                    <TextInput
                      onChangeText={setTitle}
                      value={title}
                      placeholder="e.g How I learned English"
                      placeholderTextColor="#535c73"
                      className="border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-700 rounded-lg p-4 dark:text-slate-100 text-slate-900"
                    />
                  </View>

                  <View className="mt-4">
                    <Text className="dark:text-slate-50 text-[##051542] text-xl font-medium mb-1">
                      Tags (optional)
                    </Text>
                    <TextInput
                      onChangeText={(value) => {
                        setTags(value);
                        if (value.length > 0) {
                          setShowTagSuggestions(false);
                        }
                      }}
                      value={tags}
                      placeholder="e.g education, news, science"
                      placeholderTextColor="#535c73"
                      onFocus={() => {
                        if (availableTags.length > 0) {
                          setShowTagSuggestions(true);
                        }
                      }}
                      onPressIn={() => {
                        if (availableTags.length > 0) {
                          setShowTagSuggestions(true);
                        }
                      }}
                      className="border border-slate-200 dark:bg-slate-900 dark:border-slate-700 bg-white rounded-lg p-4 dark:text-slate-100 text-slate-900"
                    />

                    {availableTags.length > 0 && (
                      <View className="mt-3">
                        {showTagSuggestions && (
                          <View className="max-h-40 border dark:border-slate-700 border-slate-200 rounded-lg overflow-hidden">
                            <ScrollView className="max-h-40 bg-white dark:bg-slate-900">
                              {suggestedTags.length > 0 ? (
                                suggestedTags.map((tag) => (
                                  <Pressable
                                    key={tag}
                                    className="px-3 py-2 border-b last:border-b-0 dark:border-slate-800 border-slate-100"
                                    onPress={() => handleAddSuggestedTag(tag)}
                                  >
                                    <Text className="dark:text-slate-50 text-slate-900">
                                      {tag}
                                    </Text>
                                  </Pressable>
                                ))
                              ) : (
                                <View className="px-3 py-2">
                                  <Text className="text-sm text-gray-500 dark:text-slate-300">
                                    All tags are already added.
                                  </Text>
                                </View>
                              )}
                            </ScrollView>
                          </View>
                        )}
                      </View>
                    )}

                    {/* Existing Tags Display */}
                    {existingTags.length > 0 && (
                      <View className="mt-3">
                        <Text className="text-sm dark:text-slate-50 text-gray-600 mb-2">
                          Current Tags:
                        </Text>
                        <View className="flex-row flex-wrap gap-2">
                          {existingTags.map((tag, index) => (
                            <View
                              key={index}
                              className="flex-row items-center bg-blue-100 px-3 py-2 rounded-full"
                            >
                              <Text className="text-blue-700 mr-2">{tag}</Text>
                              <Pressable onPress={() => handleRemoveTag(tag)}>
                                <MaterialCommunityIcons
                                  name="close-circle"
                                  size={16}
                                  color="#1d4ed8"
                                />
                              </Pressable>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                  </View>

                  {/* Reminder */}
                  <View className="mt-6">
                    <Pressable onPress={() => setShowPicker(true)}>
                      <Text className="dark:text-slate-50 text-[#364aca] font-medium">
                        {reminderDate
                          ? `Reminder: ${reminderDate.toLocaleString()}`
                          : "Add Reminder"}
                      </Text>
                    </Pressable>
                    <CrossPlatformDateTimePicker
                      value={reminderDate || new Date()}
                      visible={showPicker}
                      onChange={(date) => setReminderDate(date)}
                      onDismiss={() => setShowPicker(false)}
                    />
                  </View>

                  <View className="flex-row gap-x-4 mt-6 mb-4">
                    <Pressable
                      onPress={onClose}
                      className="flex-1 px-4 py-3 border dark:bg-slate-700 dark:border-transparent border-gray-300 rounded-lg bg-gray-100 items-center"
                    >
                      <Text className="text-gray-700 dark:text-slate-50 font-medium">
                        Cancel
                      </Text>
                    </Pressable>
                    <Pressable
                      className="flex-1 px-4 py-3 bg-[#364aca] rounded-lg items-center"
                      onPress={handleSaveContent}
                      disabled={
                        createContentMutation.isPending ||
                        updateContentMutation?.isPending ||
                        !url.trim()
                      }
                    >
                      <Text className="text-white font-medium">
                        {createContentMutation.isPending ||
                        updateContentMutation?.isPending
                          ? "Saving..."
                          : isEditMode
                          ? "Update Content"
                          : "Save Content"}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </ScrollView>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
