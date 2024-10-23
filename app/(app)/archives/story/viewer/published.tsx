import React, {ReactNode, useState} from "react";
import {ActivityIndicator, Dimensions, Platform, Pressable, SafeAreaView, TouchableOpacity,} from "react-native";
import {Text, View} from "@/components/Themed";
import {useStoryScreen} from "@/components/CommonArchives/StoriesViewerModule/StoryScreen/useStoryScreen";
import {ProgressBar} from "@/components/CommonArchives/StoriesViewerModule/StoryScreen/ProgressBar";
import {colors} from "@/config/styles/01-settings/_colors";
import styles from "@/styles/archives/StoryViewerStyle";
import {AuthorizedImages} from "@/components/AuthorizedImages";
import * as FileSystem from "expo-file-system";
import {shareAsync} from "expo-sharing";
import * as ImageManipulator from "expo-image-manipulator";
import {AboutIcon, CheckIcon, CloseIcon, DownloadIcon, ShareIcon,} from "@/components/IconComponent";
import {useHeaders} from "@/hooks/useHeaders";
import {router} from "expo-router";
import {useAppSelector} from "@/hooks/store";
import {selectArchive} from "@/redux/Archive/ArchiveSlice";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function StoryViewerScreen(): ReactNode {
    const {stories: storiesStore, currentStoryIndex} = useAppSelector(selectArchive);
    const headers = useHeaders();

    // TODO - Send good parameters to the hook
    const {
        userStories,
        progresses,
        stories,
        currentIndex,
        goBack,
        goForward,
        setLoaded
    } = useStoryScreen({stories: storiesStore, currentStoryIndex});

    const [sharingState, setSharingState] = useState("none");
    const [savingState, setSavingState] = useState("none");

    const getFileName = (): string => {
        return (
            stories[currentIndex]?.user?.firstname?.replace(" ", "-").toLowerCase() +
            "-" +
            currentIndex +
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

    //
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

    const {height, width} = Dimensions.get("screen");
    const {top, bottom} = useSafeAreaInsets();
    const maxHeight = height - bottom * 1.4 - top - 20;
    const maxControlsHeight = maxHeight - 70;
    const aspectRatio = width / maxHeight;

    return (
        <SafeAreaView style={[styles.safeArea]}>
            <View style={[styles.storyContainer, {paddingTop: top + 15}]}>
                <ProgressBar userStories={userStories} progresses={progresses}/>
                <View style={styles.header}>
                    <Text style={styles.userName}>{stories[currentIndex]?.user?.firstname}</Text>
                    <Pressable style={styles.closeButton} onPress={() => router.navigate("/(app)/(tabs)/archive")}>
                        <CloseIcon size={18} color={colors.white}/>
                    </Pressable>
                </View>
            </View>
            <AuthorizedImages
                onLoad={() => {
                    setLoaded(true);
                }}
                source={{uri: stories[currentIndex]?.image}}
                style={[styles.image, {aspectRatio}]}
            />
            <Pressable style={[styles.backButton, {top: top + 70, height: maxControlsHeight}]} onPress={goBack}/>
            <Pressable style={[styles.forwardButton, {top: top + 70, height: maxControlsHeight}]} onPress={goForward}/>
            <View style={styles.bottomTab}>
                <TouchableOpacity
                    style={styles.socialBtn}
                    onPress={() => {
                        void download(stories[currentIndex]?.image);
                    }}
                >
                    {savingState === "none" && <DownloadIcon size={25} color={colors.white}/>}
                    {savingState === "saved" && <CheckIcon size={25} color={colors.white}/>}
                    {savingState === "error" && <AboutIcon size={25} color={colors.white}/>}
                    {savingState === "saving" && <ActivityIndicator color={colors.white}/>}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.socialBtn}
                    onPress={() => {
                        void share(stories[currentIndex]?.image);
                    }}
                >
                    {sharingState === "none" && <ShareIcon size={25} color={colors.white}/>}
                    {sharingState === "saved" && <CheckIcon size={25} color={colors.white}/>}
                    {sharingState === "error" && <AboutIcon size={25} color={colors.white}/>}
                    {sharingState === "saving" && <ActivityIndicator color={colors.white}/>}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
