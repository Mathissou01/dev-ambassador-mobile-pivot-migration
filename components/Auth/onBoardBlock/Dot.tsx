import React from "react";
import { Dimensions } from "react-native";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";

const { height } = Dimensions.get("window");
export const SLIDE_HEIGHT = 0.61 * height;
interface DotProps {
  index: number;
  currentIndex: Animated.SharedValue<number>;
}

const Dot = ({ index, currentIndex }: DotProps): React.JSX.Element => {
  const style = useAnimatedStyle(() => {
    const opacity = interpolate(
      currentIndex.value,
      [index - 1, index, index + 1],
      [0.5, 1, 0.5],
      "clamp"
    );
    const scale = interpolate(
      currentIndex.value,
      [index - 1, index, index + 1],
      [1, 1.25, 1],
      "clamp"
    );

    return {
      opacity,
      backgroundColor: "#2CB9B0",
      width: 8,
      height: 8,
      borderRadius: 4,
      margin: 4,
      transform: [{ scale }],
    };
  });

  return <Animated.View style={style} />;
};

export default Dot;
