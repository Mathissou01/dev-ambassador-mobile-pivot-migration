import { Platform } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  backgroundScreen: {
    ...EStyleSheet.absoluteFillObject,
    zIndex: -40,
  },
  passwordContainer: {
    width: 300,
    marginTop: -30,
    backgroundColor: "transparent",
    "@media (max-width: 380)": {
      marginTop: 0,
    },
  },
  container: {
    padding: 45,
    paddingTop: 60,
    paddingBottom: 15,
    alignItems: "center",
    backgroundColor: "transparent",
    "@media (max-height: 670)": {
      paddingTop: 30,
      paddingBottom: 20,
    },
    flex: 1,
    minHeight: () => EStyleSheet.value("$contentHeight") - 35,
  },
  topContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    backgroundColor: "transparent",
    flex: 1,
  },
  description: {
    fontSize: 15,
    flexWrap: "wrap",
    "@media (max-height: 670)": {
      fontSize: 13,
    },
    "@media (max-height: 600)": {
      fontSize: 11,
    },
  },
  messageContainer: {
    transform: [{ translateX: 20 }, { translateY: 40 }],
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 10,
    shadowColor: "#171517",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: Platform.OS === "ios" ? 0.2 : 1,
    shadowRadius: Platform.OS === "ios" ? 5 : 10,
    width: "65%",
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
    borderBottomColor: "white",
    transform: [{ rotate: "-90deg" }],
    left: -26,
    top: 100,
    zIndex: 4,
  },
  lottieImage: {
    width: 200,
    height: 200,
    backgroundColor: "transparent",
  },
  ellispeContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
  },
  ellispe: {
    width: 50,
    height: 40,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 50,
    transform: [{ scaleX: 2 }],
    top: -30,
    elevation: 10,
    zIndex: -1,
    shadowColor: "#171517",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    overflow: "hidden",
    shadowRadius: 8,
    "@media (max-height: 600)": {
      elevation: 0,
    },
  },

  lottieContainer: {
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  btnSpacer: {
    height: 40,
    backgroundColor: "transparent",
  },
  btnContainer: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    flex: 1,
    "@media (max-height: 600)": {
      paddingTop: 10,
    },
  },
  button: {
    bottom: 0,
    backgroundColor: "transparent",
  },
});

export default styles;
