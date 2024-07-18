import React, {type ComponentType, ReactNode, useCallback, useEffect, useRef, useState} from "react";
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    Modal,
    type ModalProps,
    Platform,
    TouchableOpacity,
    VirtualizedList,
} from "react-native";
import {Text, View} from "@/components/Themed";
import * as FileSystem from "expo-file-system";
import {shareAsync} from "expo-sharing";
import * as ImageManipulator from "expo-image-manipulator";
import ImageItem from "./components/ImageItem/ImageItem";
import ImageDefaultHeader from "./components/ImageDefaultHeader";
import StatusBarManager from "./components/StatusBarManager";
import useAnimatedComponents from "./hooks/useAnimatedComponents";
import useImageIndexChange from "./hooks/useImageIndexChange";
import useRequestClose from "./hooks/useRequestClose";
import {type ImageSource} from "./@types";
import styles from "./ImageViewingStyle";
import {colors} from "@/config/styles/01-settings/_colors";
import {useHeaders} from "@/hooks/useHeaders";
import {AboutIcon, CheckIcon, DownloadIcon, ShareIcon} from "../../IconComponent";

interface Props {
    images: ImageSource[];
    keyExtractor?: (imageSrc: ImageSource, index: number) => string;
    imageIndex: number;
    visible: boolean;
    onRequestClose: () => void;
    onLongPress?: (image: ImageSource) => void;
    onImageIndexChange?: (imageIndex: number) => void;
    presentationStyle?: ModalProps["presentationStyle"];
    animationType?: ModalProps["animationType"];
    backgroundColor?: string;
    swipeToCloseEnabled?: boolean;
    doubleTapToZoomEnabled?: boolean;
    delayLongPress?: number;
    HeaderComponent?: ComponentType<{ imageIndex: number }>;
    FooterComponent?: ComponentType<{ imageIndex: number }>;
    userName?: string;
    userAvatar?: string;
    userImageTimeStampDate?: string;
    userImageTimeStampTime?: string;
    userImageShare?: string;
}

const DEFAULT_ANIMATION_TYPE = "fade";
const DEFAULT_BG_COLOR = "#000";
const DEFAULT_DELAY_LONG_PRESS = 800;
const SCREEN = Dimensions.get("screen");
const SCREEN_WIDTH = SCREEN.width;
const SCREEN_HEIGHT = SCREEN.height;

function ImageViewing({
                          images,
                          keyExtractor,
                          imageIndex,
                          visible,
                          onRequestClose,
                          onLongPress = () => {
                          },
                          onImageIndexChange,
                          animationType = DEFAULT_ANIMATION_TYPE,
                          backgroundColor = DEFAULT_BG_COLOR,
                          presentationStyle,
                          swipeToCloseEnabled,
                          doubleTapToZoomEnabled,
                          delayLongPress = DEFAULT_DELAY_LONG_PRESS,
                          HeaderComponent,
                          FooterComponent,
                          userName,
                          userAvatar,
                          userImageTimeStampDate,
                          userImageTimeStampTime,
                          userImageShare,
                      }: Props): ReactNode {
    const imageList = useRef<VirtualizedList<ImageSource>>(null);
    const [opacity, onRequestCloseEnhanced] = useRequestClose(onRequestClose);
    const [currentImageIndex, onScroll] = useImageIndexChange(imageIndex, SCREEN);
    const [headerTransform, footerTransform, toggleBarsVisible] = useAnimatedComponents();
    const [savingState, setSavingState] = useState<"none" | "saving" | "saved" | "error">("none");
    const [sharingState, setSharingState] = useState<"none" | "saving" | "saved" | "error">("none");

    const headers = useHeaders();

    useEffect(() => {
        if (typeof onImageIndexChange === "function") {
            onImageIndexChange(currentImageIndex);
        }
    }, [currentImageIndex]);

    const onZoom = useCallback(
        (isScaled: boolean) => {
            // @ts-ignore
            imageList?.current?.setNativeProps({scrollEnabled: !isScaled});
            toggleBarsVisible(!isScaled);
        },
        [imageList]
    );

    if (!visible) {
        return null;
    }

    const getFileName = (): string => {
        return (
            userName?.replace(" ", "-").toLowerCase() +
            "-" +
            new Date().toISOString().split("T")[0] +
            "-image.jpg"
        );
    };

    // Image share method
    async function share(userImageShare: string): Promise<void> {
        const filename = getFileName();

        try {
            setSharingState("saving");
            const {uri} = await FileSystem.downloadAsync(
                userImageShare,
                FileSystem.documentDirectory + filename + `temp.jpeg`,
                {headers}
            );

            // Compress the image
            const compressedImage = await ImageManipulator.manipulateAsync(uri, [], {
                compress: 0.7, // Adjust the compression value as needed
                format: ImageManipulator.SaveFormat.JPEG,
            });

            // Share the compressed image
            void shareAsync(compressedImage.uri, {dialogTitle: "COUCOU"});
            setSharingState("saved");
            // Reset sharingState to "none" after a delay
            setTimeout(() => {
                setSharingState("none");
            }, 3000);
        } catch (error) {
            setSharingState("error");
            console.error(error);
        }
    }

    async function saveFile(uri: string, filename: string, mimetype: string): Promise<void> {
        try {
            if (!mimetype) {
                console.log("Mimetype is null");
                return;
            }

            if (Platform.OS === "android") {
                const permissions =
                    await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

                if (permissions.granted) {
                    const base64 = await FileSystem.readAsStringAsync(uri, {
                        encoding: FileSystem.EncodingType.Base64,
                    });

                    const createdUri = await FileSystem.StorageAccessFramework.createFileAsync(
                        permissions.directoryUri,
                        filename,
                        mimetype
                    );

                    console.log("File created successfully:", createdUri);

                    await FileSystem.writeAsStringAsync(createdUri, base64, {
                        encoding: FileSystem.EncodingType.Base64,
                    });
                } else {
                    console.log("Directory permissions not granted");
                    void shareAsync(uri, {dialogTitle: "COUCOU"});
                }
            } else {
                void shareAsync(uri, {dialogTitle: "COUCOU"});
            }
        } catch (error) {
            console.log("Error in saveFile:", error);
        }
    }

    // Download image function
    async function download(userImageShare: string): Promise<void> {
        const filename = getFileName();

        try {
            setSavingState("saving");
            // Download the image
            const {uri, status} = await FileSystem.downloadAsync(
                userImageShare,
                FileSystem.documentDirectory + filename,
                {headers}
            );

            if (status === 200) {
                // Compress the downloaded image
                const compressedImage = await ImageManipulator.manipulateAsync(uri, [], {
                    compress: 0.7, // Adjust the compression value as needed
                    format: ImageManipulator.SaveFormat.JPEG,
                });

                // Save the compressed file
                await saveFile(compressedImage.uri, filename, "image/jpeg");
                setSavingState("saved");
                // Reset sharingState to "none" after a delay
                setTimeout(() => {
                    setSavingState("none");
                }, 3000);
            } else {
                setSavingState("error");
                throw new Error("Image cannot be downloaded");
            }
        } catch (error) {
            setSavingState("error");
            console.error("Error downloading and compressing image:", error);
        }
    }

    return (
        <Modal
            transparent={presentationStyle === "overFullScreen"}
            visible={visible}
            presentationStyle={presentationStyle}
            animationType={animationType}
            onRequestClose={onRequestCloseEnhanced}
            supportedOrientations={["portrait"]}
            hardwareAccelerated
        >
            <StatusBarManager presentationStyle={presentationStyle}/>
            <View style={[styles.container, {opacity, backgroundColor}]}>
                <Animated.View style={[styles.header, {transform: headerTransform}]}>
                    {typeof HeaderComponent !== "undefined" ? (
                        React.createElement(HeaderComponent, {
                            imageIndex: currentImageIndex,
                        })
                    ) : (
                        <ImageDefaultHeader userName={userName!} userAvatar={userAvatar!}
                                            onRequestClose={onRequestCloseEnhanced}/>
                    )}
                </Animated.View>
                <VirtualizedList
                    ref={imageList}
                    data={images}
                    horizontal
                    pagingEnabled
                    windowSize={2}
                    initialNumToRender={1}
                    maxToRenderPerBatch={1}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    initialScrollIndex={imageIndex}
                    getItem={(_, index) => images[index]}
                    getItemCount={() => images.length}
                    getItemLayout={(_, index) => ({
                        length: SCREEN_WIDTH,
                        offset: SCREEN_WIDTH * index,
                        index,
                    })}
                    renderItem={({item: imageSrc}) => (
                        <ImageItem
                            onZoom={onZoom}
                            imageSrc={imageSrc}
                            onRequestClose={onRequestCloseEnhanced}
                            onLongPress={onLongPress}
                            delayLongPress={delayLongPress}
                            swipeToCloseEnabled={swipeToCloseEnabled}
                            doubleTapToZoomEnabled={doubleTapToZoomEnabled}
                        />
                    )}
                    onMomentumScrollEnd={onScroll}
                    // @ts-ignore
                    keyExtractor={(imageSrc, index) =>
                        keyExtractor
                            ? keyExtractor(imageSrc, index)
                            : typeof imageSrc === "number"
                                ? `${imageSrc}`
                                : imageSrc.uri
                    }
                />
                <View style={[styles.imageInfoContainer]}>
                    <View style={[styles.imageInfoDataContainer]}>
                        <Text style={[styles.imageInfoText]}>
                            {userImageTimeStampDate} - {userImageTimeStampTime}
                        </Text>
                    </View>
                    <View style={[styles.rightContainer]}>
                        <TouchableOpacity style={styles.socialBtn} onPress={() => download(userImageShare!)}>
                            {savingState === "none" && <DownloadIcon size={25} color={colors.white}/>}
                            {savingState === "saved" && <CheckIcon size={25} color={colors.white}/>}
                            {savingState === "error" && <AboutIcon size={25} color={colors.white}/>}
                            {savingState === "saving" && <ActivityIndicator color={colors.white}/>}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialBtn} onPress={() => share(userImageShare!)}>
                            {sharingState === "none" && <ShareIcon size={25} color={colors.white}/>}
                            {sharingState === "saved" && <CheckIcon size={25} color={colors.white}/>}
                            {sharingState === "error" && <AboutIcon size={25} color={colors.white}/>}
                            {sharingState === "saving" && <ActivityIndicator color={colors.white}/>}
                        </TouchableOpacity>
                    </View>
                </View>
                {typeof FooterComponent !== "undefined" && (
                    <Animated.View style={[styles.footer, {transform: footerTransform}]}>
                        {React.createElement(FooterComponent, {
                            imageIndex: currentImageIndex,
                        })}
                    </Animated.View>
                )}
            </View>
        </Modal>
    );
}

const EnhancedImageViewing = (props: Props) => <ImageViewing key={props.imageIndex} {...props} />;

export default EnhancedImageViewing;
