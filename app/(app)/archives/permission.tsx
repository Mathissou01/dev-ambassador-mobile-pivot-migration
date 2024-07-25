import React, {ReactNode, useCallback, useContext, useEffect} from "react";
import {Image, Linking, TouchableOpacity} from "react-native";
import {Text, View} from "@/components/Themed";
import {useCameraPermissions} from "expo-camera";
import CameraLogo from "@/components/SvgIllustration/CameraLogo";
import {ThemeContext} from "@/hooks/useColorScheme";
import styles from "@/styles/archives/PermissionStyle";
import LottieView from "lottie-react-native";
import {router} from "expo-router";

export default function PermissionsPage(): ReactNode {
    const [permission, requestPermission] = useCameraPermissions();
    const colorTheme = useContext(ThemeContext);

    const requestCameraPermission = useCallback(async () => {
        console.log("Requesting camera permission...");

        if (permission?.granted === false) await Linking.openSettings();
    }, []);

    useEffect(() => {
        requestPermission().then(resp => {
            if (resp.granted) {
                router.replace("/(app)/archives/story/maker");
            }
        });
        if (permission?.granted === true) router.replace("/(app)/archives/story/maker");
    }, [permission, router]);

    return (
        <View style={styles.container}>
            <View style={[styles.logoBackground]}>
                <LottieView
                    source={require("@/assets/json/acces-logo/sparkle1.json")}
                    autoPlay
                    loop
                    style={[styles.lottieImage, styles.secondLotti]}
                />
                <LottieView
                    source={require("@/assets/json/acces-logo/sparkle2.json")}
                    autoPlay
                    loop
                    style={[styles.lottieImage, styles.firstLotti]}
                />
                <CameraLogo
                    mainColor={colorTheme?.colors.secondaryExtraLight}
                    secondColor={colorTheme?.colors.primaryLight}
                />
            </View>
            <Image
                style={styles.robotImage}
                source={require("@/assets/images/robot-scene/camera-scene.png")}
            />
            <View style={styles.permissionsContainer}>
                <Text bold style={styles.headingText}>
                    Accès à la camera
                </Text>
                <Text style={styles.subheadingText}>Hop hop hop !</Text>
                <Text style={styles.permissionText}>
                    J&apos;ai besoin de l&apos;accès à ton <Text style={styles.bold}>appareil photo</Text>{" "}
                    pour utiliser cette fonctionnalité
                </Text>
                <View style={styles.ctas}>
                    <TouchableOpacity style={[styles.mainButton]} onPress={requestCameraPermission}>
                        <Text style={[styles.normalText]}>Accéder</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.secondButton}
                        onPress={() => {
                            router.back();
                        }}
                    >
                        <Text style={styles.hyperlinkText}>Plus tard</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
