import React, { useState, useEffect, useRef, useContext } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { ThemeContext } from "../../hooks/useColorScheme";

export default function WaveForm(): React.JSX.Element {
  const themeColor = useContext(ThemeContext);
  const [heights, setHeights] = useState([15, 20, 5]);
  const animatedHeights = useRef(heights.map((height) => new Animated.Value(height)));

  const randomHeight = (): number => {
    return Math.floor(Math.random() * 16) + 5;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeights = [randomHeight(), randomHeight(), randomHeight()];
      setHeights(newHeights);
    }, 350);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    heights.forEach((newHeight, index) => {
      Animated.timing(animatedHeights.current[index], {
        toValue: newHeight,
        duration: 350,
        useNativeDriver: false,
      }).start();
    });
  }, [heights]);

  return (
    <View style={styles.container}>
      {heights.map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bar,
            {
              height: animatedHeights.current[index],
              borderColor: themeColor?.isDark ?? false ? "white" : "black",
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 20,
    backgroundColor: "transparent",
    width: 24,
  },
  bar: {
    width: 8,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
});
