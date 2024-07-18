import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  backgroundScreen: {
    ...EStyleSheet.absoluteFillObject,
    zIndex: -40,
  },
  scrollableContainer: {
    backgroundColor: "transparent",
    flex: 1,
    zIndex: 20,
    display: "flex",
  },
  container: {
    padding: 55,
    paddingTop: 60,
    paddingBottom: 15,
    alignItems: "center",
    backgroundColor: "transparent",
    "@media (max-height: 670)": {
      paddingTop: 30,
      paddingBottom: 20,
    },
    felx: 1,
    minHeight: () => EStyleSheet.value("$contentHeight") - 35,
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
  logo: {
    width: 100,
    height: 100,
    margin: 0,
    borderWidth: 2,
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#ffffff5f",
    "@media (max-height: 670)": {
      width: 90,
      height: 90,
    },
  },
  messageContainer: {
    borderRadius: 10,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  portContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "transparent",
    gap: 20,
    "@media (max-height: 670)": {
      marginTop: -20,
    },
  },
  submitButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
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
    left: 0,
  },
  lottieImage: {
    width: 250,
    height: 250,
    backgroundColor: "transparent",
    "@media (max-height: 670)": {
      transform: [{ translateY: -10 }],
      width: 200,
      height: 200,
    },
  },
  ellispe: {
    width: 50,
    height: 40,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 50,
    transform: [{ scaleX: 3 }],
    top: -50,
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
    "@media (max-height: 670)": {
      marginTop: -10,
    },
  },
  btnContainer: {
    paddingTop: 20,
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
