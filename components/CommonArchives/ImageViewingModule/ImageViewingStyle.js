import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "@/config/styles/01-settings/_colors";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  userInfoContainer: {
    zIndex: 1,
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    position: "absolute",
    top: "5%",
  },
  userInfoText: {
    textAlign: "left",
    fontSize: 20,
    color: colors.white,
  },
  imageAvatarContainer: {
    position: "relative",
    backgroundColor: "transparent",
    borderRadius: 50,
    padding: 5,
  },
  backgroundScreen: {
    ...EStyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  userInfoImageAvatar: {
    position: "relative",
    width: 80,
    height: 80,
  },
  header: {
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
  imageInfoContainer: {
    backgroundColor: "transparent",
    left: "5%",
    right: "5%",
    bottom: "5%",
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageInfoText: {
    textAlign: "left",
    color: colors.white,
  },
  imageInfoDataContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justfyContent: "center",
    gap: 10,
  },
  footer: {
    position: "absolute",
    width: "100%",
    zIndex: 1,
    bottom: 0,
  },
  rightContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justfyContent: "space-evenly",
    gap: 10,
  },
  socialBtn: {
    padding: 10,
  },
});

export default styles;
