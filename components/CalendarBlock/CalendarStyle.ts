import { Appearance } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../config/styles/01-settings/_colors";

const colorScheme = Appearance.getColorScheme();
const isDark = colorScheme === "dark";

const styles = EStyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 50,
    height: "100%",
  },
  modalContent: {
    width: "70%",
    padding: 20,
    borderRadius: 15,
    maxHeight: "100%",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    width: "80%",
  },
  closeButton: {
    position: "absolute",
    right: 0,
  },
  closeBtnColor: {
    color: isDark ? colors.textDark : colors.textLight,
  },
  trait_header: {
    height: 1,
    width: "70%",
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
  trait_body: {
    height: 1,
    width: "90%",
    backgroundColor: colors.gray500,
    marginVertical: 10,
    alignSelf: "center",
  },
  buttonValidation: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondaryColor,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: colors.white,
    marginRight: 5,
  },
  item: {
    padding: 20,
    borderRadius: 15,
    flexDirection: "row",
    flex: 1,
  },
  blinkingContainer: {
    marginBottom: 10,
    marginHorizontal: 30,
    borderRadius: 15,
    flexDirection: "row",
    width: "85%",
    height: "100%",
  },
  itemDurationText: {
    color: colors.gray600,
    fontSize: 12,
  },
  itemTitleText: {
    marginLeft: 16,
    fontSize: 16,
  },
  textContainer: {
    backgroundColor: "transparent",
    width: "80%",
    justifyContent: "center",
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.gray500,
  },
  emptyItemText: {
    color: colors.gray500,
    fontSize: 14,
  },
});

export default styles;
