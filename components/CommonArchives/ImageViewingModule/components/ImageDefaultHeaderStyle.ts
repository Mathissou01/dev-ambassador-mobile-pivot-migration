import EStyleSheet from "react-native-extended-stylesheet";
import {colors} from "@/config/styles/01-settings/_colors";

const styles = EStyleSheet.create({
    root: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        top: 0
    },
    closeButton: {
        marginRight: 8,
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 22,
        backgroundColor: "#00000077",
    },
    userInfoContainer: {
        flex: 1,
        zIndex: 1,
        display: "flex",
        backgroundColor: "transparent",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "space-between",
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
        display: "flex",
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
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
        justifyContent: "space-evenly",
        gap: 10,
    },
    socialBtn: {
        padding: 10,
    },
});

export default styles;
