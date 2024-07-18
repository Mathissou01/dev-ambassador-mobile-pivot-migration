import React, {useContext} from "react";
import {Dimensions, Modal, StyleSheet} from "react-native";
import {BlurView} from "expo-blur";
import {View} from "@/components/Themed";
import LottieView from "lottie-react-native";
import {ThemeContext} from "@/hooks/useColorScheme";
import {useAppSelector} from "@/hooks/store";

const LoaderApi = ({visible = true}: { visible?: boolean }): React.JSX.Element => {
    const colorTheme = useContext(ThemeContext);
    const userSchool = useAppSelector((state) => state.userInfos.school);

    const screenWidth = Dimensions.get("window").width;

    const assocTableLoader = {
        "WebTech Institute": require("../assets/json/loading/webtech_loader.json"),
        "ATLAS Institute": require("../assets/json/loading/atlas_loader.json"),
        "Bachelor Institute": require("../assets/json/loading/bachelor_loader.json"),
        ESCEN: require("../assets/json/loading/escen_loader.json"),
        "Magnum Institute": require("../assets/json/loading/magnum_loader.json"),
        "NEXT-U": require("../assets/json/loading/next_u_loader.json"),
    };

    const assocTableColors = {
        "WebTech Institute": Array(colorTheme?.isDark ?? false === true ? 5 : 0)
            .fill(0)
            .map((_, i: number) => ({
                keypath: "ThemedPath" + (i + 1).toString(),
                color: colorTheme?.isDark ?? false === true ? "#fff" : "#000",
            })),
        "ATLAS Institute": Array(colorTheme?.isDark ?? false === true ? 5 : 0)
            .fill(0)
            .map((_, i: number) => ({
                keypath: "ThemedPath" + (i + 1).toString(),
                color: colorTheme?.isDark ?? false === true ? "#fff" : "#000",
            })),
        "Bachelor Institute": [],
        ESCEN: Array(colorTheme?.isDark ?? false === true ? 3 : 0)
            .fill(0)
            .map((_, i: number) => ({
                keypath: "ThemedPath" + (i + 1).toString(),
                color: colorTheme?.isDark ?? false === true ? "#fff" : "#000",
            })),
        "Magnum Institute":
            colorTheme?.isDark ?? false === true
                ? [
                    {keypath: "ThemedGroup2", color: "#a24949"},
                    {keypath: "ThemedGroup3", color: "#922f4a"},
                    {keypath: "ThemedGroup5", color: "#ac9689"},
                ]
                : [{keypath: "ThemedGroup5", color: "#c0afa5"}],
        "NEXT-U": Array(colorTheme?.isDark ?? false === true ? 5 : 0)
            .fill(0)
            .map((_, i: number) => ({
                keypath: "ThemedPath" + (i + 1).toString(),
                color: colorTheme?.isDark ?? false === true ? "#fff" : "#000",
            })),
    };

    let assocTableDimensions = {
        "WebTech Institute": {width: 200, height: 200},
        "ATLAS Institute": {width: 200, height: 200},
        "Bachelor Institute": {width: 130, height: 130},
        ESCEN: {width: 130, height: 130},
        "Magnum Institute": {width: 100, height: 100},
        "NEXT-U": {width: 100, height: 100},
    };

    if (screenWidth < 380) {
        assocTableDimensions = {
            "WebTech Institute": {width: 180, height: 180},
            "ATLAS Institute": {width: 180, height: 180},
            "Bachelor Institute": {width: 110, height: 110},
            ESCEN: {width: 110, height: 110},
            "Magnum Institute": {width: 80, height: 80},
            "NEXT-U": {width: 80, height: 80},
        };
    }

    const school = userSchool.name ?? "NEXT-U";
    const loaderFile = assocTableLoader[school];
    const loaderColor = assocTableColors[school];
    const loaderDimensions = assocTableDimensions[school];
    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={() => {
        }}>
            <BlurView
                style={styles.blurContainer}
                intensity={100} // Adjust the intensity as needed
                tint={colorTheme?.isDark ? "dark" : "light"} // Adjust tint based on theme
            >
                <View style={styles.modalContent}>
                    <LottieView
                        source={loaderFile}
                        autoPlay
                        loop
                        height={loaderDimensions.height}
                        width={loaderDimensions.width}
                        colorFilters={loaderColor}
                    />
                </View>
            </BlurView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    blurContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default LoaderApi;
