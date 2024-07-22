import React, {useState} from "react";
import {Alert, KeyboardAvoidingView, Platform, TouchableOpacity} from "react-native";
import {Text, View} from "@/components/Themed";
import LogoNextUShadow from "@/components/SvgIllustration/LogoNextUShadow";
import LabelTemplate from "@/components/FormTemplate/LabelTemplate";
import InputTemplate from "@/components/FormTemplate/InputTemplate";
import {auth} from "@/hooks/useDatabase";
import useColorScheme from "@/hooks/useColorScheme";
import {useAppSelector} from "@/hooks/store";
import {putAPI} from "@/hooks/API/requestsManager";
import {type RootState} from "@/redux";
import {router} from "expo-router";
import styles from "@/styles/auth/LoginStyle";

const updateDeviceToken = async (idUser: string, pushToken: string | null): Promise<unknown> => {
    return await new Promise((resolve, reject) => {
        putAPI({
            objectType: "user-ambassador",
            options: "/update-notification-token",
            dataToTransfert: {pushToken, platform: Platform.OS},
        })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default function LogInScreen(): React.JSX.Element {
    const pushToken = useAppSelector((state: RootState) => state.pushToken);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const colorSchema = useColorScheme();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Static data
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const placeholder = {
        emailph: "prenom.nom@next-u.fr",
        passwordph: "e.g., •••••••",
    };

    const sendForm = async (): Promise<void> => {
        const isLoggedIn = await auth(username.replace(/^\s+|\s+$/g, ""), password, true);

        if (isLoggedIn.isAuth) {
            if (isLoggedIn?.currentUser?._id)
                await updateDeviceToken(isLoggedIn?.currentUser?._id, pushToken.token);
            if (isLoggedIn?.currentUser?.isValid) {
                // TODO - Change route
                router.push("(app)/(tabs)/home");
            } else {
                // TODO - Change route
                router.push("(app)/(first-login)/step-1");
            }
        } else {
            Alert.alert(
                "Informations incorrectes",
                "Le nom d'utilisateur et le mot de passe saisis ne correspondent à aucun compte existant, veuillez vérifier les informations de connexion.",
                [
                    {
                        text: "Annuler",
                        onPress: () => {
                        },
                        style: "destructive",
                    },
                ]
            );
        }
    };

    const forgotPassword = (): void => {
        // TODO - Change route
        router.push("ForgotPassword");
    };

    const onBoard = (): void => {
        // TODO - Change route
        router.push("OnBoard");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.container]}
        >
            <View style={styles.main_container}>
                <View style={styles.main_info_container}>
                    <View style={[styles.logoContainer]}>
                        <LogoNextUShadow
                            style={styles.logo}
                            mainColor={colorSchema === "dark" ? "#ffffff" : "#353535"}
                            secondColor={colorSchema === "dark" ? "#000000" : "#ffffff"}
                        />
                    </View>
                    {/* USERNAME */}
                    <View style={styles.InputContainer}>
                        <LabelTemplate name={"Email"} required={false} isDefault={true}/>
                        <InputTemplate
                            value={username}
                            placeholder={placeholder.emailph}
                            onChangeText={(val: string) => {
                                setUsername(val.trim());
                            }}
                            secureTextEntry={false}
                            multiline={false}
                            regex={emailRegex}
                            hasToBeChecked={false}
                        />
                    </View>
                    {/* PASSWORD */}
                    <View style={styles.InputContainer}>
                        <LabelTemplate name={"Mot de passe"} required={false} isDefault={true}/>
                        <InputTemplate
                            value={password}
                            placeholder={placeholder.passwordph}
                            onChangeText={(val: string) => {
                                setPassword(val.trim());
                            }}
                            secureTextEntry={true}
                            showPassword={isPasswordVisible}
                            switchPasswordVisibility={() => {
                                setIsPasswordVisible(!isPasswordVisible);
                            }}
                            multiline={false}
                            hasToBeChecked={false}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={async () => {
                            await sendForm();
                        }}
                    >
                        <Text bold style={styles.text}>
                            Connexion
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            backgroundColor: "transparent",
                        }}
                    >
                        <TouchableOpacity onPress={forgotPassword}>
                            <Text
                                style={styles.secondAction}
                                lightColor="rgba(0,0,0,0.8)"
                                darkColor="rgba(255,255,255,0.8)"
                            >
                                Mot de passe oublié ?
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onBoard}>
                            <Text
                                style={styles.secondAction}
                                lightColor="rgba(0,0,0,0.8)"
                                darkColor="rgba(255,255,255,0.8)"
                            >
                                Où suis-je ?
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
