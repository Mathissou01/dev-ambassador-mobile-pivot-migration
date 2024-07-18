import { Appearance } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const colorScheme = Appearance.getColorScheme();
const isDark = colorScheme === "dark";

const styles = EStyleSheet.create({
    inScrollContainer: {
        paddingTop: 10,
        flex: 1,
        display: "flex",
        gap: 10,
    },
    flatListStyle: {},
    scrollView: {},
    storiesContainer: {},
    infoLabel: {
        fontSize: 18,
        paddingHorizontal: 10,
    },
    paginationContainer: {
        display: "flex",
        alignItems: "center",
        marginTop: 10,
    },
    flatlistContainer: {},
});

export default styles;
