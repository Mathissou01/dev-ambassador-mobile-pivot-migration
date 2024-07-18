import { Dimensions, StyleSheet, Appearance } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { hexToRgbA } from "@/utils/hexToRgbA";
import { colors } from "@/config/styles/01-settings/_colors";

const { width, height } = Dimensions.get("window");
const colorScheme = Appearance.getColorScheme();
const isDark = colorScheme === "dark";

const styles = EStyleSheet.create({
  triggerArea: {
    position: "relative",
    bottom: 28,
    left: (width - width * 0.35) / 2,
    width: width * 0.35,
    height: 8,
    marginVertical: 10,
    backgroundColor: isDark ? colors.gray300 : colors.gray500,
    borderRadius: 10,
  },
  menuContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: height * 0.5,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: "hidden",
  },
  breakList: {
    width: width * 0.5,
    height: 2,
    backgroundColor: isDark ? hexToRgbA(colors.gray300, 0.25) : hexToRgbA(colors.gray500, 0.25),
    marginVertical: 15,
  },
});

export default styles;
