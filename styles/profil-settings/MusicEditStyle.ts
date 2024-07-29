import {Appearance, Dimensions, Platform, StyleSheet} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {colors} from "@/config/styles/01-settings/_colors";

const {width, height} = Dimensions.get("window");
const colorScheme = Appearance.getColorScheme();
const isDark = colorScheme === "dark";

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDark ? colors.backgroundDark : colors.backgroundDefault,
    },
    artistContainer: {
        width,
        // height: height * 0.5,
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 80,
        overflow: "hidden",
        aspectRatio: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    // Vynil Animation
    vynilAnimationContainer: {
        position: "absolute",
        zIndex: 2,
        width: "100%",
        height: "100%",
        top: "0%",
        backgroundColor: "transparent",
    },
    lottieVynilAnimation: {
        top: width * .325,
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 3,
    },
    // Vynil Animation
    gestureVynilContainer: {
        overflow: "hidden",
        position: "relative",
        backgroundColor: "transparent",
        zIndex: 5,
        height: "85%",
        paddingTop: 30,
        top: "-10%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    backgroundStyle: {
        width: "100%",
        height: "100%",
    },
    playerContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "transparent",
    },
    controllerContainer: {
        width: width / 1.8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    playBtn: {
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        height: 60,
        width: 60,
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOffset: {width: 0, height: 25},
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
        shadowOffset: {width: 0, height: 25},
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
