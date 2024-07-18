import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  svgimg: {
    height: 40,
    width: 200,
  },
  centeredContent: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  svgContainer: {
    position: "absolute",
  },
  svg: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginTop: -5,
    "@media (max-height: 670)": {
      fontSize: 14,
    },
    "@media (max-height: 600)": {
      fontSize: 12,
    },
  },
});

export default styles;
