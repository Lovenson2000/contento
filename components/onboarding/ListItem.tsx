import { View, useWindowDimensions, Text, ImageURISource } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  item: { title: string; description: string; image: ImageURISource };
  index: number;
  x: SharedValue<number>;
};

const AnimatedImage = Animated.createAnimatedComponent(Animated.Image);
const AnimatedText = Animated.createAnimatedComponent(Text);

const ListItem = ({ item, index, x }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const rnImageStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    return { opacity, transform: [{ translateY }] };
  });

  const rnTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [40, 0, 40],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    return { opacity, transform: [{ translateY }] };
  });

  return (
    <View
      style={{ width: SCREEN_WIDTH }}
      className="flex-1 items-center justify-center px-6"
    >
      <AnimatedImage
        source={item.image}
        resizeMode="contain"
        style={[
          { width: SCREEN_WIDTH * 0.7, height: SCREEN_WIDTH * 0.7 },
          rnImageStyle,
        ]}
      />
      <AnimatedText
        style={rnTextStyle}
        className="text-3xl font-bold text-center mt-4 text-slate-900"
      >
        {item.title}
      </AnimatedText>
      <AnimatedText
        style={rnTextStyle}
        className="text-base text-center text-slate-600 mt-3 leading-relaxed max-w-[80%]"
      >
        {item.description}
      </AnimatedText>
    </View>
  );
};

export default React.memo(ListItem);
