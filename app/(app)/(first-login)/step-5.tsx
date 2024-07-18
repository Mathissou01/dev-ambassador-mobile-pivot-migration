import React, {ReactNode, useContext, useEffect, useRef, useState} from "react";
import {Animated, Dimensions, StyleSheet} from "react-native";
import Svg, {Defs, RadialGradient, Rect, Stop} from "react-native-svg";
import LottieView from "lottie-react-native";
import {Audio} from "expo-av";
import {Text, View} from "@/components/Themed";
import ProgressButton from "@/components/Auth/FirstLogin/ProgressButton";
import {type FirstLogStep} from "@/types";
import {ThemeContext} from "@/hooks/useColorScheme";
import {colors} from "@/config/styles/01-settings/_colors";
import styles from "@/styles/auth/first-login/FirstLogStep5Style";
import {router} from "expo-router";

export default function Step5(): ReactNode {
    const colorTheme = useContext(ThemeContext);
    const {width, height} = Dimensions.get("screen");

    const slide: FirstLogStep = {
        description:
            "Splendide ! J’ai toutes les informations pour que ton expérience dans cette app se passe au mieux ! \nFonce découvrir ça en restant appuyé sur le bouton !",
        descriptionOut:
            "Attention ! Pour pouvoir accéder à l'application et l'ensemble de ses fonctionnalités, tu dois rester appuyé sur le bouton durant une seconde. \nEssaye pour voir !",
        picture: require("../../../assets/json/acces-robot/welldone.json"),
        picture2: require("../../../assets/json/acces-robot/splash.json"),
        page: "/(app)/(tabs)/index",
    };

    // --
    const [showWarningMessage, setShowWarningMessage] = useState(false);
    const [showFirstLottie] = useState(new Animated.Value(1));
    const [showSecondLottie] = useState(new Animated.Value(0));
    // ---
    const [messageContainerPosition] = useState(new Animated.Value(1));
    const [buttonContainerPosition] = useState(new Animated.Value(0));
    const zoomLottieRoket = useState(new Animated.Value(1))[0];
    const [ellipseContainerOpacity] = useState(new Animated.Value(1));
    const [whiteLayerOpacity] = useState(new Animated.Value(0));
    const [whiteLayerZindex] = useState(new Animated.Value(-10));

    const lottieViewRef = useRef();
    const lottieViewRef2 = useRef();

    const navigateTo = (): void => {
        void playSound();
        // Animation pour déplacer le messageContainer vers le haut
        Animated.timing(messageContainerPosition, {
            toValue: -300, // La valeur négative déplace le conteneur vers le haut
            duration: 700, // Durée de l'animation en millisecondes
            useNativeDriver: false, // Vous devez désactiver le pilote natif pour Animated.View
        }).start();
        Animated.timing(buttonContainerPosition, {
            toValue: 300, // La valeur négative déplace le conteneur vers le haut
            duration: 700, // Durée de l'animation en millisecondes
            useNativeDriver: false, // Vous devez désactiver le pilote natif pour Animated.View
        }).start();
        Animated.timing(zoomLottieRoket, {
            toValue: 2.2, // La valeur négative déplace le conteneur vers le haut
            duration: 1900, // Durée de l'animation en millisecondes
            useNativeDriver: false, // Vous devez désactiver le pilote natif pour Animated.View
        }).start();
        Animated.timing(ellipseContainerOpacity, {
            toValue: 0, // La valeur négative déplace le conteneur vers le haut
            duration: 700, // Durée de l'animation en millisecondes
            useNativeDriver: false, // Vous devez désactiver le pilote natif pour Animated.View
        }).start();

        setTimeout(() => {
            // Démarrez l'animation de la couche blanche
            Animated.timing(whiteLayerOpacity, {
                toValue: 1, // L'opacité maximale pour couvrir la page
                duration: 500, // Durée de l'animation en millisecondes
                useNativeDriver: false,
            }).start();
        }, 1200);
        Animated.timing(whiteLayerZindex, {
            toValue: 10, // L'opacité maximale pour couvrir la page
            duration: 1, // Durée de l'animation en millisecondes
            useNativeDriver: false,
        }).start();
        //! ! LOTTIE OPPACITY transitionTo
        Animated.timing(showFirstLottie, {
            toValue: 0, // L'opacité maximale pour couvrir la page
            duration: 200, // Durée de l'animation en millisecondes
            useNativeDriver: false,
        }).start();
        Animated.timing(showSecondLottie, {
            toValue: 1, // L'opacité maximale pour couvrir la page
            duration: 200, // Durée de l'animation en millisecondes
            useNativeDriver: false,
        }).start();
        // Démarrez un délai de 3 secondes pour changer d'écran
        setTimeout(() => {
            // TODO - Check if correct
            router.dismissAll()
            // navigation.reset({
            //     index: 0,
            //     routes: [{name: slide.page}],
            // });
        }, 1750);
        lottieViewRef2.current?.play();
    };
    // SOUND PLAYER
    const playSound = async (): Promise<void> => {
        try {
            const {sound} = await Audio.Sound.createAsync(
                require("../../../assets/sounds/FIRSTLOGJETPACK.mp3")
            );
            await sound.playAsync(); // Play the sound
        } catch (error) {
            console.error("Error playing sound:", error);
        }
    };
    const playSound2 = async (): Promise<void> => {
        try {
            const {sound} = await Audio.Sound.createAsync(
                require("../../../assets/sounds/HIHISUCCES.mp3")
            );
            await sound.playAsync(); // Play the sound
        } catch (error) {
            console.error("Error playing sound:", error);
        }
    };
    useEffect(() => {
        void playSound2();
    }, []);

    return (
        <>
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    {
                        backgroundColor: colorTheme?.isDark ?? false ? "black" : "white",
                        opacity: whiteLayerOpacity,
                        zIndex: whiteLayerZindex,
                    },
                ]}
            />
            <Svg style={styles.backgroundScreen}>
                <Defs>
                    <RadialGradient id="gradient" cx="50%" cy="60%">
                        <Stop offset="5%" stopColor={colorTheme?.isDark ?? false ? "#A2CCE1" : "#D4EDFF"}/>
                        <Stop offset="95%" stopColor={colorTheme?.isDark ?? false ? "#0856B3" : "#0D99FF"}/>
                    </RadialGradient>
                </Defs>
                <Rect x={0} y={0} width={width} height={height} fill="url(#gradient)"/>
            </Svg>
            <View style={styles.container}>
                <Animated.View
                    style={[
                        {
                            transform: [{translateY: messageContainerPosition}],
                            opacity: ellipseContainerOpacity,
                        },
                    ]}
                >
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
                            {showWarningMessage ? slide.descriptionOut : slide.description}
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.bottomBuble,
                            {borderBottomColor: colorTheme?.isDark ?? false ? colors.backgroundDark : "white"},
                        ]}
                    ></View>
                </Animated.View>
                {/* **************** */}
                <View style={[styles.robotContainer]}>
                    <Animated.View style={[styles.firstlottieContainer, {opacity: showFirstLottie}]}>
                        <LottieView
                            ref={lottieViewRef}
                            onLayout={() => {
                                lottieViewRef.current?.play();
                            }}
                            source={slide.picture}
                            autoPlay
                            style={styles.lottieImage}
                        />
                        <Animated.View
                            style={[styles.ellispe, {opacity: ellipseContainerOpacity}]}
                        ></Animated.View>
                    </Animated.View>

                    {/* **Second animation */}

                    <Animated.View style={[styles.secondlottieContainer, {opacity: showSecondLottie}]}>
                        <Animated.View style={{transform: [{scale: zoomLottieRoket}]}}>
                            <LottieView
                                ref={lottieViewRef2}
                                source={slide.picture2}
                                style={styles.lottieImage2}
                            />
                            <Animated.View
                                style={[styles.ellispe, styles.ellipse2, {opacity: ellipseContainerOpacity}]}
                            ></Animated.View>
                        </Animated.View>
                    </Animated.View>
                </View>
                <Animated.View
                    style={[
                        {
                            transform: [{translateY: buttonContainerPosition}],
                            opacity: ellipseContainerOpacity,
                        },
                    ]}
                >
                    <View style={styles.btnContainer}>
                        <ProgressButton
                            style={styles.button}
                            percentage={100}
                            navigateTo={() => {
                                navigateTo();
                            }}
                            timer={true}
                            onPressOut={() => {
                                setShowWarningMessage(true);
                            }}
                        />
                    </View>
                </Animated.View>
            </View>
        </>
    );
}
