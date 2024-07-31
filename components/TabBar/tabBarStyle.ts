import EStyleSheet from "react-native-extended-stylesheet";
import {StyleSheet} from "react-native";

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    circle: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        scale: 0,
        transform: [{scale: 0}]
    },
    text: {
        fontSize: 10,
        textAlign: "center",
        fontFamily: "Raleway-Bold",
        transform: [{scale: 0}],
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
