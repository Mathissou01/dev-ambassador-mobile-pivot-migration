import { useState, useEffect, Children } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

export function useAnimation(totalDuration) {
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const handleAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      totalDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 0,
        totalDuration,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => handleAnimation());
    });
  };

  useEffect(() => {
    handleAnimation();
  }, []);

  return animation;
}

const styles = StyleSheet.create({});
