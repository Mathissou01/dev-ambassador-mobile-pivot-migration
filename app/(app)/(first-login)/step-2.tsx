import React, {ReactNode, useContext, useEffect, useState} from "react";
import {Animated, Dimensions, KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import Svg, {Defs, RadialGradient, Rect, Stop} from "react-native-svg";
import {Audio} from "expo-av";
import LottieView from "lottie-react-native";
import {Text, View} from "@/components/Themed";
import ProgressButton from "@/components/Auth/FirstLogin/ProgressButton";
import LabelTemplate from "@/components/FormTemplate/LabelTemplate";
import InputTemplate from "@/components/FormTemplate/InputTemplate";
import {type FirstLogStep} from "@/types";
import {startShakeAnimation} from "@/utils/AnimationLib";
import {putAPI} from "@/hooks/API/requestsManager";
import {colors} from "@/config/styles/01-settings/_colors";
import {ThemeContext} from "@/hooks/useColorScheme";
import styles from "@/styles/auth/first-login/FirstLogStep2Style";
import {router} from "expo-router";

export default function Step2(): ReactNode {
    const colorTheme = useContext(ThemeContext);
    const {width, height} = Dimensions.get("screen");

    const [slide, setSlide] = useState<FirstLogStep>({
        description: "",
        picture: require("../../../assets/json/acces-robot/work.json"),
        page: "/(app)/(first-login)/step-3",
    });

    const placeholder = {
        passwordph: "e.g., ••••••",
        shirtph: "e.g., Taille M",
        portph: "e.g., DisplayPort",
    };

    function escapeRegExp(text: string): string {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }

    const passwordRegex =
        /^(?=.*[a-zàáâãäåæçèéêëìíîïñòóôõöùúûü])(?=.*[A-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜ])(?=.*\d)(?=.*[@#\$!%\*\?&_:;/\\\+=\-,\?€])[A-Za-zàáâãäåæçèéêëìíîïñòóôõöùúûüÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜ\d@#\$!%\*\?&_:;/\\\+=\-,\?€]{8,}$/;

    const [fields, setFields] = useState({
        newPassword: "",
        verifyPassword: "",
        showNewPassword: false,
        showVerifyPassword: false,
        newPasswordIsValid: true,
        verifyPasswordIsValid: true,
    });

    const [isTyping, setIsTyping] = useState(false);

    const switchPasswordVisibility = (field: "NewPassword" | "VerifyPassword"): void => {
        setFields((prevState) => ({
            ...prevState,
            [`show${field}`]: !prevState[`show${field}`],
        }));
    };

    const isFormValid = (): boolean => {
        const isPasswordValid = passwordRegex.test(fields.newPassword);
        const passwordsMatch = fields.newPassword === fields.verifyPassword;

        setFields((prevState) => ({
            ...prevState,
            newPasswordIsValid: isPasswordValid,
            verifyPasswordIsValid: isPasswordValid && passwordsMatch,
        }));

        return isPasswordValid && passwordsMatch;
    };

    const [shakeAnimation] = useState(new Animated.Value(0.0));

    useEffect(() => {
        const generateRegexDescription = (): string => {
            let description = "";

            if (!isTyping) {
                description =
                    "Commençons par modifier ce mot de passe peu sécurisé ! \nPromis, je ne regarde pas !";
            } else {
                if (!passwordRegex.test(fields.newPassword)) {
                    description =
                        "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre, un caractère spécial et 8 de longueur !";
                } else {
                    description =
                        "Excellent, tu as bien suivi mes conseils ! Maintentant, voyons si les deux mots de passe correspondent.";
                }

                if (
                    fields.newPassword === fields.verifyPassword &&
                    passwordRegex.test(fields.newPassword)
                ) {
                    description =
                        "J'ai l'impression que tu as créé un mot de passe surpuissant ! Passons à la suite si tu le veux bien.";
                }
            }

            return description;
        };

        const description = generateRegexDescription();
        setSlide({
            ...slide,
            description,
        });
    }, [fields.newPassword, isTyping]);

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
                    <RadialGradient id="gradient" cx="25%" cy="25%">
                        <Stop offset="5%" stopColor={colorTheme?.isDark ?? false ? "#A2CCE1" : "#D4EDFF"}/>
                        <Stop offset="100%" stopColor={colorTheme?.isDark ?? false ? "#0856B3" : "#0D99FF"}/>
                    </RadialGradient>
                </Defs>
                <Rect x={0} y={0} width={width} height={height} fill="url(#gradient)"/>
            </Svg>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView
                    style={styles.scrollableContainer}
                    alwaysBounceVertical={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.container}>
                        <View style={styles.topContainer}>
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
                                    {
                                        borderBottomColor:
                                            colorTheme?.isDark ?? false ? colors.backgroundDark : "white",
                                    },
                                ]}
                            ></View>
                            <View style={styles.lottieContainer}>
                                <LottieView source={slide.picture} autoPlay loop style={styles.lottieImage}/>

                                <View style={styles.ellispe}></View>
                            </View>
                        </View>
                        <Animated.View
                            style={[styles.passwordContainer, {transform: [{translateX: shakeAnimation}]}]}
                        >
                            <LabelTemplate name="Nouveau mot de passe" isDefault required/>
                            <InputTemplate
                                value={fields.newPassword}
                                placeholder={placeholder.passwordph}
                                onChangeText={(newPassword: string) => {
                                    setIsTyping(true);
                                    setFields({
                                        ...fields,
                                        newPassword: newPassword.trim(),
                                        newPasswordIsValid: passwordRegex.test(newPassword),
                                    });
                                }}
                                secureTextEntry={true}
                                showPassword={fields.showNewPassword}
                                switchPasswordVisibility={() => {
                                    switchPasswordVisibility("NewPassword");
                                }}
                                multiline={false}
                                regex={passwordRegex}
                                isVerify={fields.newPasswordIsValid}
                            />
                            <LabelTemplate name="Confirmation du mot de passe" isDefault required/>
                            <InputTemplate
                                value={fields.verifyPassword}
                                placeholder={placeholder.passwordph}
                                onChangeText={(verifyPassword: string) => {
                                    setFields({
                                        ...fields,
                                        verifyPassword: verifyPassword.trim(),
                                        verifyPasswordIsValid:
                                            passwordRegex.test(verifyPassword) && verifyPassword === fields.newPassword,
                                    });
                                }}
                                secureTextEntry={true}
                                showPassword={fields.showVerifyPassword}
                                switchPasswordVisibility={() => {
                                    switchPasswordVisibility("VerifyPassword");
                                }}
                                multiline={false}
                                regex={[passwordRegex, new RegExp("^" + escapeRegExp(fields.newPassword) + "$")]}
                                isVerify={fields.verifyPasswordIsValid}
                            />
                            <View style={styles.btnSpacer}></View>
                        </Animated.View>
                        <View style={styles.btnContainer}>
                            <ProgressButton
                                style={styles.button}
                                percentage={40}
                                navigateTo={() => {
                                    if (isFormValid()) {
                                        putAPI({
                                            objectType: "user-ambassador",
                                            options: "/update-password",
                                            dataToTransfert: {newPassword: fields.newPassword},
                                        })
                                            .then(() => {
                                                router.push(slide.page)
                                            })
                                            .catch((err) => {
                                                console.error("FirstLogStep2 error postAPI", err);
                                                setSlide({
                                                    ...slide,
                                                    description:
                                                        "Oh non ! Une erreur est survenue lors de l'enregistrement de ton nouveau mot de passe, réessaye dans quelques minutes.",
                                                });
                                                startShakeAnimation(shakeAnimation);
                                            });
                                    } else {
                                        void playSound();
                                        setSlide({
                                            ...slide,
                                            description:
                                                "Non, non et non ! Je ne peux absolument pas envisager de te laisser partir sans que tu changes ce mot de passe.",
                                        });
                                        startShakeAnimation(shakeAnimation);
                                    }
                                }}
                                timer={false}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
}
