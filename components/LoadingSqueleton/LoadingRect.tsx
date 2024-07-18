import React, { useEffect, useRef } from "react";
import { Animated, Easing, type StyleProp, type ViewStyle } from "react-native";

export const LoadingRect = (props: {
  width?: number | "auto" | `${number}%` | null;
  height?: number | "auto" | `${number}%` | null;
  style?: StyleProp<ViewStyle>;
  index?: number;
}): React.JSX.Element => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeOut = setTimeout(
      () => {
        const sharedAnimationConfig = {
          duration: 1000,
          useNativeDriver: true,
        };
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              ...sharedAnimationConfig,
              toValue: 1,
              easing: Easing.out(Easing.ease),
            }),
            Animated.timing(pulseAnim, {
              ...sharedAnimationConfig,
              toValue: 0,
              easing: Easing.in(Easing.ease),
            }),
          ])
        ).start();
      },
      (props.index ?? 0) * 200
    );

    return () => {
      // cleanup
      clearTimeout(timeOut);
      pulseAnim.stopAnimation();
    };
  }, []);

  const opacityAnim = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.05, 0.15],
  });

  return (
    <Animated.View
      style={[
        // styles.LoadingRect,
        { width: props.width, height: props.height, backgroundColor: "gray", marginRight: 20 },
        { opacity: opacityAnim },
        props.style,
      ]}
    />
  );
};
