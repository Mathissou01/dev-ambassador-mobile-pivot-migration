import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  card: {
    borderRadius: 10,
    marginLeft: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: () => EStyleSheet.value("$contentWidth") * 0.6,
    marginRight: 20,
    height: 100,
  },
  text: {
    fontSize: 20,
    "@media (max-width: 380)": {
      fontSize: 16,
    },
  },
  icon: {
    fontSize: 30,
  },
});

export default styles;
