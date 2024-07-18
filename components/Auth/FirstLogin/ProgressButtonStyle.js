import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  button: {
    position: "absolute",
    backgroundColor: "#00f",
    padding: 20,
    borderRadius: 100,
    "@media (max-width: 380)": {
      padding: 15,
    },
  },
});

export default styles;
