import EStyleSheet from "react-native-extended-stylesheet";
import {colors} from "@/config/styles/01-settings/_colors";

const styles = EStyleSheet.create({
    headingText: {
        fontSize: 26,
        fontWeight: "bold",
        maxWidth: "80%",
    },
    subheadingText: {
        fontSize: 22,
        fontWeight: "bold",
        maxWidth: "80%",
        marginTop: 10,
        marginBottom: 20,
    },
    normalText: {
        fontSize: 18,
        color: "white",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        overflow: "hidden",
        backgroundColor: "#21a5ff",
    },
    mainButton: {
        margin: 10,
        flexDirection: "row",
    },
    lottieImage: {
        width: 100,
        height: 100,
        backgroundColor: "transparent",
        position: "absolute",
        zIndex: 2,
    },
    firstLotti: {
        left: -25,
        top: 90,
        height: 100,
    },
    secondLotti: {
        right: -15,
        top: 30,
        height: 40,
    },
    secondButton: {
        fontSize: 10,
        backgroundColor: "transparent",
    },
    robotImage: {
        position: "absolute",
        bottom: 0,
        left: 0,
        aspectRatio: 1,
        width: "70%",
        height: "auto",
        objectFit: "contain",
    },
    logoBackground: {
        padding: 10,
        borderRadius: 100,
        width: 200,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 40,
        backgroundColor: "#21a5ff80",
    },
    container: {
        flex: 1,
        alignItems: "center",
        gap: 35,
        paddingTop: "25%",
        paddingHorizontal: 20,
    },
    permissionsContainer: {
        marginTop: 20,
        alignItems: "center",
        backgroundColor: "transparent",
    },
    permissionText: {
        fontSize: 16,
        textAlign: "center",
        maxWidth: 300,
        marginBottom: 20,
    },
    hyperlinkText: {
        color: colors.gray700,
        fontSize: 14,
    },
    ctas: {
        gap: 5,
        alignItems: "center",
    },
});

export default styles;
