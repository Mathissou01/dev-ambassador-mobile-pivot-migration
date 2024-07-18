import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 50,
    elevation: 5,
    shadowColor: "#171517",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    "@media (max-width: 380)": {
      marginLeft: 15,
      marginRight: 15,
    },
  },
  button: {
    padding: 5,
    borderRadius: 100,
    borderWidth: 0,
    borderColor: "transparent",
    marginHorizontal: 5,
    width: 35,
    height: 35,
    resizeMode: "contain",
    backgroundColor: "transparent",
    "@media (max-width: 380)": {
      width: 30,
      height: 30,
      padding: 3,
    },
  },
});

export default styles;
