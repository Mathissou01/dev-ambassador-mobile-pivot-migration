import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Easing } from "react-native-reanimated";

const LoadingDot = (): React.JSX.Element => {
  const firstDot = useRef(new Animated.Value(0)).current;
  const secondDot = useRef(new Animated.Value(0)).current;
  const thirdDot = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    [firstDot, secondDot, thirdDot].forEach((dot, index) => {
      setTimeout(() => {
        Animated.loop(
          Animated.timing(dot, {
            toValue: 2,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          })
        ).start();
      }, index * 200);
    });
  }, [firstDot, secondDot, thirdDot]);

  const firstDotInterpolate = firstDot.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 0, 1],
  });
  const secondDotInterpolate = secondDot.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 0, 1],
  });
  const thirdDotInterpolate = thirdDot.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 0, 1],
  });

  return (
    <View
      style={{
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Animated.View style={[styles.dot, { opacity: firstDotInterpolate }]} />
        <Animated.View style={[styles.dot, { opacity: secondDotInterpolate }]} />
        <Animated.View style={[styles.dot, { opacity: thirdDotInterpolate }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 4,
    width: 4,
    borderRadius: 10,
    marginLeft: 2,
    backgroundColor: "white",
  },
});

export default LoadingDot;
