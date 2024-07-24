import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "@/config/styles/01-settings/_colors";

const screenWidth = Dimensions.get("window").width;
const screenHalfWidth = screenWidth / 3;
const outerCircle = screenHalfWidth;
const innerCircle = screenHalfWidth - 40;

const styles = EStyleSheet.create({
  container: {
    position: "absolute",
    transform: [{ rotate: "15deg" }],
    top: 250,
    left: 180,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    "@media (max-height: 600)": {
      top: 225,
    },
  },
  schoolYearTextTop: {
    position: "absolute",
    left: outerCircle - 10,
    top: outerCircle - innerCircle / 2 - 20,
    fontSize: 15,
    color: colors.textLight,
    "@media (max-height: 600)": {
      fontSize: 12,
      top: outerCircle - innerCircle / 2 - 22,
    },
  },
  schoolYearTextBottom: {
    position: "absolute",
    left: outerCircle - 10,
    top: outerCircle + innerCircle / 2,
    fontSize: 15,
    color: colors.textLight,
    "@media (max-height: 600)": {
      fontSize: 12,
      top: outerCircle + innerCircle / 2 - 2,
    },
  },
  schoolLogo: {
    position: "absolute",
    left: outerCircle - 60 / 2,
    top: outerCircle - 60 / 2,
    width: 60,
    height: 60,
    resizeMode: "contain",
    "@media (max-height: 600)": {
      width: 50,
      height: 50,
      left: outerCircle - 50 / 2,
      top: outerCircle - 50 / 2,
    },
  },
});

export default styles;
