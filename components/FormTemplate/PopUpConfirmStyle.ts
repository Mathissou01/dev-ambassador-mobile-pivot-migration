import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%'
    },
    darkBlurContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        flex: 1,
        height: "100%",
        width: "100%",
    },
    modalContent: {
        padding: 30,
        borderRadius: 10,
        alignItems: "center",
        display: "flex",
        // height: 350,
        width: () => EStyleSheet.value("$contentWidth") * .8,
    },
    messageText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: "center",
    },
    okButton: {
        padding: 5,
        borderRadius: 5,
    },
    okButtonText: {
        color: "white",
        fontWeight: "bold",
        padding: 10,
        fontSize: 24,
    },
    loaderContent: {
        height: 150,
        width: 150,
    },
    blurContainer: {
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
    },
    lottieContainer: {
        padding: 0,
        display: "flex",
        justifyContent: "center",
        width: () => EStyleSheet.value("$contentWidth") / 3.2,
        height: () => EStyleSheet.value("$contentWidth") / 3.2,
        marginTop: -10,
        marginBottom: -20,
    },
    lottieImage: {
        width: '100%',
        height: '100%',
        backgroundColor: "transparent",
        margin: 0,
        zIndex: 2,
    },
});

export default styles;
