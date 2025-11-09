import { useCallback } from "react";
import { ImageURISource, SafeAreaView, View, ViewToken } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import ListItem from "../../components/onboarding/ListItem";
import PaginationElement from "../../components/onboarding/PaginationElement";
import OnboardingButton from "../../components/onboarding/OnboardingButton";
import { onboardingContents } from "@/lib/constants/onboarding";

export default function Onboarding() {
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const flatListRef = useAnimatedRef<
    Animated.FlatList<{
      title: string;
      description: string;
      image: ImageURISource;
    }>
  >();

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      flatListIndex.value = viewableItems[0]?.index ?? 0;
    },
    [flatListIndex]
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const renderItem = useCallback(
    ({
      item,
      index,
    }: {
      item: { title: string; description: string; image: ImageURISource };
      index: number;
    }) => <ListItem item={item} index={index} x={x} />,
    [x]
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Animated.FlatList
        ref={flatListRef}
        onScroll={scrollHandler}
        horizontal
        scrollEventThrottle={16}
        pagingEnabled
        data={onboardingContents}
        keyExtractor={(_, index) => index.toString()}
        bounces={false}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
      />

      <View className="flex-row items-center justify-between p-6">
        <PaginationElement length={onboardingContents.length} x={x} />
        <OnboardingButton
          currentIndex={flatListIndex}
          length={onboardingContents.length}
          flatListRef={flatListRef}
        />
      </View>
    </SafeAreaView>
  );
}
