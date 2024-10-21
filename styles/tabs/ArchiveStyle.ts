import { Appearance } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const colorScheme = Appearance.getColorScheme();
const isDark = colorScheme === "dark";

const styles = EStyleSheet.create({
  inScrollContainer: {
    paddingTop: 10,
    flex: 1,
    display: "flex",
    gap: 10,
    marginBottom: 120,
  },
  flatListStyle: {},
  scrollView: {},
  storiesContainer: {},
  infoLabel: {
    fontSize: 18,
    paddingHorizontal: 10,
  },
  paginationContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },
  lottieImage: {
    width: 400,
    height: 300,
    backgroundColor: "transparent",
    margin: 0,
    transform: [{ translateY: -30 }],
    zIndex: 2,
  },
  noEventContainer: {
    margin: 0,
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  noEventText: {
    fontSize: 14,
    margin: 0,
    textAlign: "center",
  },
});

export default styles;
