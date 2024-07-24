import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  inScrollContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    gap: 10,
  },
  imagesHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  headerContainer: {
    flexDirection: "collumn",
  },
  subHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    paddingVertical: 10,
    flexWrap: "nowrap",
  },
  leftTextContainer: {
    flexShrink: 1,
  },
  rightTextContainer: {
    backgroundColor: "transparent",
  },
  eventTitle: {
    fontSize: 24,
  },
  imageGridContainer: {
    height: 200,
  },
  dateEventLabel: {
    textAlign: "center",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "black",
    paddingHorizontal: 7,
    paddingVertical: 3.5,
  },
  statisticTitle: {
    paddingTop: 15,
  },
  socialBtn: {
    opacity: 0.2,
  },
});

export default styles;
