import { Appearance } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const colorScheme = Appearance.getColorScheme();
const isDark = colorScheme === "dark";

const styles = EStyleSheet.create({
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    gap: 15,
    paddingHorizontal: 10
  },
  progressBarContainer: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems : "center",
  },
  progressBar: {
    height: 10,
    overflow: "hidden",
  },
});

export default styles;
