import { Pressable, Text, View, ScrollView } from "react-native";

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
    <View className="mb-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          height: 40,
          rowGap: 8,
        }}
      >
        <View className="flex-row flex-wrap gap-2">
          {allTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);

            return (
              <Pressable
                key={tag}
                onPress={() => onToggleTag(tag)}
                className={`px-3 py-1 rounded-full border ${
                  isSelected
                    ? "bg-slate-700 border-slate-900"
                    : "dark:bg-transparent bg-white border-slate-200"
                }`}
              >
                <Text
                  className={
                    isSelected ? "text-white" : "dark:text-white text-slate-800"
                  }
                >
                  {tag}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
