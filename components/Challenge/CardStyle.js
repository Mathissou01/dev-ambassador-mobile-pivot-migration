import EStyleSheet from "react-native-extended-stylesheet";
import {colors} from "../../config/styles/01-settings/_colors";

const styles = EStyleSheet.create({
    cardContainer: {
        width: 50,
        height: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.gray800,
        borderWidth: 2,
        borderColor: colors.backgroundDark,
        overflow: "hidden",
        borderRadius: 5,
    },
    square: {
        width: 12,
        height: 12,
    },
    cardRow: {
        flexDirection: "row",
    },
    textContainer: {
        fontSize: 70,
        position: "absolute",
        color: "#0008",
        opacity: 0.9,
        transform: [{translateY: 0 }, {translateX: 0}],
    },
});

export default styles;
