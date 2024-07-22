import {Platform} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "blue",
    },
    emptyNotif: {
        alignItems: "center",
        justifyContent: "center",
    },
    emptyNotifTextTitle: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        "@media (max-width: 380)": {
            fontSize: 14,
        },
    },
    emptyNotifText: {
        textAlign: "center",
        fontSize: 14,
        "@media (max-width: 380)": {
            fontSize: 12,
        },
    },
    iconNotification: {
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    iconDelete: {
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        padding: 10,
        height: 55,
        width: 55,
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOffset: {width: 0, height: 25},
        shadowOpacity: 1,
        shadowRadius: 48,
        marginVertical: 20,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOpacity: 0.5,
                shadowRadius: 2,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
            },
            android: {
                elevation: 4,
            },
        }),
    },
});

export default styles;
