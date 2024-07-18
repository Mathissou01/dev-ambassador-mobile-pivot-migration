import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  container3: {
    position: "relative",
    height: 150,
  },
  container2: {
    height: 450,
    width: "85%",
    marginTop: 15,
    marginLeft: "7.5%",
    borderRadius: 10,
    "@media (max-width: 380)": {
      height: 350,
      marginTop: 10,
    },
  },
  CharacterBackgroundContainer: {
    position: "absolute",
    zIndex: -1,
    height: "100%",
    width: "100%",
    paddingTop: 30,
    padding: 20,
    borderRadius: 10,
  },
  backgroundscene: {
    flex: 1,
    width: "100%",
    height: "100%",
    "@media (max-width: 380)": {
      width: "100%",
      height: "100%",
    },
  },
  bottomscenephoto: {
    height: 60,
    flexDirection: "row",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    borderRadius: 10,
  },
  layerphoto: {
    width: "100%",
    height: 400,
    marginTop: 20,
    marginLeft: "10%",
    zIndex: -3,
    position: "absolute",
    top: -10,
    left: -10,
    transform: [{ rotateZ: "4deg" }],
    borderRadius: 10,
    "@media (max-width: 380)": {
      height: 350,
      transform: [{ rotateZ: "2deg" }],
      left: -15,
    },
  },
  layerphoto2: {
    width: "100%",
    height: 400,
    marginTop: 20,
    marginLeft: "10%",
    zIndex: -4,
    top: -10,
    right: 5,
    position: "absolute",
    transform: [{ rotateZ: "-3deg" }],
    borderRadius: 10,
    "@media (max-width: 380)": {
      height: 350,
      marginTop: 15,
      right: 8,
      transform: [{ rotateZ: "-3deg" }],
    },
  },
  polaroidText: {
    textAlign: "center",
    pointerEvents: "none",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
    marginTop: 50,
    width: "100%",
    backgroundColor: "transparent",
  },
  button: {
    borderRadius: 50,
    height: 55,
    width: 55,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sliderContainer: {
    position: "relative",
  },
  confirmSliderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  shadowProp: {
    elevation: 10,
    shadowColor: "#171517",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  customTextStyle: {
    fontSize: 40,
    fontFamily: "Blackway-Brush",
  },
});

export default styles;
