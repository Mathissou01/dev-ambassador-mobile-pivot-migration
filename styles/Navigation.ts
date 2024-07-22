import EStyleSheet from "react-native-extended-stylesheet";
import {StyleSheet} from "react-native";

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    tabBar: {
        height: 70,
        position: "absolute",
        bottom: 12,
        right: 16,
        left: 16,
        borderRadius: 16,
        borderTopColor: "transparent",
        "@media (max-height: 670)": {
            bottom: 8,
            right: 8,
            left: 8,
        },
    },
    btn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 4,
        justifyContent: "center",
        alignItems: "center",
        "@media (max-width: 380)": {
            width: 45,
            height: 45,
        },
    },

    schoolLogo: {
        margin: 0,
        width: 80,
        height: 80,
        objectFit: "contain",
    },
    circle: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
    },

    headerBtnContainer: {
        marginRight: 20,
        marginLeft: 20,

    },
    text: {
        fontSize: 10,
        textAlign: "center",
        fontFamily: "Raleway-Bold",
        "@media (max-height: 670)": {
            marginBottom: 25,
        },
        "@media (max-height: 600)": {
            fontSize: 8,
            marginBottom: 0,
        },
    },
});

export default styles;
