import { Pressable, Text, View } from "react-native";

export default function TagsFilter({
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
