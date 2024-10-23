import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "black"
    },
    textInput: {color: "white", width: "100%"},
    image: {
        width: "100%",
        resizeMode: "cover",
        alignSelf: "center",
        borderRadius: 8,
        zIndex: 1,
        marginTop: 0,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        marginTop: 10,
        paddingHorizontal: 15,
        backgroundColor: "transparent",
    },
    userName: {
        fontSize: 16,
        color: "#FFF",
        fontWeight: "bold",
        shadowColor: "black",
        textShadowRadius: 4,
    },
    closeButton: {
        justifyContent: "center",
        alignItems: "center",
    },
    closeButtonText: {
        fontSize: 18,
        color: "#FFF",
    },
    backButton: {
        position: "absolute",
        left: 20,
        zIndex: 2,
        aspectRatio: 0.28125,
        height: "85%",
        backgroundColor: "transparent",
    },
    forwardButton: {
        position: "absolute",
        right: 20,
        zIndex: 2,
        aspectRatio: 0.28125,
        height: "85%",
        backgroundColor: "transparent",
        // backgroundColor: "rgba(255,255,255,.4)",
    },
    bottomTab: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        alignSelf: "center",
        backgroundColor: "transparent",
        zIndex: 3,
    },
    messageBox: {
        borderRadius: 1000,
        borderWidth: 1,
        borderColor: "gray",
        width: "80%",
        padding: 10,
    },
    storyContainer: {
        position: "absolute",
        zIndex: 2,
        justifyContent: "flex-start",
        height: "100%",
        width: "100%",
        alignItems: "center",
        backgroundColor: "transparent",
    },
});
export default styles;
