import { Platform, Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const width = Dimensions.get("window").width;

const styles = EStyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "transparent",
  },
  titleSong: {
    fontSize: 20,
    textAlign: "left",
  },
  subTitleSong: {
    fontSize: 16,
    textAlign: "left",
  },
  artisteSong: {
    fontSize: 12,
    textAlign: "left",
  },
  controllerContainer: {
    width: width / 1.8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 45,
  },
  timeTraveler: {
    width: width * 0.8,
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 5,
    marginBottom: 30,
  },
  playBtn: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    height: 60,
    width: 60,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 1,
    shadowRadius: 48,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
          width: 0,
          height: 2,
        },
      },
      android: {
        elevation: 4,
      },
    }),
  },
  skipBtn: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    height: 45,
    width: 45,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 1,
    shadowRadius: 48,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
          width: 0,
          height: 2,
        },
      },
      android: {
        elevation: 4,
      },
    }),
  },
});

export default styles;
