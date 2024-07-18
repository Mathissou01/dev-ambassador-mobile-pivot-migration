import React from "react";
import { View, Dimensions } from "react-native";
import styles from "./AccessoriesBlock";
import { Text } from "@/components/Themed";

const { width, height } = Dimensions.get("window");

export const SLIDE_HEIGHT = height > 670 ? 0.61 * height : 0.5 * height;

interface SlideProps {
  title: string;
  right?: boolean;
}

const Slide = ({ title, right }: SlideProps): React.JSX.Element => {
  const transform = [
    {
      translateY:
        height > 670
          ? (SLIDE_HEIGHT - 100) / 2
          : right === true
          ? SLIDE_HEIGHT / 6
          : SLIDE_HEIGHT / 2,
    },
    { translateX: right === true ? width / 2 - 50 : -width / 2 + 50 },
    { rotate: right === true ? "-90deg" : "90deg" },
  ];
  return (
    <View style={styles.containerSlide}>
      <View style={[styles.titleContainer, { transform }]}>
        <Text bold style={styles.title}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Slide;
