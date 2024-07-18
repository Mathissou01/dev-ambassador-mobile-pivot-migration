import { Appearance } from "react-native";
import { colors } from "../../../config/styles/01-settings/_colors";
import EStyleSheet from "react-native-extended-stylesheet";

const colorScheme = Appearance.getColorScheme();
const isDark = colorScheme === "dark";
const shadowColor = isDark ? colors.white : colors.black;

const styles = EStyleSheet.create({
  container_point_impair: {
    color: colors.white,
    fontSize: 55,
    textAlign: "center",
    "@media (max-height: 670)": {
      fontSize: 45,
    },
    "@media (max-height: 600)": {
      fontSize: 35,
    },
  },
  container_text_impair: {
    color: colors.white,
    fontSize: 18,
    textAlign: "center",
    "@media (max-height: 600)": {
      fontSize: 14,
    },
  },
  container_impair: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: () => EStyleSheet.value("$contentWidth") * 0.4,
    height: () => EStyleSheet.value("$contentWidth") * 0.4,
    marginHorizontal: () => EStyleSheet.value("$contentWidth") * 0.05,
    marginVertical: () => EStyleSheet.value("$contentWidth") * 0.05,
    // Iphone SE
    "@media (max-height: 670)": {
      width: () => EStyleSheet.value("$contentWidth") * 0.38,
      height: () => EStyleSheet.value("$contentWidth") * 0.38,
      marginHorizontal: () => EStyleSheet.value("$contentWidth") * 0.03,
      marginVertical: () => EStyleSheet.value("$contentWidth") * 0.03,
    },
  },
  container_ambassador_info: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    zIndex: 10,
    paddingTop: "1rem",
    paddingBottom: "7rem",
    "@media (max-width: 380)": {
      paddingBottom: "7rem",
    },
  },
  shadowProp: {
    elevation: 8,
    shadowColor,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default styles;
