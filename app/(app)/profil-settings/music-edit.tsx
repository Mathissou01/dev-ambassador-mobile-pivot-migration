import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {Animated, Dimensions, Easing, StyleSheet, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import {View} from "@/components/Themed";
import Vie from "@/components/SvgIllustration/BackgroundAvatar/Vie";
import Voyage from "@/components/SvgIllustration/BackgroundAvatar/Voyage";
import Scam from "@/components/SvgIllustration/BackgroundAvatar/Scam";
import Street from "@/components/SvgIllustration/BackgroundAvatar/Street";
import Ailleurs from "@/components/SvgIllustration/BackgroundAvatar/Ailleurs";
import InfoModal from "@/components/InfoModal";
import {InfoIcon} from "@/components/IconComponent";
import {ThemeContext} from "@/hooks/useColorScheme";
import styles from "@/styles/profil-settings/MusicEditStyle";
import LottieView from "lottie-react-native";
import AudioController from "@/components/MusicEditScreen/AudioController";
import BottomCollapsedMenu from "@/components/MusicEditScreen/BottomCollapsedMenu";
import Vinyle from "@/components/MusicEditScreen/Vinyle";
import {useAppSelector} from "@/hooks/store";
import {selectUserInfos, selectUserMusic} from "@/redux/UserInfos/UserInfosSlice";
import {User, UserType} from "@/hooks/API/ObjectTypes/User";
import type {MusicBackgroundProps} from "@/types";
import {SvgProps} from "react-native-svg";

const loadAvatarImage = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem("avatarImage");
    } catch (error) {
        console.error("Failed to load avatar image:", error);
        return null;
    }
};

const modalInfos = {
    title: ["Informations"],
    subtitle: ["Utilisation", "Changement", "Pourquoi ?"],
    paragraphe: [
        ["La musique que vous choisissez change automatiquement votre fond d'écran et votre avatar."],
        [
            "Cette musique sera également celle qui sera jouée si vous êtes sur le podium Ambassador. Le podium est sélectionné et modifié par votre gérant du programme Ambassador selon son souhait.",
        ],
        [
            "Le choix de votre musique et de votre fond d'écran permet de personnaliser votre expérience et de refléter votre identité au sein du programme Ambassador.",
        ],
    ],
};

interface MusicComponent {
    component: React.FC<MusicBackgroundProps & SvgProps>;
    title: string;
    subtitle: string;
    theme: string;
    tag: string;
    music: string;
}

const componentsWithMusic: MusicComponent[] = [
    {
        component: Voyage,
        title: "Voyage",
        subtitle: "Angèle",
        theme: "Desireless",
        tag: "Summer Remix",
        music: require("@/assets/sounds/AvatarMusic/VOYAGE.mp3"),
    },
    {
        component: Vie,
        title: "VIE",
        subtitle: "OrelSan & Angèle",
        theme: "Bigflo et Oli",
        tag: "Electro Remix",
        music: require("@/assets/sounds/AvatarMusic/VIE.mp3"),
    },
    {
        component: Scam,
        title: "SCAM",
        subtitle: "Anthium",
        theme: "Ambassador",
        tag: "Tech House Remix",
        music: require("@/assets/sounds/AvatarMusic/SCAM.mp3"),
    },
    {
        component: Street,
        title: "STREET",
        subtitle: "Menace Santana",
        theme: "",
        tag: "Futur House Remix",
        music: require("@/assets/sounds/AvatarMusic/STREET.mp3"),
    },
    {
        component: Ailleurs,
        title: "AILLEURS",
        theme: "David Guetta Ft. Kid Cudi",
        subtitle: "Josman",
        tag: "Dance Remix",
        music: require("@/assets/sounds/AvatarMusic/AILLEURS.mp3"),
    },
    {
        component: Ailleurs,
        title: "AVOIR",
        theme: "Cats on Trees, Calogero",
        subtitle: "Cats on Trees, Calogero",
        tag: "Pop Remix",
        music: require("@/assets/sounds/AvatarMusic/AVOIR.mp3"),
    },
    {
        component: Ailleurs,
        title: "SUICIDE",
        theme: "Indochine",
        subtitle: "Hoshi",
        tag: "Emotional Remix",
        music: require("@/assets/sounds/AvatarMusic/SUICIDE.mp3"),
    },
];

export default function MusicEditScreen(): React.JSX.Element {
    // For Responsive
    const width = Dimensions.get("window").width;

    const accessToken = useAppSelector((state) => state.userInfos.accessToken);
    const colorTheme = useContext(ThemeContext);
    const avatarImage = new User(useAppSelector(selectUserInfos) as unknown as UserType).avatarUri;
    const rotation = useRef(new Animated.Value(0)).current;
    const [isToggleAnimating, setIsToggleAnimating] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const startTime = useRef(0);
    // Auto select user music
    const userMusic = useAppSelector(selectUserMusic);
    const selectedIndex = componentsWithMusic.findIndex(m => m.title === userMusic?.name);
    const [currentIndex, setCurrentIndex] = useState(selectedIndex ?? 0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [opacity] = useState(componentsWithMusic.map(() => new Animated.Value(0)));
    const [viewYPosition] = useState(new Animated.Value(0));
    const vynilPlayerRef = useRef<LottieView>(null);
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            Animated.timing(opacity[currentIndex], {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();

            componentsWithMusic.forEach((_, index) => {
                if (index !== currentIndex) {
                    Animated.timing(opacity[index], {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }).start();
                }
            });
        }, 800);
    }, [currentIndex]);

    const toggleView = (isNext?: boolean, index?: number): void => {
        if (index !== currentIndex) {
            setIsToggleAnimating(true);
            vynilPlayerRef.current?.play();
            setIsPlaying(false);

            if (typeof index !== "undefined") {
                setCurrentIndex(index);
                setTimeout(() => {
                    vynilPlayerRef.current?.play();
                    setIsToggleAnimating(false);
                    setIsPlaying(true);
                }, 1700);
            } else if (typeof isNext !== "undefined") {
                setCurrentIndex((prevIndex) =>
                    isNext
                        ? (prevIndex + 1) % componentsWithMusic.length
                        : (prevIndex - 1 + componentsWithMusic.length) % componentsWithMusic.length
                );
            }
            setTimeout(() => {
                Animated.sequence([
                    Animated.timing(viewYPosition, {toValue: -20, duration: 150, useNativeDriver: true}),
                    Animated.timing(viewYPosition, {toValue: 300, duration: 400, useNativeDriver: true}),
                    Animated.timing(viewYPosition, {toValue: 600, duration: 200, useNativeDriver: true}),
                ]).start();
            }, 300);
            setTimeout(() => {
                Animated.sequence([
                    Animated.timing(viewYPosition, {toValue: -1000, duration: 0, useNativeDriver: true}),
                    Animated.timing(viewYPosition, {toValue: 0, duration: 800, useNativeDriver: true}),
                ]).start(() => {
                    setIsToggleAnimating(false);
                });
            }, 1400);
        }
    };

    const rotateVinyle = (): void => {
        if (isPlaying) {
            const currentTime = Date.now();
            const duration = startTime.current > 0 ? currentTime - startTime.current : 4000;
            Animated.timing(rotation, {
                toValue: 1,
                duration,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start(({finished}) => {
                if (finished) {
                    rotation.setValue(0);
                    rotateVinyle();
                }
            });
            startTime.current = currentTime;
        } else {
            rotation.stopAnimation();
        }
    };

    useEffect(() => {
        rotateVinyle();
    }, [isPlaying]);

    const rotateInterpolated = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    const handlePlayPause = (): void => {
        setIsPlaying(!isPlaying);
    };

    const colorPalette = {
        mainColor: colorTheme?.colors?.primaryDark,
        secondColor: colorTheme?.colors?.primary,
        thirdColor: colorTheme?.colors?.primaryLight,
        fourthColor: colorTheme?.colors?.primaryExtraLight,
    };

    // Modal Infos

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {
                        setIsModalOpen(true);
                    }}
                >
                    <InfoIcon size={24} color={colorTheme?.isDark ?? false ? "white" : "black"}/>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <SafeAreaView edges={["left", "right"]} style={styles.container}>
            <InfoModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                title={modalInfos.title}
                subtitle={modalInfos.subtitle}
                paragraphe={modalInfos.paragraphe}
            />
            <View style={[styles.artistContainer, {backgroundColor: colorTheme?.colors?.primary}]}>
                {componentsWithMusic.map(({component: Component, music}, index) => (
                    <Animated.View
                        key={index}
                        style={[StyleSheet.absoluteFillObject, {opacity: opacity[index]}]}
                    >
                        <Component
                            mainColor={colorPalette.mainColor}
                            secondColor={colorPalette.secondColor}
                            thirdColor={colorPalette.thirdColor}
                            fourthColor={colorPalette.fourthColor}
                            style={styles.backgroundStyle}
                        />
                    </Animated.View>
                ))}
                <View style={styles.overlay}>
                    <View style={styles.gestureVynilContainer}>
                        <Animated.View style={{transform: [{translateY: viewYPosition}]}}>
                            <Animated.View style={{transform: [{rotate: rotateInterpolated}]}}>
                                <Vinyle centerImage={{
                                    uri: avatarImage!,
                                    headers: {
                                        Authorization: `Ambassador ${accessToken}`,
                                    }
                                }} dimension={width > 670 ? 250 : width > 600 ? 200 : 180}/>
                            </Animated.View>
                        </Animated.View>
                    </View>
                    <View style={styles.vynilAnimationContainer}>
                        <LottieView
                            source={require("@/assets/json/avatar/vynil_animation.json")}
                            style={styles.lottieVynilAnimation}
                            loop={false}
                            ref={vynilPlayerRef}
                            colorFilters={[{keypath: "Shape Layer 1", color: "black"}]}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.playerContainer}>
                <AudioController
                    mp3File={componentsWithMusic[currentIndex].music}
                    musicTitle={componentsWithMusic[currentIndex].title}
                    musicSubtitle={componentsWithMusic[currentIndex].subtitle}
                    musicTheme={componentsWithMusic[currentIndex].theme}
                    musicTag={componentsWithMusic[currentIndex].tag}
                    onPlayPause={handlePlayPause}
                    onNext={() => {
                        toggleView(true);
                    }}
                    onPrevious={() => {
                        toggleView(false);
                    }}
                    isToggleAnimating={isToggleAnimating}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                />
                <BottomCollapsedMenu
                    componentsWithMusic={componentsWithMusic}
                    toggleView={toggleView}
                    isToggleAnimating={isToggleAnimating}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    currentIndex={currentIndex}
                />
            </View>
        </SafeAreaView>
    );
}
