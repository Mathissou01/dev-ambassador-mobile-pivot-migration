import React, {ReactNode, Suspense, useContext, useRef, useState} from "react";
import {Alert, Platform, TextInput, TouchableOpacity} from "react-native";
import {ScrollView, View} from "@/components/Themed";
import {Audio} from "expo-av";
// 3D Three
import {Canvas, useFrame} from "@react-three/fiber/native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
// Storage
import AsyncStorage from "@react-native-async-storage/async-storage";
import {captureRef} from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import Hair from "@/components/Account/EditCharacterBlock/CharacterPart/Hair";
import Glass from "@/components/Account/EditCharacterBlock/CharacterPart/Glass";
import Eyebrows from "@/components/Account/EditCharacterBlock/CharacterPart/Eyebrows";
// Head parts link together
import Head from "@/components/Account/EditCharacterBlock/CharacterPart/Head";
import Teeth from "@/components/Account/EditCharacterBlock/CharacterPart/Teeth";
import Tongue from "@/components/Account/EditCharacterBlock/CharacterPart/Tongue";
// Rest of body part
import Neck from "@/components/Account/EditCharacterBlock/CharacterPart/Neck";
import Noose from "@/components/Account/EditCharacterBlock/CharacterPart/Noose";
import Clothe from "@/components/Account/EditCharacterBlock/CharacterPart/Clothe";
import Eye from "@/components/Account/EditCharacterBlock/CharacterPart/Eye";
import Ear from "@/components/Account/EditCharacterBlock/CharacterPart/Ear";
import Necklace from "@/components/Account/EditCharacterBlock/CharacterPart/Necklace";
import Earings from "@/components/Account/EditCharacterBlock/CharacterPart/Earings";
// Animated + Sensor
import SliderHair from "@/components/Account/EditCharacterBlock/Slider/SliderHair";
import SliderHead from "@/components/Account/EditCharacterBlock/Slider/SliderHead";
import SliderEyebrows from "@/components/Account/EditCharacterBlock/Slider/SliderEyebrows";
import SliderEarings from "@/components/Account/EditCharacterBlock/Slider/SliderEarings";
import SliderGlass from "@/components/Account/EditCharacterBlock/Slider/SliderGlass";
import SliderNecklace from "@/components/Account/EditCharacterBlock/Slider/SliderNecklace";
import SliderClothe from "@/components/Account/EditCharacterBlock/Slider/SliderClothe";
import SliderSkin from "@/components/Account/EditCharacterBlock/Slider/SliderSkin";
import Background from "@/components/SvgIllustration/Background";
// Slider selector
import Selector from "@/components/Account/EditCharacterBlock/Selector";
// External media saving library
import {useAppDispatch, useAppSelector} from "@/hooks/store";
import CustomGroup from "@/components/Account/EditCharacterBlock/CustomGroup";
import ValidationModal from "@/components/ValidationModal";
import {ThemeContext} from "@/hooks/useColorScheme";
import {setAvatarImageChanged, updateUserWithLocalStorage,} from "@/redux/UserInfos/UserInfosSlice";
import {putAPI} from "@/hooks/API/requestsManager";
import {type UserState} from "@/types";
import {type resourceMappingClothe} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingClothe";
import {type resourceMappingHair} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingHair";
import {type resourceMappingHead} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingHead";
import {
    type resourceMappingEyebrows
} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingEyebrows";
import {
    type resourceMappingEarings
} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingEarings";
import {type resourceMappingGlass} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingGlass";
import {
    type resourceMappingNecklace
} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingNecklace";
import {type resourceMappingEye} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingEye";
import {type resourceMappingEar} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingEar";
import {type resourceMappingNoose} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingNoose";
import {type resourceMappingNeck} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingNeck";
import {type resourceMappingTongue} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingTongue";
import {type resourceMappingTeeth} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingTeeth";
import {type THREE} from "expo-three";
import LoaderApi from "@/components/LoaderApi";
import {Avatar} from "@/hooks/API/ObjectTypes/Avatar";
import {type resourceMappingSkin} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingSkin";
import {colors} from "@/config/styles/01-settings/_colors";
import styles from "@/styles/profil-settings/CharacterEditStyle";
import {CameraIcon, CheckIcon, SaveIcon, TextIcon} from "@/components/IconComponent";
import {SpotLight} from "three";

interface SchoolColors {
    mainColor: string;
    secondColor: string;
    thirdColor: string;
}

export default function CharacterEdit(): ReactNode {
    // LOADIND STATE PARTS
    const [isClotheLoading, setIsClotheLoading] = useState(true);
    const [isHairLoading, setIsHairLoading] = useState(true);
    const [isGlassLoading, setIsGlassLoading] = useState(true);
    const [isNeckLoading, setIsNeckLoading] = useState(false);
    const [isEyeLoading, setIsEyeLoading] = useState(true);
    const [isEyebrowsLoading, setIsEyebrowsLoading] = useState(true);
    const [isNecklaceLoading, setIsNecklaceLoading] = useState(true);
    const [isEarringsLoading, setIsEarringsLoading] = useState(true);
    const [isTongueLoading, setIsTongueLoading] = useState(true);
    const [isTeethLoading, setIsTeethLoading] = useState(true);
    const [isEarLoading, setIsEarLoading] = useState(true);
    const [isHeadLoading, setIsHeadLoading] = useState(true);
    const [isNooseLoading, setIsNooseLoading] = useState(true);
    // Créez un tableau des états de chargement
    const loadingStates = [
        isClotheLoading,
        isHairLoading,
        isGlassLoading,
        isNeckLoading,
        isEyeLoading,
        isEyebrowsLoading,
        isNecklaceLoading,
        isEarringsLoading,
        isTongueLoading,
        isTeethLoading,
        isEarLoading,
        isHeadLoading,
        isNooseLoading,
    ];

    // Vérifiez si tous les états de chargement sont false
    const areAllObjectsLoaded = loadingStates.every((state) => !state);

    // Saving properties
    const glViewRef = useRef(null);
    const groupRef = useRef<THREE.Group | null>(null);
    const [gyroscopeActive, setGyroscopeActive] = useState(true);
    // Color background properties
    const userInfos: UserState = useAppSelector((state) => state.userInfos);
    const dispatch = useAppDispatch();
    const themeContext = useContext(ThemeContext);

    const backgroundColors = {
        WebTechColor: {
            mainColor: themeContext?.colors.primary ?? "#c60d0d",
            secondColor: themeContext?.colors.secondary ?? "#9e0a0a",
            thirdColor: themeContext?.colors.secondary ?? "#ee1010",
        },
        AtlasColor: {
            mainColor: themeContext?.colors.primary ?? "#382f2b",
            secondColor: themeContext?.colors.secondary ?? "#9e0a0a",
            thirdColor: themeContext?.colors.secondary ?? "#ee1010",
        },
        MagnumColor: {
            mainColor: themeContext?.colors.primary ?? "#a79487",
            secondColor: themeContext?.colors.secondary ?? "#800080",
            thirdColor: themeContext?.colors.secondary ?? "#800080",
        },
        BachelorColor: {
            mainColor: themeContext?.colors.primary ?? "#00b7ab",
            secondColor: themeContext?.colors.secondary ?? "#f29100",
            thirdColor: themeContext?.colors.secondary ?? "#1affee",
        },
        EscenColor: {
            mainColor: themeContext?.colors.primary ?? "#a00258",
            secondColor: themeContext?.colors.secondary ?? "#9e0a0a",
            thirdColor: themeContext?.colors.secondary ?? "#ee1010",
        },
    };
    // prettier-ignore
    const ColorToDisplay: Record<string, SchoolColors> = {
        "WebTech Institute": backgroundColors.WebTechColor,
        "ATLAS Institute": backgroundColors.AtlasColor,
        "Magnum Institute": backgroundColors.MagnumColor,
        "Bachelor Institute": backgroundColors.BachelorColor,
        ESCEN: backgroundColors.EscenColor
    };
    // Saving avatar storage
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [confirmFunction, setConfirmFunction] = useState("");
    const handleConfirmFunction = (functionName: string): void => {
        if (functionName === "handleConfirm") {
            void handleConfirm();
        } else if (functionName === "handleConfirm2") {
            void handleConfirm2();
        }
    };

    const handleSaveAvatar = async (): Promise<void> => {
        setMessage("Confirmes-tu l'enregistrement ?");
        setConfirmFunction("handleConfirm");
        setShowModal(true);
    };
    const handleSavePicture = async (): Promise<void> => {
        setMessage("Sauvegarder ton avatar dans ta galerie ?");
        setConfirmFunction("handleConfirm2");
        setShowModal(true);
    };

    // Function flash appareil photo
    function FlashLight({intensity, onAnimationEnd}) {
        const spotLightRef = useRef<SpotLight>();

        useFrame(() => {
            if (intensity > 0) {
                const newIntensity = Math.max(0, intensity - 0.01); // Réduire l'intensité progressivement
                spotLightRef.current.intensity = newIntensity;
            } else {
                onAnimationEnd();
            }
        });

        return (
            <spotLight
                ref={spotLightRef}
                position={[5, 5, 10]} // Position de la lumière
                angle={Math.PI / 4} // Angle d'ouverture du cône de lumière
                intensity={intensity} // Intensité de la lumière (Changer intensité lors du flash)
                distance={80} // Portée de la lumière
                decay={0.5} // Atténuation de la lumière
            />
        );
    }

    // SOUND PLAYER
    const playSoundCamera = async (): Promise<void> => {
        try {
            const {sound} = await Audio.Sound.createAsync(require("../../assets/sounds/CAMERA.mp3"));
            await sound.playAsync(); // Play the sound
        } catch (error) {
            console.error("Error playing sound:", error);
        }
    };

    const [flashIntensity, setFlashIntensity] = useState(0);
    const flashCamera = (): void => {
        setFlashIntensity(3); // Démarrez le flash en augmentant l'intensité
        void playSoundCamera();
    };
    // Enregistrement avatar API et Asynch storage
    const handleConfirm = async () => {
        if (glViewRef.current) {
            // Réinitialiser la rotation du CustomGroup à zéro lors de la sauvegarde
            if (groupRef.current) {
                setGyroscopeActive(false); // Désactiver le gyroscope
                groupRef.current.rotation.set(0, 0, 0);
                setTimeout(() => {
                    setGyroscopeActive(true); // Réactiver le gyroscope après 3 secondes
                }, 3000);
            }
            flashCamera();
            // Réinitialiser l'intensité du flash après le flash
            await new Promise<void>((resolve) =>
                setTimeout(() => {
                    setFlashIntensity(0);
                    resolve();
                }, 300)
            );
            // Ajoutez une temporisation de 1 seconde (1000 millisecondes)
            // Effectuer le flash de l'appareil photo
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // API
            captureRef(glViewRef, {
                format: "png",
                quality: 1.0,
                result: "base64",
            })
                .then((data) => {
                    // expected pattern 'width:height|', example: '1080:1731|'
                    const resolution = /^(\d+):(\d+)\|/g.exec(data);
                    const base64 = data.substring((resolution || [""])[0].length || 0);
                    const newAvatar = new Avatar({
                        user: userInfos._id,
                        name: "avatar_" + userInfos.firstname + "_" + userInfos.lastname,
                        image: base64,
                    });
                    void newAvatar.save().then((resp) => {
                        console.log("resp save", resp);
                    });
                })
                .catch((err) => {
                    console.error(err);
                });

            // Async storage
            const snapshot = await captureRef(glViewRef, {
                format: "png",
                quality: 1.0,
            });
            try {
                await AsyncStorage.setItem("avatarImage", snapshot);
                const newAvatar = {avatar: generateObjectFromValues()};
                dispatch(setAvatarImageChanged());
                // SAVE TO BdD
                putAPI({
                    objectType: "user-ambassador",
                    dataToTransfert: newAvatar,
                    options: "/update-avatar",
                }).then((resp) => {
                    if (resp) {
                        dispatch(updateUserWithLocalStorage(newAvatar));
                    } else {
                        Alert.alert(
                            "Erreur d'enregistrement",
                            "Une erreur est survenue lors de l'enregistrement des nouvelles informations, veuillez réessayer dans quelques instants."
                        );
                    }
                });

                // LOGGING
                console.log("Avatar image saved successfully.");
            } catch (error) {
                console.error("Failed to save avatar image:", error);
            }
        }
        // Fermez le modal
        setShowModal(false);
    };
    const handleConfirm2 = async (): Promise<void> => {
        // Exécutez la confirmation ici
        // Par exemple, enregistrez l'avatar
        if (glViewRef.current) {
            // Réinitialiser la rotation du CustomGroup à zéro lors de la sauvegarde
            if (groupRef.current) {
                setGyroscopeActive(false); // Désactiver le gyroscope
                groupRef.current.rotation.set(0, 0, 0);
                setTimeout(() => {
                    setGyroscopeActive(true); // Réactiver le gyroscope après 3 secondes
                }, 3000);
            }
            try {
                // Ajoutez une temporisation de 1 seconde (1000 millisecondes) ici
                await new Promise((resolve) => setTimeout(resolve, 1000));
                const snapshot = await captureRef(glViewRef, {
                    format: "png",
                    quality: 1.0,
                    fileName: "Avatar_" + userInfos.firstname + "_" + userInfos.lastname,
                });

                const {status} = await MediaLibrary.requestPermissionsAsync();
                if (status === "granted") {
                    const asset = await MediaLibrary.createAssetAsync(snapshot);

                    // Utiliser la propriété uri comme chemin local du fichier
                    const localUri = asset.uri || "";

                    await MediaLibrary.saveToLibraryAsync(localUri);
                    console.log("Capture d'écran enregistrée avec succès dans la galerie.");
                } else {
                    console.log("Permission refusée pour accéder à la galerie.");
                }
            } catch (error) {
                console.log("Erreur lors de l'enregistrement de la capture d'écran :", error);
            }
        }
        // Fermez le modal
        setShowModal(false);
    };

    const handleCancel = (): void => {
        // Annulez l'action et fermez le modal
        setShowModal(false);
    };
    // ----------------------------------------

    // -------- GENERATE OBJECT FROM STATE -------- //
    const generateObjectFromValues = () => {
        return {
            hair: selectedItem,
            head: selectedItem2,
            tongue: selectedTongue,
            teeth: selectedTeeth,
            eyebrows: selectedItem3,
            earings: selectedItem4,
            glass: selectedItem5,
            necklace: selectedItem6,
            clothe: selectedItem7,
            skin: selectedItem12,
            polarText: num,
        };
    };

    // PUT API DATA
    // Dynamic Object
    const [selectedItem, setSelectedItem] = useState<keyof typeof resourceMappingHair>(
        userInfos?.avatar?.hair ?? "hair1"
    );
    const [selectedItem2, setSelectedItem2] = useState<keyof typeof resourceMappingHead>(
        userInfos?.avatar?.head ?? "head1"
    );
    const [selectedItem3, setSelectedItem3] = useState<keyof typeof resourceMappingEyebrows>(
        userInfos?.avatar?.eyebrows ?? "eyebrows1"
    );
    const [selectedItem4, setSelectedItem4] = useState<keyof typeof resourceMappingEarings>(
        userInfos?.avatar?.earings ?? "earings1"
    );
    const [selectedItem5, setSelectedItem5] = useState<keyof typeof resourceMappingGlass>(
        userInfos?.avatar?.glass ?? "glass1"
    );
    const [selectedItem6, setSelectedItem6] = useState<keyof typeof resourceMappingNecklace>(
        userInfos?.avatar?.necklace ?? "necklace1"
    );
    const [selectedItem7, setSelectedItem7] = useState<keyof typeof resourceMappingClothe>(
        userInfos?.avatar?.clothe ?? "clothe5"
    );
    const [selectedItem12, setSelectedItem12] = useState<keyof typeof resourceMappingSkin>(
        userInfos?.avatar?.skin ?? "skin1"
    );
    // Static Object
    const [selectedItem8] = useState<keyof typeof resourceMappingEye>("eye1");
    const [selectedItem9] = useState<keyof typeof resourceMappingEar>("ear1");
    const [selectedItem10] = useState<keyof typeof resourceMappingNoose>("noose1");
    const [selectedItem11] = useState<keyof typeof resourceMappingNeck>("neck1");
    // Head object setting
    const [selectedTongue, setSelectedTongue] = useState<keyof typeof resourceMappingTongue>(
        userInfos?.avatar?.tongue ?? "tongue1"
    );
    const [selectedTeeth, setSelectedTeeth] = useState<keyof typeof resourceMappingTeeth>(
        userInfos?.avatar?.teeth ?? "teeth1"
    );
    // Properties Slider
    const handleSelect = (item: keyof typeof resourceMappingHair): void => {
        setSelectedItem(item);
    };
    const handleSelect2 = (item: keyof typeof resourceMappingHead) => {
        setSelectedItem2(item);
        // Logique pour sélectionner la "tongue" en fonction de "head" sélectionné.
        setSelectedTongue("tongue1");

        switch (item) {
            case "head1":
                setSelectedTeeth("teeth1");
                break;
            case "head2":
                break;
            case "head3":
                setSelectedTeeth("teeth3");
                break;
            case "head4":
                setSelectedTeeth("teeth4");
                break;
            case "head5":
                setSelectedTongue("tongue1");
                setSelectedTeeth("teeth5");
                break;
            case "head6":
                break;
            case "head7":
                setSelectedTeeth("teeth7");
                break;
            case "head8":
                setSelectedTongue("tongue8");
                setSelectedTeeth("teeth8");
                break;
            case "head9":
                setSelectedTeeth("teeth2");
                break;
            case "head10":
                setSelectedTongue("tongue1");
                setSelectedTeeth("teeth8");
                break;
            case "head11":
                setSelectedTongue("tongue11");
                setSelectedTeeth("teeth11");
                break;
            case "head12":
                setSelectedTongue("tongue1");
                setSelectedTeeth("teeth12");
                break;
            // Ajoutez d'autres cas si besoin
            default:
                setSelectedTongue("tongue1");
                setSelectedTeeth("teeth1");
                break;
        }
    };
    const handleSelect3 = (item: keyof typeof resourceMappingEyebrows): void => {
        setSelectedItem3(item);
    };
    const handleSelect4 = (item: keyof typeof resourceMappingEarings): void => {
        setSelectedItem4(item);
    };
    const handleSelect5 = (item: keyof typeof resourceMappingGlass): void => {
        setSelectedItem5(item);
    };
    const handleSelect6 = (item: keyof typeof resourceMappingNecklace): void => {
        setSelectedItem6(item);
    };
    const handleSelect7 = (item: keyof typeof resourceMappingClothe): void => {
        setSelectedItem7(item);
    };
    const handleSelect12 = (item: keyof typeof resourceMappingSkin): void => {
        setSelectedItem12(item);
    };
    // Properties show-hide slider-selector and their child
    const [selectedSlider, setSelectedSlider] = useState<string>("Slider");
    const [showSlider, setShowSlider] = useState(false);
    const [showButtons, setShowButtons] = useState(true);
    const [showSelector, setShowSelector] = useState(true);

    const handleSelectSlider = (slider: string): void => {
        setSelectedSlider(slider);
        setShowSlider(true);
        setShowButtons(false);
        setShowSelector(false);
    };

    const handleConfirmSlider = (): void => {
        setShowSlider(false);
        setShowButtons(true);
        setShowSelector(true);
    };
    // * Text input fonction
    const [num, setNum] = useState(userInfos?.avatar?.polarText ?? "");
    const textInputRef = useRef<TextInput | null>(null);

    const handleChangeText = (): void => {
        if (textInputRef.current != null) {
            textInputRef.current.focus();
        }
    };

    const [isLoaderDisplayed, setIsLoaderDisplayed] = useState<boolean>(true);

    setTimeout(() => {
        setIsLoaderDisplayed(false);
    }, 3000);

    return (
        // 3D environment container
        <ScrollView alwaysBounceVertical={false} showsVerticalScrollIndicator={false}>
            {/*  {areAllObjectsLoaded ? null : <LoaderApi />} */}
            {isLoaderDisplayed && <LoaderApi/>}
            <KeyboardAwareScrollView alwaysBounceVertical={false} showsVerticalScrollIndicator={false}>
                <View
                    style={[styles.container]}
                    darkColor={colors.backgroundDark}
                    lightColor={colors.backgroundDefault}
                >
                    <View style={styles.container2} lightColor={colors.white} darkColor={colors.gray500}>
                        <View
                            style={[styles.layerphoto]}
                            lightColor={colors.white}
                            darkColor={colors.gray500}
                        ></View>
                        <View
                            style={[styles.layerphoto2]}
                            lightColor={colors.white}
                            darkColor={colors.gray500}
                        ></View>
                        <View
                            style={[styles.shadowProp, styles.CharacterBackgroundContainer]}
                            lightColor={colors.white}
                            darkColor={colors.gray500}
                        >
                            <Background
                                style={styles.backgroundscene}
                                mainColor={
                                    ColorToDisplay[userInfos?.school?.name ?? "Bachelor Institute"]?.mainColor
                                }
                                secondColor={
                                    ColorToDisplay[userInfos?.school?.name ?? "Bachelor Institute"]?.secondColor
                                }
                                thirdColor={
                                    ColorToDisplay[userInfos?.school?.name ?? "Bachelor Institute"]?.thirdColor
                                }
                            />
                        </View>
                        {/* Scene */}
                        <Suspense>
                            <Canvas ref={glViewRef}>
                                {/* Light */}
                                {/* Lumière ambient */}
                                <ambientLight color="#E5E5E5" intensity={0.3}/>
                                {/* Lumière fix point */}
                                <pointLight
                                    position={[-20, 25, 50]}
                                    intensity={0.2}
                                    distance={0}
                                    decay={0.5}
                                    color="#E5E5E5"
                                />
                                {/* Lumière avec ombres */}
                                <directionalLight
                                    castShadow
                                    color="#E5E5E5"
                                    position={[30, 5, 10]}
                                    intensity={0.6}
                                    shadow-mapSize={{width: 1024, height: 1024}} // Taille de la carte d'ombres
                                />
                                {/* !! */}
                                {/* Flash Light pour camera */}
                                <FlashLight
                                    intensity={flashIntensity}
                                    onAnimationEnd={() => {
                                        setFlashIntensity(0);
                                    }}
                                />

                                {/* !! */}
                                {/* Character */}
                                {/* CustomGroup that stack all the objet and apply a rotation to them */}
                                <CustomGroup ref={groupRef} setGyroscopeActive={gyroscopeActive}>
                                    <Clothe
                                        selectedItem7={selectedItem7}
                                        setIsLoaded={() => {
                                            setIsClotheLoading(false);
                                        }}
                                    />
                                    <Earings
                                        selectedItem4={selectedItem4}
                                        setIsLoaded={() => {
                                            setIsEarringsLoading(false);
                                        }}
                                    />
                                    <Hair
                                        selectedItem={selectedItem}
                                        setIsLoaded={() => {
                                            setIsHairLoading(false);
                                        }}
                                    />
                                    <Head
                                        selectedItem2={selectedItem2}
                                        selectedItem12={selectedItem12}
                                        setIsLoaded={() => {
                                            setIsHeadLoading(false);
                                        }}
                                    />
                                    <Eyebrows
                                        selectedItem3={selectedItem3}
                                        setIsLoaded={() => {
                                            setIsEyebrowsLoading(false);
                                        }}
                                    />
                                    <Glass
                                        selectedItem5={selectedItem5}
                                        setIsLoaded={() => {
                                            setIsGlassLoading(false);
                                        }}
                                    />
                                    <Necklace
                                        selectedItem6={selectedItem6}
                                        setIsLoaded={() => {
                                            setIsNecklaceLoading(false);
                                        }}
                                    />
                                    <Eye
                                        selectedItem8={selectedItem8}
                                        setIsLoaded={() => {
                                            setIsEyeLoading(false);
                                        }}
                                    />
                                    <Ear
                                        selectedItem9={selectedItem9}
                                        selectedItem12={selectedItem12}
                                        setIsLoaded={() => {
                                            setIsEarLoading(false);
                                        }}
                                    />
                                    <Noose
                                        selectedItem10={selectedItem10}
                                        selectedItem12={selectedItem12}
                                        setIsLoaded={() => {
                                            setIsNooseLoading(false);
                                        }}
                                    />
                                    <Neck
                                        selectedItem11={selectedItem11}
                                        selectedItem12={selectedItem12}
                                        setIsLoaded={() => {
                                            setIsNeckLoading(false);
                                        }}
                                    />
                                    {selectedTongue && (
                                        <Tongue
                                            selectedTongue={selectedTongue}
                                            setIsLoaded={() => {
                                                setIsTongueLoading(false);
                                            }}
                                        />
                                    )}
                                    {selectedTeeth && (
                                        <Teeth
                                            selectedTeeth={selectedTeeth}
                                            setIsLoaded={() => {
                                                setIsTeethLoading(false);
                                            }}
                                        />
                                    )}
                                </CustomGroup>
                            </Canvas>
                        </Suspense>
                        <View
                            style={styles.bottomscenephoto}
                            lightColor={colors.white}
                            darkColor={colors.gray500}
                            pointerEvents="none"
                        >
                            <TextInput
                                ref={textInputRef}
                                keyboardType={Platform.OS === "ios" ? "ascii-capable" : "visible-password"}
                                onChangeText={(newNum) => {
                                    setNum(newNum);
                                }}
                                defaultValue={`${num}`}
                                style={[styles.polaroidText, styles.customTextStyle]}
                                maxLength={8}
                                numberOfLines={1}
                                editable
                            />
                        </View>
                        {/* Empilement */}
                    </View>

                    {showSelector && (
                        <Selector selectedSlider={selectedSlider} onSelectSlider={handleSelectSlider}/>
                    )}
                    {showSlider && (
                        <View style={styles.sliderContainer}>
                            {selectedSlider === "Slider" && (
                                <View style={styles.container3}>
                                    <SliderHair
                                        data={[
                                            {name: "hair0", type: "Function"},
                                            {name: "hair1", type: "Function"},
                                            {name: "hair2", type: "Function"},
                                            {name: "hair3", type: "Function"},
                                            {name: "hair4", type: "Function"},
                                            {name: "hair5", type: "Function"},
                                            {name: "hair6", type: "Function"},
                                            {name: "hair7", type: "Function"},
                                            {name: "hair8", type: "Function"},
                                            {name: "hair9", type: "Function"},
                                            {name: "hair10", type: "Function"},
                                            {name: "hair11", type: "Function"},
                                            {name: "hair12", type: "Function"},
                                        ]}
                                        selectedItem={selectedItem}
                                        onSelect={handleSelect}
                                    />
                                </View>
                            )}
                            {selectedSlider === "Slider2" && (
                                <View style={styles.container3}>
                                    <SliderHead
                                        data={[
                                            {name: "head1", type: "Function"},
                                            {name: "head2", type: "Function"},
                                            {name: "head3", type: "Function"},
                                            {name: "head4", type: "Function"},
                                            {name: "head5", type: "Function"},
                                            {name: "head6", type: "Function"},
                                            {name: "head7", type: "Function"},
                                            {name: "head8", type: "Function"},
                                            {name: "head9", type: "Function"},
                                            {name: "head10", type: "Function"},
                                            {name: "head11", type: "Function"},
                                            {name: "head12", type: "Function"},
                                        ]}
                                        selectedItem2={selectedItem2}
                                        onSelect2={handleSelect2}
                                    />
                                </View>
                            )}
                            {selectedSlider === "Slider3" && (
                                <View style={styles.container3}>
                                    <SliderEyebrows
                                        data={[
                                            {name: "eyebrows1", type: "Function"},
                                            {name: "eyebrows2", type: "Function"},
                                            {name: "eyebrows3", type: "Function"},
                                            {name: "eyebrows4", type: "Function"},
                                            {name: "eyebrows5", type: "Function"},
                                            {name: "eyebrows6", type: "Function"},
                                            {name: "eyebrows7", type: "Function"},
                                            {name: "eyebrows8", type: "Function"},
                                        ]}
                                        selectedItem3={selectedItem3}
                                        onSelect3={handleSelect3}
                                    />
                                </View>
                            )}
                            {selectedSlider === "Slider4" && (
                                <View style={styles.container3}>
                                    <SliderEarings
                                        data={[
                                            {name: "earings0", type: "Function"},
                                            {name: "earings1", type: "Function"},
                                            {name: "earings2", type: "Function"},
                                            {name: "earings3", type: "Function"},
                                            {name: "earings4", type: "Function"},
                                            {name: "earings5", type: "Function"},
                                            {name: "earings6", type: "Function"},
                                            {name: "earings7", type: "Function"},
                                            {name: "earings8", type: "Function"},
                                            {name: "earings9", type: "Function"},
                                            {name: "earings10", type: "Function"},
                                            {name: "earings11", type: "Function"},
                                            {name: "earings12", type: "Function"},
                                        ]}
                                        selectedItem4={selectedItem4}
                                        onSelect4={handleSelect4}
                                    />
                                </View>
                            )}
                            {selectedSlider === "Slider5" && (
                                <View style={styles.container3}>
                                    <SliderGlass
                                        data={[
                                            {name: "glass0", type: "Function"},
                                            {name: "glass1", type: "Function"},
                                            {name: "glass2", type: "Function"},
                                            {name: "glass3", type: "Function"},
                                            {name: "glass4", type: "Function"},
                                            {name: "glass5", type: "Function"},
                                            {name: "glass6", type: "Function"},
                                            {name: "glass7", type: "Function"},
                                            {name: "glass8", type: "Function"},
                                            {name: "glass9", type: "Function"},
                                            {name: "glass10", type: "Function"},
                                            {name: "glass11", type: "Function"},
                                            {name: "glass12", type: "Function"},
                                        ]}
                                        selectedItem5={selectedItem5}
                                        onSelect5={handleSelect5}
                                    />
                                </View>
                            )}

                            {selectedSlider === "Slider6" && (
                                <View style={styles.container3}>
                                    <SliderNecklace
                                        data={[
                                            {name: "necklace0", type: "Function"},
                                            {name: "necklace1", type: "Function"},
                                            {name: "necklace2", type: "Function"},
                                            {name: "necklace3", type: "Function"},
                                            {name: "necklace4", type: "Function"},
                                            {name: "necklace5", type: "Function"},
                                            {name: "necklace6", type: "Function"},
                                            {name: "necklace7", type: "Function"},
                                            {name: "necklace8", type: "Function"},
                                            {name: "necklace9", type: "Function"},
                                            {name: "necklace10", type: "Function"},
                                            {name: "necklace11", type: "Function"},
                                            {name: "necklace12", type: "Function"},
                                        ]}
                                        selectedItem6={selectedItem6}
                                        onSelect6={handleSelect6}
                                    />
                                </View>
                            )}
                            {selectedSlider === "Slider7" && (
                                <View style={styles.container3}>
                                    <SliderClothe
                                        data={[
                                            {name: "clothe0", type: "Function"},
                                            {name: "clothe1", type: "Function"},
                                            {name: "clothe2", type: "Function"},
                                            {name: "clothe3", type: "Function"},
                                            {name: "clothe4", type: "Function"},
                                            {name: "clothe5", type: "Function"},
                                            {name: "clothe6", type: "Function"},
                                            {name: "clothe7", type: "Function"},
                                            {name: "clothe8", type: "Function"},
                                            {name: "clothe9", type: "Function"},
                                            {name: "clothe10", type: "Function"},
                                            {name: "clothe11", type: "Function"},
                                            {name: "clothe12", type: "Function"},
                                        ]}
                                        selectedItem7={selectedItem7}
                                        onSelect7={handleSelect7}
                                    />
                                </View>
                            )}
                            {selectedSlider === "Slider12" && (
                                <View style={styles.container3}>
                                    <SliderSkin
                                        data={[
                                            {name: "skin1", type: "Function"},
                                            {name: "skin2", type: "Function"},
                                            {name: "skin3", type: "Function"},
                                            {name: "skin4", type: "Function"},
                                        ]}
                                        selectedItem12={selectedItem12}
                                        onSelect12={handleSelect12}
                                    />
                                </View>
                            )}
                        </View>
                    )}
                    {/* Confirmation du slider */}
                    {showSlider && (
                        <View style={styles.confirmSliderContainer}>
                            <TouchableOpacity
                                onPress={handleConfirmSlider}
                                style={[
                                    styles.button,
                                    {
                                        backgroundColor: themeContext?.colors.primaryExtraLight + "4D",
                                    },
                                ]}
                            >
                                <CheckIcon
                                    size={28}
                                    color={themeContext?.isDark ?? false ? colors.textDark : colors.textLight}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                    {/* Option principal */}
                    {showButtons && (
                        <View style={[styles.buttonContainer]}>
                            {/* Button de capture écran */}
                            <TouchableOpacity
                                onPress={handleSavePicture}
                                style={[
                                    styles.button,
                                    {
                                        backgroundColor: themeContext?.colors.primaryLight + "4D",
                                    },
                                ]}
                            >
                                <CameraIcon
                                    size={30}
                                    color={themeContext?.isDark ?? false ? colors.textDark : colors.textLight}
                                />
                            </TouchableOpacity>
                            {/* Button de sauvegarde */}
                            <TouchableOpacity
                                onPress={handleSaveAvatar}
                                style={[
                                    styles.button,
                                    {
                                        backgroundColor: themeContext?.colors.primaryLight + "4D",
                                    },
                                ]}
                            >
                                <SaveIcon
                                    size={30}
                                    color={themeContext?.isDark ?? false ? colors.textDark : colors.textLight}
                                />
                            </TouchableOpacity>
                            {/* Button de modification de texte sur la photo */}
                            <TouchableOpacity
                                onPress={handleChangeText}
                                style={[
                                    styles.button,
                                    {
                                        backgroundColor: themeContext?.colors.primaryLight + "4D",
                                    },
                                ]}
                            >
                                <TextIcon
                                    size={30}
                                    color={themeContext?.isDark ?? false ? colors.textDark : colors.textLight}
                                />
                            </TouchableOpacity>
                            {/* Composant ValidationModal */}
                            <ValidationModal
                                isVisible={showModal}
                                onConfirm={() => {
                                    handleConfirmFunction(confirmFunction);
                                }}
                                onCancel={handleCancel}
                                message={message}
                            />
                        </View>
                    )}
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    );
}
