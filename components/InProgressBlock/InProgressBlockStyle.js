import { Platform } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  backgroundScreen: {
    ...EStyleSheet.absoluteFillObject,
    zIndex: -40,
  },
  description: {
    fontSize: 15,
    "@media (max-width: 380)": {
      fontSize: 13,
    },
  },
  container: {
    padding: 55,
    paddingTop: 60,
    paddingBottom: 55,
    alignItems: "center",
    backgroundColor: "transparent",
    "@media (max-width: 380)": {
      paddingTop: 30,
      paddingBottom: 20,
    },
    flex: 1,
    minHeight: () => EStyleSheet.value("$contentHeight") - 35,
  },
  messageContainer: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 10,
    shadowColor: "#171517",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: Platform.OS === "ios" ? 0.2 : 1,
    shadowRadius: Platform.OS === "ios" ? 5 : 10,
  },
  bottomBuble: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 30,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    transform: [{ rotate: "180deg" }],
    left: 0,
    top: -1,
    zIndex: 4,
  },
  lottieImage: {
    width: 400,
    height: 400,
    backgroundColor: "transparent",
    "@media (max-width: 380)": {
      width: 340,
      height: 340,
    },
  },
  ellispeContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
  },
  ellispe: {
    width: 40,
    height: 35,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 50,
    transform: [{ scaleX: 2 }],
    top: -40,
    elevation: 10,
    zIndex: -1,
    shadowColor: "#171517",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    overflow: "hidden",
    shadowRadius: 8,
    "@media (max-width: 380)": {
      elevation: 0,
      width: 25,
      height: 20,
    },
  },

  lottieContainer: {
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  btnContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    flex: 1,
  },
  button: {
    bottom: 0,
    backgroundColor: "transparent",
  },
});

export default styles;
