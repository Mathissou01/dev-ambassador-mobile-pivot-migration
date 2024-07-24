import React, {ReactNode, useContext, useEffect} from "react";
import {Dimensions} from "react-native";
import Svg, {Defs, RadialGradient, Rect, Stop} from "react-native-svg";
import LottieView from "lottie-react-native";
import {Audio} from "expo-av";
import {Text, View} from "@/components/Themed";
import ProgressButton from "@/components/Auth/FirstLogin/ProgressButton";
import {type FirstLogStep} from "@/types";
import {ThemeContext} from "@/hooks/useColorScheme";
import {colors} from "@/config/styles/01-settings/_colors";
import styles from "@/styles/auth/first-login/FirstLogStep1Style";
import {router} from "expo-router";

export default function Step1(): ReactNode {
    const colorTheme = useContext(ThemeContext);
    const {width, height} = Dimensions.get("screen");

    const slide: FirstLogStep = {
        description:
            "Hello petit Ambassador ! Bienvenue sur l’application dédiée aux ambassadors de NEXT-U. \nAvant de commencer, j’aurai besoin de quelques informations sur toi. Allons\u2011y !",
        picture: require("@/assets/json/acces-robot/hello.json"),
        page: "/(app)/(first-login)/step-2",
    };

    // TODO - Redo with router
    // Prevoir si l'utilisateur quitte le guide
    // useEffect(() => {
    //     const unsub = navigation.addListener("beforeRemove", askSureBeforeLeave);
    //     return unsub;
    // }, [navigation]);

    // const askSureBeforeLeave = (e: {
    //     preventDefault: () => unknown;
    //     data: { action: NavigationAction };
    // }): void => {
    //     if (!navigation.isFocused()) return;
    //
    //     e.preventDefault();
    //
    //     Alert.alert(
    //         "Veux-tu vraiment partir ?",
    //         "Tu es obligé de passer par ces étapes avant d'accèder à l'application !",
    //         [
    //             {
    //                 text: "Revenir",
    //                 style: "cancel",
    //                 onPress: () => {
    //                 },
    //             },
    //             {
    //                 text: "Quitter",
    //                 style: "destructive",
    //                 onPress: () => {
    //                     navigation.dispatch(e.data.action);
    //                 },
    //             },
    //         ]
    //     );
    // };

    // SOUND PLAYER
    const playSound = async (): Promise<void> => {
        try {
            const {sound} = await Audio.Sound.createAsync(require("@/assets/sounds/HELLO.mp3"));
            await sound.playAsync(); // Play the sound
        } catch (error) {
            console.error("Error playing sound:", error);
        }
    };
    useEffect(() => {
        void playSound();
    }, []);

    return (
        <>
            <Svg style={styles.backgroundScreen}>
                <Defs>
                    <RadialGradient id="gradient" cx="50%" cy="45%">
                        <Stop offset="10%" stopColor={colorTheme?.isDark ?? false ? "#A2CCE1" : "#D4EDFF"}/>
                        <Stop offset="100%" stopColor={colorTheme?.isDark ?? false ? "#0856B3" : "#0D99FF"}/>
                    </RadialGradient>
                </Defs>
                <Rect x={0} y={0} width={width} height={height} fill="url(#gradient)"/>
            </Svg>
            <View style={styles.container}>
                <View
                    style={[
                        styles.messageContainer,
                        {borderColor: colorTheme?.isDark ?? false ? colors.backgroundDark : "#DCDCDC"},
                    ]}
                    lightColor={"white"}
                    darkColor={colors.backgroundDark}
                >
                    <Text
                        lightColor={colors.textLight}
                        darkColor={colors.textDark}
                        style={styles.description}
                    >
                        {slide.description}
                    </Text>
                </View>
                <View
                    style={[
                        styles.bottomBuble,
                        {borderBottomColor: colorTheme?.isDark ?? false ? colors.backgroundDark : "white"},
                    ]}
                ></View>
                <View style={styles.lottieContainer}>
                    <LottieView source={slide.picture} autoPlay loop style={styles.lottieImage}/>

                    <View style={styles.ellispe}></View>
                </View>
                <View style={styles.btnContainer}>
                    <ProgressButton
                        style={styles.button}
                        percentage={20}
                        navigateTo={() => {
                            router.navigate(slide.page);
                        }}
                        timer={false}
                    />
                </View>
            </View>
        </>
    );
}
