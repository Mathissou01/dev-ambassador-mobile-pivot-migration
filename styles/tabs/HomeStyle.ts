import { Appearance } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "@/config/styles/01-settings/_colors";

const colorScheme = Appearance.getColorScheme();
const isDark = colorScheme === "dark";

const styles = EStyleSheet.create({
    globalContainer: {
        backgroundColor: "transparent",
        marginTop: 10,

        "@media (max-width: 380)": {
            marginTop: 5,
        },
    },
    globalContainerScroll: {
        flex: 1,
    },
    container: {
        backgroundColor: isDark ? colors.backgroundDark : "",
        color: isDark ? colors.gray300 : colors.black,
    },
    title: {
        fontSize: "1.5rem",
        textAlign: "center",
        backgroundColor: "transparent",
        "@media (max-width: 380)": {
            fontSize: "1.3rem",
        },
        "@media (max-height: 600)": {
            fontSize: "1rem",
        },
    },
    titleView: {
        backgroundColor: "transparent",
        textAlign: "center",
    },
});

export default styles;
