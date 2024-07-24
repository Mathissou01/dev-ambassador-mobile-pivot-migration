import { Appearance } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "@/config/styles/01-settings/_colors";

const colorScheme = Appearance.getColorScheme();
const isDark = colorScheme === "dark";

const styles = EStyleSheet.create({
  addStorieButtonContainer: {},
  gradientBorderContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    width: 75,
    height: 75,
    borderRadius: 43,
    padding: 3,
  },
  addStoryButton: {
    backgroundColor: isDark ? colors.backgroundDark : colors.backgroundDefault,
    width: 70,
    height: 70,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "transparent",
  },
  addStorieIconContainer: {
    display: "flex",
    backgroundColor: "transparent",
    borderColor: isDark ? colors.backgroundDark : colors.backgroundDefault,
    borderWidth: 1,
    borderRadius: 25,
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  addStorieIcon: {
    // paddingHorizontal: 10,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 25,
  },
  addStoryAvatar: {
    height: "100%",
    width: "100%",
  }
});
export default styles;
