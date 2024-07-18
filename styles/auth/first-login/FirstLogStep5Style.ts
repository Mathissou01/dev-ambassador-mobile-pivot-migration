import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  backgroundScreen: {
    ...EStyleSheet.absoluteFillObject,
    zIndex: -40,
  },
  container: {
    padding: 55,
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "transparent",
    flex: 1,
    minHeight: () => EStyleSheet.value("$contentHeight") - 35,
    "@media (max-height: 670)": {
      paddingTop: 30,
      paddingHorizontal: 35,
      paddingBottom: 20,
    },
  },
  messageContainer: {
    padding: 20,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  description: {
    fontSize: 15,
    "@media (max-height: 670)": {
      fontSize: 13,
    },
    "@media (max-height: 600)": {
      fontSize: 11,
    },
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
    transform: [{ rotate: "180deg" }, { translateX: 20 }],
    left: "50%",
  },
  lottieImage: {
    backgroundColor: "transparent",
    width: 300,
    height: 300,
    "@media (max-height: 670)": {
      width: 280,
      height: 280,
    },
  },
  ellispeContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
  },
  ellispe: {
    width: 80,
    height: 70,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 50,
    transform: [{ scaleX: 2 }],
    top: () => -EStyleSheet.value("$contentWidth") / 9,
    elevation: 10,
    zIndex: -10,
    left: 0,
    shadowColor: "#171517",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    overflow: "hidden",
    shadowRadius: 8,
    "@media (max-height: 670)": {
      elevation: 0,
    },
  },
  robotContainer: {
    backgroundColor: "transparent",
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  firstlottieContainer: {
    position: "absolute",
    top: "50%",
    width: "100%",
    transform: [{ translateY: -150 }],
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    "@media (max-height: 670)": {
      marginTop: -15,
    },
    "@media (max-height: 600)": {
      marginTop: -35,
    },
  },
  secondlottieContainer: {
    position: "absolute",
    top: "50%",
    transform: () => [
      { translateY: (-(EStyleSheet.value("$contentWidth") - 120) * 960) / 540 / 2 },
      { scale: 0.95 },
    ],
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    zIndex: 10,
    "@media (max-height: 670)": {
      transform: () => [
        { translateY: (-(EStyleSheet.value("$contentWidth") - 65) * 960) / 540 / 2 },
        { scale: 0.95 },
      ],
      marginTop: -35,
    },
  },
  lottieImage2: {
    width: 520,
    height: 520,
    "@media (max-height: 670)": {
      width: 500,
      height: 500,
    },
    backgroundColor: "transparent",
  },
  btnContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    marginTop: 80,
    "@media (max-height: 670)": {
      marginTop: 30,
    },
    "@media (max-height: 600)": {
      marginTop: 10,
    },
  },
  ellipseContainerPosition: {
    zIndex: -40,
  },
  button: {
    bottom: 0,
    backgroundColor: "transparent",
  },
  ellipse2: {
    left: "50%",
    transform: () => [
      { translateY: ((-(EStyleSheet.value("$contentWidth") - 120) * 960) / 540 / 100) * 25 },
      { translateX: -(EStyleSheet.value("$contentWidth") - 120) / 8 },
      { scaleX: 2.1 },
      { scaleY: 1 },
    ],
    "@media (max-height: 600)": {
      transform: () => [
        { translateY: ((-(EStyleSheet.value("$contentWidth") - 75) * 960) / 540 / 100) * 25 },
        { translateX: -(EStyleSheet.value("$contentWidth") - 65) / 8 },
        { scaleX: 2.1 },
        { scaleY: 1.1 },
      ],
    },
  },
});

export default styles;
