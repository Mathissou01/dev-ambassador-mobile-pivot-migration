import React, {ReactNode, useContext, useState} from "react";
import {Animated, Dimensions, ScrollView, TouchableOpacity} from "react-native";
import Svg, {Defs, RadialGradient, Rect, Stop} from "react-native-svg";
import LottieView from "lottie-react-native";
import {Audio} from "expo-av";
import {useSelector} from "react-redux";
import {Text, View} from "@/components/Themed";
import ProgressButton from "@/components/Auth/FirstLogin/ProgressButton";
import {type FirstLogStep, type UserState} from "@/types";
import {startShakeAnimation} from "@/utils/AnimationLib";

import Hdmi from "@/components/SvgIllustration/Hdmi";
import Vga from "@/components/SvgIllustration/Vga";
import TypeC from "@/components/SvgIllustration/TypeC";

import {putAPI} from "@/hooks/API/requestsManager";
import {useAppDispatch} from "@/hooks/store";
import {updateUserWithLocalStorage} from "@/redux/UserInfos/UserInfosSlice";
import {ThemeContext} from "@/hooks/useColorScheme";
import {colors} from "@/config/styles/01-settings/_colors";
import styles from "@/styles/auth/first-login/FirstLogStep3Style";
import {router} from "expo-router";

export default function Step3(): ReactNode {
    const colorTheme = useContext(ThemeContext);
    const {width, height} = Dimensions.get("screen");

    const userInfos: UserState = useSelector((state: any) => state.userInfos);
    const dispatch = useAppDispatch();

    const [slide, setSlide] = useState<FirstLogStep>({
        description:
            "Ça y est " +
            userInfos.firstname +
            ", tu n’es plus une simple variable à mes yeux. Maintenant, pour des soucis d’organisation, j’aurais besoin de savoir de quels ports dispose ton ordinateur ?",
        picture: require("../../../assets/json/acces-robot/cable.json"),
        page: "/(app)/(first-login)/step-4",
    });

    const [shakeAnimation] = useState(new Animated.Value(0.0));
    const [selectedButton, setSelectedButton] = useState({
        hdmi: false,
        vga: false,
        typeC: false,
    });

    const portColor = "#808080";
    const handleHdmiPress = (): void => {
        setSelectedButton({...selectedButton, hdmi: !selectedButton.hdmi});
    };

    const handleVgaPress = (): void => {
        setSelectedButton({...selectedButton, vga: !selectedButton.vga});
    };

    const handleTypeCPress = (): void => {
        setSelectedButton({...selectedButton, typeC: !selectedButton.typeC});
    };
    // SOUND PLAYER
    const playSound = async (): Promise<void> => {
        try {
            const {sound} = await Audio.Sound.createAsync(
                require("../../../assets/sounds/HUMERROR.mp3")
            );
            await sound.playAsync(); // Play the sound
        } catch (error) {
            console.error("Error playing sound:", error);
        }
    };

    return (
        <>
            <Svg style={styles.backgroundScreen}>
                <Defs>
                    <RadialGradient id="gradient" cx="50%" cy="43%">
                        <Stop offset="5%" stopColor={colorTheme?.isDark ?? false ? "#A2CCE1" : "#D4EDFF"}/>
                        <Stop offset="100%" stopColor={colorTheme?.isDark ?? false ? "#0856B3" : "#0D99FF"}/>
                    </RadialGradient>
                </Defs>
                <Rect x={0} y={0} width={width} height={height} fill="url(#gradient)"/>
            </Svg>
            <ScrollView
                style={styles.scrollableContainer}
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={[styles.container]}>
                    <Animated.View
                        style={[
                            styles.messageContainer,
                            {
                                backgroundColor: colorTheme?.isDark ?? false ? colors.backgroundDark : "white",
                                borderColor: colorTheme?.isDark ?? false ? colors.backgroundDark : "#DCDCDC",
                            },
                            {transform: [{translateX: shakeAnimation}]},
                        ]}
                    >
                        <Text style={styles.description}>{slide.description}</Text>
                    </Animated.View>
                    <Animated.View
                        style={[
                            styles.bottomBuble,
                            {borderBottomColor: colorTheme?.isDark ?? false ? colors.backgroundDark : "white"},
                            {
                                transform: [{translateX: shakeAnimation}, {rotate: "180deg"}],
                            },
                        ]}
                    ></Animated.View>
                    <View style={styles.lottieContainer}>
                        <LottieView source={slide.picture} autoPlay loop style={styles.lottieImage}/>

                        <View style={styles.ellispe}></View>
                    </View>
                    <View style={styles.portContainer}>
                        <TouchableOpacity
                            style={[
                                styles.logo,
                                {
                                    borderColor: colorTheme?.isDark ?? false ? colors.gray800 : "white",
                                    backgroundColor: colorTheme?.isDark ?? false ? "#0000005f" : "#ffffff5f",
                                },
                                selectedButton.hdmi && {
                                    backgroundColor: colorTheme?.isDark ?? false ? colors.black : "white",
                                },
                            ]}
                            onPress={handleHdmiPress}
                        >
                            <Hdmi isActive={selectedButton.hdmi} portColor={portColor}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.logo,
                                {
                                    borderColor: colorTheme?.isDark ?? false ? colors.gray800 : "white",
                                    backgroundColor: colorTheme?.isDark ?? false ? "#0000005f" : "#ffffff5f",
                                },
                                selectedButton.vga && {
                                    backgroundColor: colorTheme?.isDark ?? false ? colors.black : "white",
                                },
                            ]}
                            onPress={handleVgaPress}
                        >
                            <Vga isActive={selectedButton.vga} portColor={portColor}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.logo,
                                {
                                    borderColor: colorTheme?.isDark ?? false ? colors.gray800 : "white",
                                    backgroundColor: colorTheme?.isDark ?? false ? "#0000005f" : "#ffffff5f",
                                },
                                selectedButton.typeC && {
                                    backgroundColor: colorTheme?.isDark ?? false ? colors.black : "white",
                                },
                            ]}
                            onPress={handleTypeCPress}
                        >
                            <TypeC isActive={selectedButton.typeC} portColor={portColor}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnContainer}>
                        <ProgressButton
                            style={styles.button}
                            percentage={60}
                            navigateTo={() => {
                                if (Object.values(selectedButton).filter((val: boolean) => val).length > 0) {
                                    const portSelected = Object.entries(selectedButton)
                                        .filter(([key, isSelected], index) => isSelected)
                                        .map(([key, val]: [key: string, val: boolean]) => key);
                                    putAPI({
                                        objectType: "user-ambassador",
                                        options: "/update-ports",
                                        dataToTransfert: {computerPorts: portSelected},
                                    })
                                        .then((res) => {
                                            if (res) {
                                                dispatch(updateUserWithLocalStorage({computerPorts: portSelected}));
                                                router.navigate(slide.page);
                                            } else {
                                                setSlide({
                                                    ...slide,
                                                    description:
                                                        "Oh non ! Une erreur est survenue lors de l'enregistrement des ports de ton ordinateur, réessaye dans quelques minutes.",
                                                });
                                            }
                                        })
                                        .catch((err: string) => {
                                            console.error(err);
                                            setSlide({
                                                ...slide,
                                                description:
                                                    "Ohhhh nooooooonnnn ! Une erreur est survenue lors de l'enregistrement des ports de ton ordinateur, réessaye dans quelques minutes.",
                                            });
                                        });
                                } else {
                                    void playSound();
                                    setSlide({
                                        ...slide,
                                        description:
                                            "Hop hop hop ! J'ai besoin de cette information avant que tu partes, peux-tu choisir au moins un des câbles ? Sinon, je ne te laisserai pas passer.",
                                    });
                                    startShakeAnimation(shakeAnimation);
                                    // Déclenche l'effet de secousse
                                }
                            }}
                            timer={false}
                        />
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
