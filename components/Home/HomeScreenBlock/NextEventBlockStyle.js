import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../../config/styles/01-settings/_colors";

const styles = EStyleSheet.create({
  separator: {
    margin: "0px 30px 0px",
    height: 1,
    width: "80%",
  },
  grid: {
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    margin: 20,
    width: 140,
    height: 120,
    padding: 10,
    color: colors.white,
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
  },
  logoschool: {
    width: 150,
    height: 65,
    objectFit: "cover",
  },
  image_container: {
    flex: 1,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  container_calendar: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
    zIndex: 5,
    margin: 0,
    "@media (max-width: 380)": {
      marginTop: 5,
      width: () => EStyleSheet.value("$contentWidth") * 0.86,
      marginLeft: () => EStyleSheet.value("$contentWidth") * 0.071,
    },
  },

  event_title: {
    fontSize: 19,
    textAlign: "center",
    marginBottom: 20,
    "@media (max-height: 600)": {
      fontSize: "1rem",
    },
  },
  info_event: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  calendar_draw: {
    width: 80,
    height: 120,
    borderRadius: 8,
    "@media (max-width: 380)": {
      width: 70,
      height: 100,
    },
  },
  topcalendar_draw: {
    width: 80,
    height: 20,
    borderRadius: 5,
    "@media (max-width: 380)": {
      width: 70,
      height: 20,
    },
  },
  order_spirale_draw: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
    backgroundColor: "transparent",
    transform: "translateY(-5px)",
    "@media (max-width: 380)": {
      transform: "translateY(-7px)",
    },
  },
  spirale_draw: {
    width: 10,
    height: 18,
    marginLeft: 12.5,
    borderRadius: 18,

    "@media (max-width: 380)": {
      width: 7,
      height: 15,
    },
  },
  text_submaintitle: {
    textAlign: "center",
    justifyContent: "center",
    color: colors.red,
    backgroundColor: "transparent",
  },
  text_subtitle: {
    maxWidth: "95%",
    textAlign: "left",
    justifyContent: "center",
    flexWrap: "wrap",
    backgroundColor: "transparent",
    fontSize: 15,
    "@media (max-width: 380)": {
      fontSize: 13,
    },
  },
  text_subtitle_hour: {
    justifyContent: "center",
    backgroundColor: "transparent",
    textAlign: "left",
    flexWrap: "wrap",
    fontSize: 15,
    "@media (max-width: 380)": {
      fontSize: 13,
    },
  },
  calendar_info: {
    backgroundColor: "transparent",
    flexDirection: "column",
    alignItems: "center",
    height: "80%",
    justifyContent: "center",
  },
  calendar_date_title: {
    fontSize: 52,
    fontWeight: 500,
    textAlign: "center",
    backgroundColor: "transparent",
    color: colors.black,

    "@media (max-width: 380)": {
      fontSize: 40,
    },
  },
  calendar_date_subtitle: {
    fontSize: 20,
    fontWeight: 500,
    textAlign: "center",
    backgroundColor: "transparent",
    alignItems: "baseline",
    color: colors.black,

    "@media (max-width: 380)": {
      fontSize: 18,
    },
    "@media ios": {
      transform: [{ translateY: -9 }],
    },
  },
  text_area_time: {
    flexDirection: "column",
    backgroundColor: "transparent",
    width: "70%",
    "@media (max-width: 380)": {
      marginLeft: -10,
    },
  },
  text_info_all: {
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  navigationButton: {
    borderRadius: 50,
    alignItems: "center",
    padding: 4,
    border: "1px solid #fff",
  },
  shadowProp: {
    elevation: 8,
    shadowColor: "#171717",
    shadowOffset: { width: 10, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  icon: {
    fontSize: 50,
  },
});

export default styles;
