import React, {useState} from "react";
import {Alert, KeyboardAvoidingView, Platform, TouchableOpacity} from "react-native";
import {Text, View} from "@/components/Themed";
import {type RootTabScreenProps} from "@/types";
import useColorScheme from "@/hooks/useColorScheme";
import LogoNextUShadow from "@/components/SvgIllustration/LogoNextUShadow";
import LabelTemplate from "@/components/FormTemplate/LabelTemplate";
import InputTemplate from "@/components/FormTemplate/InputTemplate";
import {useAPI} from "@/hooks/useAPI";
import {colors} from "@/config/styles/01-settings/_colors";
import styles from "@/styles/auth/PasswordForgetStyle";
import {router} from "expo-router";

export default function PasswordForgetScreen({}: RootTabScreenProps<"ForgotPassword">): React.JSX.Element {
    const colorSchema = useColorScheme();

    const placeholder = {
        emailph: "prenom.nom@next-u.fr",
    };

    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const [emailAddress, setEmailAdress] = useState("");
    const sendAskPassword = (): void => {
        if (emailAddress.match(emailRegex) != null) {
            void useAPI()
                .post("passwordForgotten", {
                    email: emailAddress,
                })
                .then((resp) => {
                    if (resp.ok) {
                        Alert.alert(
                            "Lien envoyé",
                            "Le lien pour changer votre mot de passe vous a été envoyé par email. Vous avez 15 minutes pour changer votre mot de passe, après ça le lien ne sera plus utilisable.",
                            [
                                {
                                    text: "OK",
                                    onPress: () => {
                                        router.navigate("/(auth)/login");
                                    },
                                },
                            ]
                        );
                    } else {
                        Alert.alert(
                            "Une erreur est survenue",
                            "Une erreur est survenue lors de la récupération de votre compte. Vérifiez bien ton e-mail et essayez de nouveau dans quelques minutes."
                        );
                    }
                });
        }
    };
    const cancel = (): void => {
        router.navigate("/(auth)/login");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.main_container}>
                <View style={styles.main_info_container}>
                    <View style={styles.logoContainer}>
                        <LogoNextUShadow
                            style={styles.logo}
                            mainColor={colorSchema === "dark" ? "#ffffff" : "#353535"}
                            secondColor={colorSchema === "dark" ? "#000000" : "#ffffff"}
                        />
                    </View>
                    <Text style={styles.title} numberOfLines={3}>
                        Récupération de{"\n"}votre compte
                    </Text>
                    {/* USERNAME */}
                    <LabelTemplate name={"Adresse email next-u"} required={false} isDefault={true}/>
                    <InputTemplate
                        value={emailAddress}
                        placeholder={placeholder.emailph}
                        onChangeText={setEmailAdress}
                        secureTextEntry={false}
                        multiline={false}
                        regex={emailRegex}
                    />
                    <Text style={styles.moreInfos}>
                        Un mot de passe vous sera renvoyé sous peu, à l&apos;adresse que vous avez indiquée.
                        Pensez à regarder dans vos SPAMS !
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={sendAskPassword}>
                        <Text bold style={styles.text}>
                            Envoyer
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={cancel} style={styles.buttonSecondary}>
                        <Text
                            style={styles.secondAction}
                            darkColor={colors.textDark}
                            lightColor={colors.textLight}
                        >
                            Annuler
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
