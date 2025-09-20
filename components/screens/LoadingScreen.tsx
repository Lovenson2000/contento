import { LogoImage } from "@/lib/constants/icons";
import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";

const LoadingScreen = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleValue, {
            toValue: 1.15,
            duration: 2500,
            useNativeDriver: true,
          }),
          Animated.timing(opacityValue, {
            toValue: 0.6,
            duration: 2500,
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
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={LogoImage}
        style={[
          styles.logo,
          {
            transform: [{ scale: scaleValue }],
            opacity: opacityValue,
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 160,
    height: 160,
  },
});
