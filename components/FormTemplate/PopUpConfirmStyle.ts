import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  darkBlurContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    flex: 1,
    height: "100%",
    width: "100%",
  },
  modalContent: {
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
    display: "flex",
    height: 350,
  },
  messageText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  okButton: {
    padding: 5,
    borderRadius: 5,
  },
  okButtonText: {
    color: "white",
    fontWeight: "bold",
    padding: 10,
    fontSize: 24,
  },
  loaderContent: {
    height: 150,
    width: 150,
  },
  blurContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  lottieContainer: {
    padding: 10,
    flex: 1,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  lottieImage: {
    width: () => EStyleSheet.value("$contentWidth") / 2.5,
    height: () => (EStyleSheet.value("$contentWidth") * 3) / 4,
    backgroundColor: "transparent",
    margin: 0,
    zIndex: 2,
  },
});

export default styles;
