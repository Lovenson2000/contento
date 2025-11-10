import { View, useWindowDimensions } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";

type Props = {
  length: number;
  x: SharedValue<number>;
};

type DotProps = {
  index: number;
  x: SharedValue<number>;
  SCREEN_WIDTH: number;
};

const PaginationDot = ({ index, x, SCREEN_WIDTH }: DotProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const width = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [35, 16, 35],
      Extrapolation.CLAMP
    );

    const backgroundColor = interpolateColor(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      ["#D0D0D0", "#304FFE", "#D0D0D0"]
    );

    return { width, backgroundColor };
  });

  return (
    <Animated.View
      style={animatedStyle}
      className="h-[10px] rounded-full mx-[5px]"
    />
  );
};

const PaginationElement = ({ length, x }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  return (
    <View className="flex-row items-center justify-center">
      {Array.from({ length }).map((_, index) => (
        <PaginationDot
          key={index}
          index={index}
          x={x}
          SCREEN_WIDTH={SCREEN_WIDTH}
        />
      ))}
    </View>
  );
};

export default PaginationElement;
