import { IosLogoImage } from "@/lib/constants/icons";
import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

export default function LoadingScreen() {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleValue, {
            toValue: 1.15,
            duration: 3500,
            useNativeDriver: true,
          }),
          Animated.timing(opacityValue, {
            toValue: 0.6,
            duration: 3500,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true,
          }),
          Animated.timing(opacityValue, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, [opacityValue, scaleValue]);

  return (
    <View className="flex-1 justify-center dark:bg-zinc-950 items-center bg-white">
      <Animated.Image
        source={IosLogoImage}
        className="w-40 h-32"
        style={{
          transform: [{ scale: scaleValue }],
          opacity: opacityValue,
        }}
        resizeMode="contain"
      />
    </View>
  );
}
