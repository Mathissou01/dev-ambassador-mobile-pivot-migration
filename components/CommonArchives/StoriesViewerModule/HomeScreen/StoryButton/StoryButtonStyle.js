import { Appearance } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "@/config/styles/01-settings/_colors";

const colorScheme = Appearance.getColorScheme();
const isDark = colorScheme === "dark";

const styles = EStyleSheet.create({
  storyButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: isDark ? colors.backgroundDark : colors.backgroundDefault,
    margin: 2,
    width: 70,
    height: 70,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "transparent",
  },
  gradientBorder: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    width: 75,
    height: 75,
    borderRadius: 43,
    padding: 3,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 1000,
  },
});
export default styles;
