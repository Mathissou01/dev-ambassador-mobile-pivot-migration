// import { Appearance } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
// import { colors } from "@/config/progressBarStyle/01-settings/_colors";

// const colorScheme = Appearance.getColorScheme();
// const isDark = colorScheme === "dark";

const styles = EStyleSheet.create({
  mainStatsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 15,
  },
  firstStatsContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  secondStatsContainer: {
    backgroundColor: "transparent",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textStats: {
    fontSize: 16,
    color: "white",
  },
  textInfo: {
    fontSize: 16,
    color: "white",
    marginLeft: 5,
  },
});

export default styles;
