import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../../config/styles/01-settings/_colors";

const width = Dimensions.get("window").width;

const styles = EStyleSheet.create({
  containerBtn: {
    zIndex: 50,
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: "center",
    alignItems: "center",
    "@media (max-height: 600)": {
      height: 40,
      width: 230,
    },
  },
  label: {
    color: colors.textDark,
    "@media (max-height: 600)": {
      fontSize: 12,
    },
  },
  containerSlide: {
    width,
  },
  titleContainer: {
    height: 100,
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 70,
    opacity: 0.9,
    "@media (max-height: 670)": {
      fontSize: 40,
    },
    "@media (max-height: 600)": {
      fontSize: 30,
    },
  },
  containerSubslide: {
    zIndex: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
    marginTop: 10,
  },
  subtitle: {
    marginBottom: 10,
    fontSize: 20,
    textDecorationLine: "underline",
    textAlign: "center",
    "@media (max-height: 600)": {
      fontSize: 15,
    },
  },
  description: {
    textAlign: "center",
    marginBottom: 10,
    "@media (max-height: 600)": {
      fontSize: 10,
    },
  },
});

export default styles;
