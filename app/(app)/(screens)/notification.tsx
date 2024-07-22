import React, {ReactNode, useContext, useEffect, useState} from "react";
import {Animated, Image, RefreshControl, ScrollView, TouchableWithoutFeedback,} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Audio} from "expo-av";
import {Text, View} from "@/components/Themed";
import NotificationTemplate from "@/components/Notification/NotificationTemplate";
import {type Notification} from "@/hooks/API/ObjectTypes/Notification";
import {Notifications} from "@/hooks/API/Repositories/Notifications";
import {ThemeContext} from "@/hooks/useColorScheme";
import notifScene from "@/assets/images/robot-scene/notifications-scene.png";
import {colors} from "@/config/styles/01-settings/_colors";
import {startBounceAnimation} from "@/utils/AnimationLib";

import styles from "@/styles/screens/NotificationStyle";

const RepoNotifications = new Notifications();

export default function NotificationScreen(): ReactNode {
    const colorTheme = useContext(ThemeContext);
    const [bounceAnimation] = useState(new Animated.Value(1));
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        RepoNotifications.getAll<Notification[]>()
            .then((notifs) => {
                setNotifications(notifs);
            })
            .catch(console.error);
    }, []);

    const handleDelete = (idToDelete: string): void => {
        setNotifications(notifications.filter((notif) => notif._id !== idToDelete));
    };

    const onRefresh = (): void => {
        setRefreshing(true);
        RepoNotifications.getAll<Notification[]>()
            .then((notifs) => {
                setNotifications(notifs);
                setRefreshing(false);
            })
            .catch(console.error);
    };

    const playSound = async (): Promise<void> => {
        try {
            const {sound} = await Audio.Sound.createAsync(require("../assets/sounds/BOUNCE.mp3"));
            await sound.playAsync(); // Play the sound
        } catch (error) {
            console.error("Error playing sound:", error);
        }
    };

    const playRobot = (): void => {
        void playSound();
        startBounceAnimation(bounceAnimation);
    };

    return (
        <SafeAreaView
            edges={["bottom", "left", "right"]}
            style={[
                styles.container,
                {
                    backgroundColor:
                        colorTheme?.isDark ?? false ? colors.backgroundDark : colors.backgroundDefault,
                },
            ]}
        >
            <ScrollView
                style={{
                    backgroundColor: "transparent",
                }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                contentContainerStyle={
                    notifications.length === 0
                        ? {
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "30%",
                        }
                        : null
                }
            >
                {notifications.length === 0 ? (
                    <View style={styles.emptyNotif}>
                        <TouchableWithoutFeedback onPress={playRobot}>
                            <Animated.View
                                style={{
                                    transform: [{scale: bounceAnimation}],
                                }}
                            >
                                <Image style={{width: 300, height: 300}} source={notifScene}/>
                            </Animated.View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.emptyNotifTextTitle}>Retrouve les dernières actualités ici</Text>
                        <Text style={styles.emptyNotifText}>
                            Des informations sur les événements{"\n"}à venir, sur tes inscriptions,{"\n"}le
                            classement et bien plus encore...
                        </Text>
                    </View>
                ) : (
                    <>
                        {notifications.map((notification) => (
                            <NotificationTemplate
                                key={notification._id}
                                notification={notification}
                                onDelete={handleDelete}
                            />
                        ))}
                        <View style={{height: 30}}/>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
