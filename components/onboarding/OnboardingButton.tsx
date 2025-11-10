import { Pressable, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  SharedValue,
  runOnJS,
  useAnimatedReaction,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useOnboarding } from "@/context/OnboardingContext";

type Props = {
  currentIndex: SharedValue<number>;
  length: number;
  flatListRef: any;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedText = Animated.createAnimatedComponent(Text);
const OnboardingButton = ({ currentIndex, length, flatListRef }: Props) => {
  const [isLast, setIsLast] = useState(false);

  useAnimatedReaction(
    () => currentIndex.value,
    (value) => {
      runOnJS(setIsLast)(value === length - 1);
    },
    [length]
  );

  const rnBtnStyle = useAnimatedStyle(() => {
    return {
      width: isLast ? withSpring(180) : withSpring(60),
      height: 60,
    };
  });

  const rnTextStyle = useAnimatedStyle(() => {
    return {
      opacity: isLast ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX: isLast ? withTiming(0) : withTiming(10),
        },
      ],
    };
  });

  const { completeOnboarding } = useOnboarding();

  const onPress = useCallback(async () => {
    if (isLast) {
      await completeOnboarding();
      router.push("/signup");
    } else {
      flatListRef?.current?.scrollToIndex({
        index: currentIndex.value + 1,
      });
    }
  }, [isLast, completeOnboarding, flatListRef, currentIndex]);

  return (
    <AnimatedPressable
      onPress={onPress}
      style={rnBtnStyle}
      className="flex-row items-center justify-center rounded-full bg-indigo-600 overflow-hidden"
    >
      <View className="flex-row items-center justify-center">
        {isLast ? (
          <Animated.View
            style={rnTextStyle}
            className="flex-row items-center justify-center gap-2"
          >
            <AnimatedText className="text-white font-semibold text-base">
              Get Started
            </AnimatedText>
            <AntDesign name="arrowright" size={22} color="white" />
          </Animated.View>
        ) : (
          <AntDesign name="arrowright" size={22} color="white" />
        )}
      </View>
    </AnimatedPressable>
  );
};

export default OnboardingButton;
