import { useContext } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { Appearance } from "react-native";
import { ThemeContext } from "../../../../hooks/useColorScheme";

const colorScheme = Appearance.getColorScheme();
const isDark = colorScheme === "dark";

function CommonStyle({ selectedItem }) {
  const themeColor = useContext(ThemeContext);
  return {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: themeColor?.colors.primary,
    backgroundColor: selectedItem
      ? themeColor?.colors.primaryLight
      : "transparent",
    marginRight: 10,
  };
}

const styles = EStyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 120,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    margin: "auto",
  },
});

export { styles, CommonStyle };
