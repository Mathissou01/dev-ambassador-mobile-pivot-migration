import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    secureDisplay: {
        padding: 0,
        paddingHorizontal: 20,
        height: "100%",
        backgroundColor: "transparent",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "transparent",
    },
    title: {
        paddingTop: 15,
        marginBottom: 20,
        textAlign: "left",
        fontSize: 17,
        width: "80%",
        "@media (max-height: 600)": {
            fontSize: 15,
        },
    },
    subtitle: {
        marginVertical: 15,
        fontSize: 16,
        "@media (max-height: 600)": {
            fontSize: 14,
        },
    },
    paragraphStyle: {
        marginBottom: 15,
        fontSize: 15,
        "@media (max-height: 600)": {
            fontSize: 13,
        },
    },
    urlRedirection: {
        textDecorationLine: "underline",
    },
});

export default styles;
