import { Appearance } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { hexToRgbA } from "@/utils/hexToRgbA";
import { colors } from "@/config/styles/01-settings/_colors";

const colorScheme = Appearance.getColorScheme();
const isDark = colorScheme === "dark";

const styles = EStyleSheet.create({
  linearGradient: {
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 13,
  },
  container: {
    flexDirection: "column",
    margin: 5,
    paddingVertical: 5,
    backgroundColor: isDark ? hexToRgbA(colors.white, 0.4) : colors.gray300,
    borderRadius: 8,
    overflow: "hidden",
  },
  rectangle: {
    width: () => EStyleSheet.value("$contentWidth") / 3.5,
    height: 150,
    marginRight: 10,
    borderRadius: 5,
    padding: 10,
  },
  mainContainer: {
    padding: 10,
    backgroundColor: "transparent",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    paddingVertical: 3,
    flexWrap: "nowrap",
    backgroundColor: "transparent",
  },
  leftTextContainer: {
    flexShrink: 1,
    backgroundColor: "transparent",
  },
  rightTextContainer: {
    backgroundColor: "transparent",
  },
  eventNameText: {
    fontSize: 16,
    color: "black",
  },
  eventDateText: {
    fontSize: 14,
    color: "black",
  },
  topRightCircle: {
    position: "absolute",
    top: -35,
    right: -35,
    height: 70,
    width: 70,
    overflow: "hidden",
    borderRadius: 30
  },
  line: {
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    borderRadius: 5,
    marginVertical: 7,
  },
  eventInfoText: {
    fontSize: 16,
  },
  eventInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  eventInfoWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 3,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  insideContainer: {
    backgroundColor: "transparent",
  },
});

export default styles;
