import { Appearance } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "@/config/styles/01-settings/_colors";

const colorScheme = Appearance.getColorScheme();
const isDark = colorScheme === "dark";

const styles = EStyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
  },
  notificationHeader: {
    backgroundColor: "transparent",
    flexDirection: "row",
    columnGap: 10,
  },
  iconContainer: {
    padding: 4,
    borderRadius: 8,
  },
  notificationDetails: {
    flex: 1,
    marginTop: 5,
    backgroundColor: "transparent",
  },
  notificationTitle: {
    fontSize: 16,
    letterSpacing: 0,
    "@media (max-height: 670)": {
      fontSize: 14,
    },
    "@media (max-height: 600)": {
      fontSize: 12,
    },
  },
  notificationDate: {
    marginTop: 7,
    fontSize: 12,
    "@media (max-height: 600)": {
      fontSize: 10,
    },
  },
  backgroundSwipeable: {
    backgroundColor: isDark ? colors.errorDark : "red",
    borderRadius: 12,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  deleteIcon: {
    backgroundColor: "transparent",
    marginTop: 15,
    marginRight: 20,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    width: 80,
    paddingLeft: 5,
    justifyContent: "center",
    "@media (max-height: 600)": {
      marginRight: 10,
    },
  },
  iconNotification: {
    borderRadius: 30,
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
