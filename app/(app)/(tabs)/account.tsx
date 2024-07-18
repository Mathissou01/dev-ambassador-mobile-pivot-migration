import React, {useContext, useEffect, useState} from "react";
import {Animated, Dimensions, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LinearGradient} from "expo-linear-gradient";
import {type MusicBackgroundProps, type UserState} from "@/types";
import {ScrollView, Text, View} from "@/components/Themed";
import WidgetInfo from "@/components/Account/WidgetInfo";
import StampWidget from "@/components/Account/StampWidget";
import ScotchBlock from "@/components/Account/EditCharacterBlock/ScotchBlock";
import {AuthorizedImages} from "@/components/AuthorizedImages";
import {InterogationPointIcon, MusicNoteIcon, PencilIcon} from "@/components/IconComponent";
import {useAppSelector} from "@/hooks/store";
import {ThemeContext} from "@/hooks/useColorScheme";
import {User} from "@/hooks/API/ObjectTypes/User";
import {startBlinkAnimation} from "@/utils/AnimationLib";
import {selectUserInfos} from "@/redux/UserInfos/UserInfosSlice";
import {colors} from "@/config/styles/01-settings/_colors";
import {type SvgProps} from "react-native-svg";
import Ailleurs from "@/components/SvgIllustration/BackgroundAvatar/Ailleurs";
import Scam from "@/components/SvgIllustration/BackgroundAvatar/Scam";
import Street from "@/components/SvgIllustration/BackgroundAvatar/Street";
import Vie from "@/components/SvgIllustration/BackgroundAvatar/Vie";
import Voyage from "@/components/SvgIllustration/BackgroundAvatar/Voyage";
import styles from "@/styles/tabs/AccountStyle";
import {router} from "expo-router";

const GetBackgroundComponent = ({
                                    tag,
                                    ...props
                                }: {
    tag: string;
} & MusicBackgroundProps &
    SvgProps): React.JSX.Element | null => {
    switch (tag) {
        case "voyage":
            return <Voyage {...props} />;
        case "vie":
            return <Vie {...props} />;
        case "street":
            return <Street {...props} />;
        case "scam":
            return <Scam {...props} />;
        case "ailleurs":
            return <Ailleurs {...props} />;
        default:
            return null;
    }
};

const loadAvatarImage = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem("avatarImage");
    } catch (error) {
        console.error("Failed to load avatar image:", error);
        return null;
    }
};

export default function Account(): React.JSX.Element {
    const navigateToEditCharacterScreen = (): void => {
        router.navigate("/(app)/(profil-settings)/character-edit");
    };
    const themeColor = useContext(ThemeContext);
    const userInfos: UserState = useAppSelector(selectUserInfos);

    const [avatarImage, setAvatarImage] = useState<string | null>(null);

    const screenWidth = Dimensions.get("window").width;
    const photoWidth = screenWidth * 0.7;
    const photoHeight = photoWidth * (3.5 / 3);
    const photoFrame = photoWidth * 0.9;

    useEffect(() => {
        void (async (): Promise<void> => {
            try {
                const storedAvatarImage = await loadAvatarImage();

                if (storedAvatarImage != null) {
                    setAvatarImage(storedAvatarImage);
                } else {
                    handleLocalImageLoadingError();
                }
            } catch (error) {
                handleLocalImageLoadingError();
                console.error("Failed to load or store avatar image:", error);
            }
        })();
    }, [userInfos]);

    const handleLocalImageLoadingError = (): void => {
        if (userInfos.email !== null) setAvatarImage(new User(userInfos).avatarUri);
    };

    const [hasAvatar] = useState<boolean>(true);
    const [blinkAnimation] = useState(new Animated.Value(0.4));

    const colorPalette = {
        mainColor: themeColor?.colors?.primaryDark,
        secondColor: themeColor?.colors?.primary,
        thirdColor: themeColor?.colors?.primaryLight,
        fourthColor: themeColor?.colors?.primaryExtraLight,
    };

    startBlinkAnimation(blinkAnimation, 0.4);

    return (
        <ScrollView
            style={styles.main_container}
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            lightColor={colors.backgroundDefault}
            darkColor={colors.backgroundDark}
        >
            <View style={styles.inScrollContainer}>
                <View
                    style={[
                        styles.scotch,
                        {
                            height: photoFrame * 0.15,
                            width: photoFrame * 0.85,
                            top: screenWidth * 0.03,
                        },
                    ]}
                >
                    <ScotchBlock/>
                </View>
                <View style={[styles.container_polaroid, {marginTop: screenWidth * 0.09}]}>
                    <View
                        lightColor={colors.white}
                        darkColor={colors.gray500}
                        style={[styles.polaroid, {width: photoWidth, height: photoHeight}]}
                    >
                        {/* Button avatar editor */}
                        <TouchableOpacity
                            style={[
                                styles.polaroidButton,
                                {
                                    top: -10,
                                    left: -10,
                                },
                            ]}
                            onPress={() => {
                                router.push('(app)/(profil-settings)/character-edit');
                                // navigation.navigate("CharacterEditScreen");
                            }}
                        >
                            <PencilIcon
                                size={18}
                                color={themeColor?.isDark ?? false ? colors.textDark : colors.textLight}
                            />
                        </TouchableOpacity>
                        {/* Button avatar editor */}
                        <TouchableOpacity
                            style={[
                                styles.polaroidButton,
                                {
                                    top: -10,
                                    right: -10,
                                },
                            ]}
                            onPress={() => {
                                router.push('(app)/(profil-settings)/music-edit');
                            }}
                        >
                            <MusicNoteIcon
                                size={18}
                                color={themeColor?.isDark ?? false ? colors.textDark : colors.textLight}
                            />
                        </TouchableOpacity>
                        {/* Button music */}
                        <View
                            style={[
                                styles.photoFrame,
                                {
                                    width: photoFrame,
                                    height: photoFrame,
                                    margin: screenWidth * 0.03,
                                },
                            ]}
                        >
                            {userInfos.music?.name ? (
                                <GetBackgroundComponent
                                    tag={userInfos.music?.name.toLowerCase()}
                                    mainColor={colorPalette.mainColor}
                                    secondColor={colorPalette.secondColor}
                                    thirdColor={colorPalette.thirdColor}
                                    fourthColor={colorPalette.fourthColor}
                                    height={"100%"}
                                    width={"100%"}
                                />
                            ) : (
                                <LinearGradient
                                    colors={[
                                        themeColor?.colors?.primaryLight ?? "#21a5ff",
                                        themeColor?.colors?.secondaryDark ?? "#0072bf",
                                    ]}
                                    style={styles.linearback}
                                    start={{x: 0, y: 0}}
                                    end={{x: 0.9, y: 0.9}}
                                />
                            )}
                            {avatarImage == null && hasAvatar ? (
                                <AuthorizedImages
                                    onError={handleLocalImageLoadingError}
                                    style={styles.avatarImage}
                                    source={{uri: avatarImage}}
                                />
                            ) : (
                                <TouchableOpacity
                                    onPress={navigateToEditCharacterScreen}
                                    style={[styles.blinkingContainer]}
                                >
                                    <Animated.View
                                        style={{
                                            opacity: blinkAnimation,
                                            position: "absolute",
                                            top: 20,
                                            left: screenWidth / 4,
                                            transform: [{translateX: -25}],
                                        }}
                                    >
                                        <InterogationPointIcon width={100} height={100} color="white"/>
                                    </Animated.View>
                                </TouchableOpacity>
                            )}
                        </View>
                        <Text style={[styles.textPolaroid]}>{userInfos?.avatar?.polarText ?? ""}</Text>
                        <View
                            style={[
                                styles.frame,
                                {borderColor: themeColor?.isDark === true ? colors.gray500 : colors.white},
                            ]}
                        />
                    </View>
                </View>
                <StampWidget
                    logo={userInfos?.school?.name ?? "ESCEN"}
                    schoolYear={userInfos.schoolYear ?? "1"}
                />
                <View
                    style={[
                        styles.widget_container,
                        {
                            marginTop: screenWidth * 0.25,
                            paddingVertical: screenWidth * 0.1,
                            marginLeft: 0,
                            marginRight: 0,
                        },
                    ]}
                    lightColor={colors.backgroundDefault}
                    darkColor={colors.backgroundDark}
                >
                    <WidgetInfo maxPoints={150} actualPoints={120}/>
                </View>
            </View>
        </ScrollView>
    );
}
