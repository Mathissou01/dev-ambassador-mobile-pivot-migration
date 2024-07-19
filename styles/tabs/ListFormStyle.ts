import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
    globalContainer: {
        padding: 20,
    },
    secureDisplay: {
        height: "100%",
    },
    title: {
        paddingVertical: 15,
        marginBottom: 40,
        textAlign: "center",
        fontSize: 20,
        "@media (max-width: 380)": {
            fontSize: 16,
        },
    },
    separator: {
        marginVertical: 30,
        height: 3,
        width: "100%",
    },
    empty: {
        textAlign: "center",
        opacity: 0.5,
        fontSize: 15,
        "@media (max-width: 380)": {
            fontSize: 13,
        },
    },
});

export default styles;
