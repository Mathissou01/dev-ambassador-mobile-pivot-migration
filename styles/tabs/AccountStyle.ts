import {colors} from "@/config/styles/01-settings/_colors";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
    main_container: {
        height: () => EStyleSheet.value("$contentHeight"),
        paddingBottom: 30,
    },
    inScrollContainer: {
        marginBottom: 50,
        flex: 1,
        "@media (max-height: 670)": {
            marginBottom: 60,
        },
    },
    avatarImage: {
        position: "absolute",
        width: '100%',
        height: '100%',
        resizeMode: "contain",
        zIndex: 2,
        top: 0,
    },
    linearback: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        zIndex: -1,
    },
    widget_container: {
        marginHorizontal: 10,
        borderRadius: 25,
    },
    container_polaroid: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    polaroid: {
        borderRadius: 10,
        zIndex: 3,
        borderWidth: 1,
        borderColor: colors.gray300,
    },
    frame: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderWidth: 10,
        borderRadius: 10,
        backgroundColor: "transparent",
    },
    photoFrame: {
        backgroundColor: "transparent",
        zIndex: 1,
        overflow: "hidden",
        borderRadius: 10,
    },

    scotch: {
        position: "absolute",
        left: "50%",
        height: 40,
        zIndex: 10,
        transform: () => [{translateX: -EStyleSheet.value("$contentWidth") * 0.25}],
        backgroundColor: "transparent",
        justifyContent: "center",
    },
    textPolaroid: {
        zIndex: 10,
        textAlign: "center",
        color: colors.textLight,
        fontSize: 40,
        fontFamily: "Blackway-Brush",
        "@media (max-height: 600)": {
            fontSize: 30,
        },
    },
    blinkingContainer: {
        position: "absolute",
        top: "20%",
        left: 0,
    },
    polaroidButton: {
        position: "absolute",
        zIndex: 50,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: colors.gray500,
        backgroundColor: colors.gray300,
    },
});
export default styles;
