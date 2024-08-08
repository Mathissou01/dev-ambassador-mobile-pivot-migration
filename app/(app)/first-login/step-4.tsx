import React, {ReactNode, useContext, useState} from "react";
import {Animated, Dimensions, ScrollView} from "react-native";
import Svg, {Defs, RadialGradient, Rect, Stop} from "react-native-svg";
import LottieView from "lottie-react-native";
import {Audio} from "expo-av";
import {Text, View} from "@/components/Themed";
import LabelTemplate from "@/components/FormTemplate/LabelTemplate";
import DropDownTemplate from "@/components/FormTemplate/DropDownTemplate";
import DateTimePickerTemplate from "@/components/FormTemplate/DateTimePickerTemplate";
import ProgressButton from "@/components/Auth/FirstLogin/ProgressButton";
import {type FirstLogStep} from "@/types";
import {startShakeAnimation} from "@/utils/AnimationLib";
import {putAPI} from "@/hooks/API/requestsManager";
import {useAppDispatch} from "@/hooks/store";
import {updateUserWithLocalStorage} from "@/redux/UserInfos/UserInfosSlice";
import {ThemeContext} from "@/hooks/useColorScheme";
import {colors} from "@/config/styles/01-settings/_colors";
import styles from "@/styles/auth/first-login/FirstLogStep4Style";
import {router} from "expo-router";

const genreList = [
    {value: 1, label: "Femme"},
    {value: 2, label: "Homme"},
    {value: 3, label: "Intersexe"},
];

const shirtList = [
    {value: "XS", label: "XS"},
    {value: "S", label: "S"},
    {value: "M", label: "M"},
    {value: "L", label: "L"},
    {value: "XL", label: "XL"},
    {value: "XXL", label: "XXL"},
];

// Dropdown properties
const placeholder = {
    genreph: "e.g., Homme",
    shirtph: "e.g., M",
};

export default function Step4(): ReactNode {
    const colorTheme = useContext(ThemeContext);
    const {width, height} = Dimensions.get("screen");
    const dispatch = useAppDispatch();

    const [slide, setSlide] = useState<FirstLogStep>({
        description:
            "Parfait ! Il me manques quelques informations sur toi. Peux-tu me les fournir s’il te plait ?",
        picture: require("../../../assets/json/acces-robot/work.json"),
        page: "/(app)/first-login/step-5",
    });

    const [shakeAnimation] = useState(new Animated.Value(0.0));

    const areSelected = (): boolean => {
        const testValueEmpty = (val: string | null | undefined): boolean =>
            val !== "" && val !== null && val !== undefined;
        setIsShirtSizeValid(testValueEmpty(shirtSizeSelected));
        setIsGenreValid(testValueEmpty(genreSelected));
        return testValueEmpty(genreSelected) && testValueEmpty(shirtSizeSelected);
    };

    // OPEN HANDLER
    const [isShirtSizeOpen, setIsShirtSizeOpen] = useState<boolean>(false);
    const [isGenreOpen, setIsGenreOpen] = useState<boolean>(false);
    const [shirtSizeSelected, setShirtSizeSelected] = useState<string | null>("");
    const [genreSelected, setGenreSelected] = useState<string | null>("");
    const [isGenreValid, setIsGenreValid] = useState<boolean>(true);
    const [isShirtSizeValid, setIsShirtSizeValid] = useState<boolean>(true);
    const [birthday, setBirthday] = useState<Date>(new Date("2000-01-01"));

    // SOUND PLAYER
    const playSound = async () => {
        try {
            const {sound} = await Audio.Sound.createAsync(
                require("../../../assets/sounds/HUMERROR.mp3")
            );
            await sound.playAsync();
        } catch (error) {
            console.error("Error playing sound:", error);
        }
    };

    return (
        <View style={{flex: 1}}>
            <Svg style={styles.backgroundScreen}>
                <Defs>
                    <RadialGradient id="gradient" cx="25%" cy="20%">
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
                                    borderBottomColor: colorTheme?.isDark ?? false ? colors.backgroundDark : "white",
                                },
                            ]}
                        ></View>
                        <View style={styles.lottieContainer}>
                            <LottieView source={slide.picture} autoPlay loop style={styles.lottieImage}/>
                            <View style={styles.ellispe}></View>
                        </View>
                    </View>
                    <Animated.View
                        style={[
                            styles.infoContainer,
                            {transform: [{translateX: shakeAnimation}], zIndex: 10},
                        ]}
                    >
                        <View style={{backgroundColor: "transparent", zIndex: 1}}>
                            <LabelTemplate name="Etat civil" isDefault required/>
                            <DropDownTemplate
                                modalTitle="Genre"
                                placeholder={placeholder.genreph}
                                open={isGenreOpen}
                                value={genreSelected}
                                items={genreList}
                                setOpen={setIsGenreOpen}
                                setValue={(newValue) => {
                                    setGenreSelected(newValue);
                                    setIsGenreValid(Boolean(newValue));
                                }}
                                isValid={isGenreValid}
                            />
                        </View>
                        <View
                            style={{
                                backgroundColor: "transparent",
                                width: "100%",
                            }}
                        >
                            <LabelTemplate name="Date de naissance" isDefault required/>
                            <DateTimePickerTemplate date={birthday} setDate={setBirthday}/>
                        </View>

                        <>
                            <LabelTemplate name="Taille de t-shirt" isDefault required/>
                            <DropDownTemplate
                                modalTitle="Taille de t-shirt"
                                placeholder={placeholder.shirtph}
                                open={isShirtSizeOpen}
                                value={shirtSizeSelected}
                                items={shirtList}
                                setOpen={setIsShirtSizeOpen}
                                setValue={(newValue) => {
                                    setShirtSizeSelected(newValue);
                                    setIsShirtSizeValid(Boolean(newValue));
                                }}
                                isValid={isShirtSizeValid}
                            />
                        </>
                    </Animated.View>
                    <View style={styles.btnContainer}>
                        <ProgressButton
                            style={styles.button}
                            percentage={80}
                            navigateTo={() => {
                                if (areSelected()) {
                                    const payload = {
                                        birthday,
                                        gender: genreSelected,
                                        tShirtSize: shirtSizeSelected,
                                        isValid: true,
                                    };
                                    putAPI({
                                        objectType: "user-ambassador",
                                        options: "/update-personal-infos",
                                        dataToTransfert: payload,
                                    })
                                        .then((resp) => {
                                            if (resp) {
                                                dispatch(
                                                    updateUserWithLocalStorage({
                                                        gender: parseInt(genreSelected ?? "0"),
                                                        tShirtSize: shirtSizeSelected,
                                                    })
                                                );
                                                router.navigate(slide.page);
                                            } else {
                                                setSlide({
                                                    ...slide,
                                                    description:
                                                        "Oh non ! Une erreur est survenue lors de l'enregistrement de ces informations, réessaye dans quelques minutes.",
                                                });
                                                startShakeAnimation(shakeAnimation); // Appel de la fonction ici en cas d'erreur
                                            }
                                        })
                                        .catch((err) => {
                                            console.error("FirstLogStep4 puAPI", err);
                                            setSlide({
                                                ...slide,
                                                description:
                                                    "Oh non ! Une erreur est survenue lors de l'enregistrement de ces informations, réessaye dans quelques minutes.",
                                            });
                                            startShakeAnimation(shakeAnimation); // Appel de la fonction ici en cas d'erreur
                                        });
                                } else {
                                    playSound();
                                    setSlide({
                                        ...slide,
                                        description:
                                            "Je ne peux pas te laisser partir ! Il me faut absolument ces denières informations !",
                                    });
                                    startShakeAnimation(shakeAnimation); // Appel de la fonction ici en cas d'erreur
                                }
                            }}
                            timer={false}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
