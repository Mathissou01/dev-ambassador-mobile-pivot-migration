import React, { type ReactNode, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { type RectButtonProperties } from "react-native-gesture-handler";
import { Text } from "@/components/Themed";
import { ThemeContext } from "@/hooks/useColorScheme";
import styles from "./AccessoriesBlock";

interface ButtonProps {
  label?: string;
  variant: "default" | "primary" | "transparent";
  onPress: () => void;
  children?: ReactNode;
  style?: RectButtonProperties["style"];
}

const Button = ({ label, variant, onPress, children, style }: ButtonProps): React.JSX.Element => {
  const colorTheme = useContext(ThemeContext);

  const backgroundColor =
    variant === "primary"
      ? colorTheme?.isDark ?? false
        ? "#1f807c"
        : "#2CB9B0"
      : variant === "transparent"
      ? "transparent"
      : colorTheme?.isDark ?? false
      ? "#212491"
      : "#0C0D34";

  return (
    <TouchableOpacity style={[styles.containerBtn, style, { backgroundColor }]} {...{ onPress }}>
      {children !== undefined ? children : <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

Button.defaultProps = { variant: "default" };

export default Button;
