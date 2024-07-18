import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  card: {
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  cardText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    zIndex: 2,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    backgroundColor: "transparent",
    transform: [{ translateY: -40 }],
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    paddingVertical: 20,

    borderRadius: 10,
    height: () => EStyleSheet.value("$contentWidth") + 20,
    "@media (max-height: 600)": {
      height: () => EStyleSheet.value("$contentWidth") / 1.2,
    },
  },
  blurContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  title:{
    textAlign: "center",
    fontSize: 18,
    "@media (max-height: 670)": {
      fontSize: 16,
    },
    "@media (max-height: 600)": {
      fontSize: 14,
    },
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    "@media (max-height: 670)": {
      fontSize: 14,
    },
    "@media (max-height: 600)": {
      fontSize: 12,
    },
  },
  paragraphe:{
    textAlign: "center",
    fontSize: 14,
    "@media (max-height: 670)": {
      fontSize: 12,
    },
    "@media (max-height: 600)": {
      fontSize: 10,
    },
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: 2,
  },
  pdfIcon: {
    fontSize: 100,
    opacity: 0.2,
  },
});

export default styles;
