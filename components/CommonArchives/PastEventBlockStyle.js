import { Appearance } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../config/styles/01-settings/_colors";

const gap = 40;

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  button: {
    width: () => EStyleSheet.value("$contentWidth") / 2 - gap / 2,
  },
  rectangle: {
    height: 100,
    width: "100%",
    borderRadius: 5,
    padding: 10,
  },
  textContainer: {
    backgroundColor: "transparent",
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "left",
  },
  eventNameText: {
    fontSize: 16,
    color: "white",
  },
  eventDateText: {
    fontSize: 14,
    color: "white",
  },
});

export default styles;
