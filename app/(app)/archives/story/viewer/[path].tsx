import React, {useCallback, useMemo, useState} from "react";
import {ActivityIndicator, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {StatusBarBlurBackground} from "@/components/CommonArchives/StoriesMakerModule/views/StatusBarBlurBackground";
import * as FileSystem from "expo-file-system";
import {Events} from "@/hooks/API/Repositories/Events";
import {Event as AmbEvent} from "@/hooks/API/ObjectTypes/Event";
import {AboutIcon, CheckIcon, CloseIcon, DownloadIcon, SendIcon} from "@/components/IconComponent";
import {colors} from "@/config/styles/01-settings/_colors";
import {postAPI} from "@/hooks/API/requestsManager";
import {router, useLocalSearchParams} from "expo-router";

export default function MediaPage(): React.JSX.Element {
    const {path} = useLocalSearchParams<{ path: string }>();

    const [savingState, setSavingState] = useState<"none" | "saving" | "saved" | "error">("none");
    const [submitState, setSubmitState] = useState<"none" | "saving" | "saved" | "error">("none");

    const onSavePressed = useCallback(async () => {
        setSavingState("saving");
        setTimeout(() => {
            setSavingState("saved");
        }, 3000);
    }, [path]);

    const onSubmitPressed = useCallback(async () => {
        setSubmitState("saving");

        try {
            const url = `file://${path}`;

            const image = await FileSystem.readAsStringAsync(url, {
                encoding: "base64",
            });

            const event = (await new Events()
                .getWithParams("today")
                .then((res) => (res.length > 0 ? res[0] : null))) as AmbEvent;
            if (event !== null) {
                const result = await postAPI({
                    objectType: "archivePosts",
                    dataToTransfert: {
                        evenement: event._id,
                        image,
                    },
                });

                if (result._id !== undefined) {
                    // IF SUCCESSFULLY SAVED
                    setSubmitState("saved");

                    // WAIT 1s AND REDIRECT
                    setTimeout(() => {
                        setSubmitState("none");

                        // REDIRECT TO ARCHIVES
                        router.navigate("/(app)/(tabs)/archive");
                    }, 1000);
                    return;
                }
            }
        } catch (err) {
            console.log(err);
        }
        // IF ERROR WEN SENDING
        setSubmitState("error");
        setTimeout(() => {
            setSubmitState("none");
        }, 5000);
    }, [path]);

    const source = useMemo(() => ({uri: `file://${path}`}), [path]);

    return (
        <View style={[styles.container]}>
            <Image source={source} style={StyleSheet.absoluteFill} resizeMode="cover"/>
            <TouchableOpacity style={styles.closeButton} onPress={router.back}>
                <CloseIcon size={25} color={colors.white} style={styles.icon}/>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.saveButton}
                onPress={onSavePressed}
                disabled={savingState !== "none"}
            >
                {savingState === "none" && (
                    <DownloadIcon size={25} color={colors.white} style={styles.icon}/>
                )}
                {savingState === "saved" && (
                    <CheckIcon size={25} color={colors.white} style={styles.icon}/>
                )}
                {savingState === "saving" && <ActivityIndicator color="white"/>}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                    void onSubmitPressed();
                }}
                disabled={submitState !== "none"}
            >
                {submitState === "none" && <SendIcon size={25} color={colors.white} style={styles.icon}/>}
                {submitState === "saved" && (
                    <CheckIcon size={25} color={colors.white} style={styles.icon}/>
                )}
                {submitState === "error" && (
                    <AboutIcon size={25} color={colors.white} style={styles.icon}/>
                )}
                {submitState === "saving" && <ActivityIndicator color="white"/>}
            </TouchableOpacity>

            <StatusBarBlurBackground/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    closeButton: {
        position: "absolute",
        top: 70,
        left: 20,
        width: 40,
        height: 40,
    },
    saveButton: {
        position: "absolute",
        bottom: 50,
        left: 20,
        width: 40,
        height: 40,
    },
    submitButton: {
        position: "absolute",
        bottom: 50,
        right: 20,
        width: 40,
        height: 40,
    },
    icon: {
        textShadowColor: "black",
        textShadowOffset: {
            height: 0,
            width: 0,
        },
        textShadowRadius: 1,
    },
    iconSend: {
        transform: [{rotate: "-40deg"}],
    },
});
