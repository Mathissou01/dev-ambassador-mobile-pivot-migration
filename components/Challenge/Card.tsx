import React, { type ReactNode, useContext } from "react";
import { Text, View } from "../.@/components/Themed";
import styles from "./CardStyle.js";
import { colors } from "@/config/styles/01-settings/_colors";
import { ThemeContext } from "../../hooks/useColorScheme";

export default function Card(): React.JSX.Element {
  const colorTheme = useContext(ThemeContext);

  const renderSquare = (row: any, col: number): React.JSX.Element => {
    const isBlue = (row + col) % 2 === 0;
    return (
      <View
        lightColor={isBlue ? colorTheme.colors.primaryExtraLight : colors.gray800}
        darkColor={isBlue ? colorTheme.colors.primaryDark : colors.gray200}
        key={`${row}-${col}`}
        style={[styles.square]}
      />
    );
  };

  const renderRow = (row): ReactNode[] => {
    const squares = [];
    for (let col = 0; col < 8; col++) {
      squares.push(renderSquare(row, col));
    }
    return squares;
  };

  const renderCard = (): ReactNode => {
    const rows = [];
    for (let row = 0; row < 10; row++) {
      rows.push(
        <View key={row} style={[styles.cardRow]}>
          {renderRow(row)}
        </View>
      );
    }
    return rows;
  };
  return (
    <View style={styles.cardContainer}>
      {renderCard()}
      <Text bold style={styles.textContainer}>
        X
      </Text>
    </View>
  );
}
