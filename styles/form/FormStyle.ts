import { Appearance } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "@/config/styles/01-settings/_colors";

const colorScheme = Appearance.getColorScheme();
const isDark = colorScheme === "dark";

const styles = EStyleSheet.create({
  labelField: {
    color: isDark ? colors.primaryColorDark : colors.primaryColor,
  },
  box: {
    width: 120,
    height: 60,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    marginTop: 30,
    zIndex: -2,
  },
  scrollContainer: {
    paddingTop: 10,
    paddingHorizontal: 30,
    paddingBottom: 50,
    height: "100%",
    backgroundColor: isDark ? colors.backgroundDark : colors.backgroundDefault,
  },
  keyBoardContainer: {
    backgroundColor: isDark ? colors.backgroundDark : colors.backgroundDefault,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: isDark ? colors.black : colors.white,
  },
  section: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  paragraph: {
    fontSize: 15,
  },
  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 45,
  },
  checkbox: {
    margin: 8,
    marginTop: 15,
  },
});

export default styles;
