import * as React from "react";
import {ReactNode, useCallback, useRef, useState} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {CameraCapturedPicture, CameraView} from 'expo-camera';
import {CONTENT_SPACING, CONTROL_BUTTON_SIZE,} from "@/components/CommonArchives/StoriesMakerModule/Constants";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";

export default function StoriesMaker(): ReactNode {
    const camera = useRef<CameraView>(null);
    const [cameraReady, setCameraReady] = useState<boolean>(false);

    // check if camera page is active
    const [cameraPosition, setCameraPosition] = useState<"front" | "back">("back");
    const [flash, setFlash] = useState<"off" | "on">("off");

    const onMediaCaptured = useCallback(
        async () => {
            const photo: CameraCapturedPicture | undefined = await camera.current?.takePictureAsync({
                skipProcessing: false,
                exif: true,
                imageType: "jpg",
                quality: 0.7
            });

            if (photo !== undefined) {
                // Redirect to route that will process the image
                router.navigate(`/(app)/archives/story/viewer/${encodeURIComponent(photo.uri)}`);
            }
        },
        [camera]
    );
    const onFlipCameraPressed = useCallback(() => {
        setCameraPosition((p) => (p === "back" ? "front" : "back"));
    }, []);
    const onFlashPressed = useCallback(() => {
        setFlash((f) => (f === "off" ? "on" : "off"));
    }, []);
    // #endregion

    const cameraLoaded = async () => {
        setCameraReady(true);
    }

    return (
        <View style={styles.container}>
            <CameraView onCameraReady={cameraLoaded} style={{flex: 1}}
                        flash={flash}
                        enableTorch={flash === "on"}
                        animateShutter={true}
                        zoom={0}
                        mode={"picture"}
                        facing={cameraPosition}
                        ref={camera}
            >
                <View style={styles.controls}>
                    <View>
                        <TouchableOpacity disabled={!cameraReady}
                                          style={[styles.button, styles.flipCamera, !cameraReady ? styles.disabled : {}]}
                                          onPress={onFlipCameraPressed}>
                            <Ionicons name="camera-reverse-sharp" size={24} color="white"/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity disabled={!cameraReady}
                                          style={[styles.button, styles.takePicture, !cameraReady ? styles.disabled : {}]}
                                          onPress={onMediaCaptured}>

                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity disabled={!cameraReady}
                                          style={[styles.button, styles.flashButton, !cameraReady ? styles.disabled : {}]}
                                          onPress={onFlashPressed}>
                            <Ionicons name={flash === "on" ? "flash" : "flash-off"} color="white" size={24}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    root: {
        flex: 1,
        zIndex: -1,
    },
    captureButton: {
        position: "absolute",
        zIndex: 5,
        alignSelf: "center",
        bottom: 20,
    },
    button: {
        marginBottom: CONTENT_SPACING,
        width: CONTROL_BUTTON_SIZE,
        height: CONTROL_BUTTON_SIZE,
        borderRadius: CONTROL_BUTTON_SIZE / 2,
        backgroundColor: "rgba(140, 140, 140, 0.3)",
        justifyContent: "center",
        alignItems: "center",
    },
    rightButtonRow: {
        position: "absolute",
        right: 20,
        top: 80,
    },
    text: {
        color: "white",
        fontSize: 11,
        fontWeight: "bold",
        textAlign: "center",
    },

    // NEW
    controls: {
        position: 'absolute',
        bottom: 50,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 20
    },
    takePicture: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderWidth: 5,
        borderColor: 'rgba(255,255,255,0.8)',
        height: 80,
        width: 80,
        borderRadius: 40,
    },
    flipCamera: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.8)',
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    flashButton: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.8)',
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    disabled: {
        opacity: .2,
    }
});
