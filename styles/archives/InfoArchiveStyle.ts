import EStyleSheet from "react-native-extended-stylesheet";
import {colors} from "@/config/styles/01-settings/_colors";

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        gap: 35,
        paddingTop: "25%",
        paddingBottom: "8%",
        paddingHorizontal: 20,
        backgroundColor: "#21a5ff",
    },
    logoBackground: {
        width: 280,
        height: 280,
        backgroundColor: "#4daefa",
        borderRadius: 500,
        elevation: 100,
        shadowColor: "#116cab",
        shadowOffset: {width: 50, height: 50},
        shadowOpacity: 0.1,
        shadowRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    noPictureAnimation: {
        backgroundColor: "transparent",
    },
    infoContainer: {
        paddingHorizontal: 10,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        rowGap: 10,
        flex: 1,
    },
    headTitleText: {
        fontSize: 22,
        textAlign: "center",
    },
    subheadTitleText: {
        color: colors.gray700,
        fontSize: 14,
        textAlign: "center",
    },
    secondTextInfoContainer: {
        alignItems: "flex-start",
    },
    mainButton: {
        flexDirection: "row",
        width: 50,
        height: 50,
        marginTop: 25,
        paddingLeft: 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.backgroundNavDark,
        borderRadius: 100,
    },
    infoText: {
        color: colors.gray700,
        fontSize: 14,
        textAlign: "center",
    },
    infoTextCenter: {
        textAlign: "center",
    },
    textContainer: {
        display: "flex",
        gap: 8,
        paddingHorizontal: 20,
    },
});

export default styles;
