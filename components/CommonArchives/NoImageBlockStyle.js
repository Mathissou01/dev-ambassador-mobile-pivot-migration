import { colors } from "../../config/styles/01-settings/_colors";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  noEventContainer: {
    position: "relative",
    borderWidth: 2,
    borderColor: colors.blue1,
    borderRadius: 5,
    borderStyle: "dashed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 60,
    height: 200,
    width: "100%",
  },
  noEventLabel: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default styles;
