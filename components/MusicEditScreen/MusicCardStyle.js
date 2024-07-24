import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "@/config/styles/01-settings/_colors";

const styles = EStyleSheet.create({
  container: {
    backgroundColor: colors.gray500,
    height: 65,
    overflow: "hidden",
    borderRadius: 16,
  },
  vynileContainer: {
    height: "100%",
  },
  containerLeft: {
    flexDirection: "row",
    columnGap: 10,
  },
  musicTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  musicInfo: {
    fontSize: 12,
    fontWeight: "bold",
  },
  playBtn: {
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 5,
    backgroundColor: colors.gray200,
  },
  infoPlaying: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
});

export default styles;
