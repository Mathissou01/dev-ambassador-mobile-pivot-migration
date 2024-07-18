import { Appearance, Platform } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../../config/styles/01-settings/_colors";

const colorScheme = Appearance.getColorScheme();

const styles = EStyleSheet.create({
  cardContainer: {
    overflow: "hidden",
    borderRadius: 20,
    margin: 10,
    marginLeft: 0,
    marginRight: 20,
    position: "relative",
    elevation: 5,
    shadowColor: "#171517",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: Platform.OS === "ios" ? 0.2 : 1,
    shadowRadius: Platform.OS === "ios" ? 5 : 15,
  },
  cardContent: {
    position: "absolute",
    bottom: "5%",
    left: "10%",
    zIndex: 10,
    backgroundColor: "transparent",
  },
  textFirstName: {
    zIndex:1,
    paddingRight: 8,
    color: colors.white,
    textShadowColor: "gray",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2
  },
  illustrationSchoolLogo: {
    position: "absolute",
    left: 0,
    width: "100%",
    height: "100%",
  },
  gradientContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
