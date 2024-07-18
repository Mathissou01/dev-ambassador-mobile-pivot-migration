import React from "react";
import { View } from "react-native";
import { Text } from "@/components/Themed";
import Button from "./Button";
import styles from "./AccessoriesBlock";
import { colors } from "@/config/styles/01-settings/_colors";

interface SubSlideProps {
  subtitle: string;
  description: string;
  last?: boolean;
  onPress: () => void;
}

const Subslide = ({ subtitle, description, last, onPress }: SubSlideProps): React.JSX.Element => {
  return (
    <View style={styles.containerSubslide}>
      <Text bold style={styles.subtitle} darkColor={colors.textDark} lightColor={"#0C0D34"}>
        {subtitle}
      </Text>
      <Text style={styles.description} darkColor={colors.textDark} lightColor={"#0C0D34"}>
        {description}
      </Text>
      <Button
        label={last ?? false ? "C'est parti !" : "Suivant"}
        variant={last ?? false ? "primary" : "default"}
        {...{ onPress }}
      />
    </View>
  );
};

export default Subslide;
