import React, {useContext, useRef} from "react";
import {Dimensions, TouchableOpacity} from "react-native";
import {GestureHandlerRootView, Swipeable} from "react-native-gesture-handler";
import {type BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {type NotificationData, type RootStackParamList, type switchEventInterfce,} from "@/types";
import {Text, View} from "@/components/Themed";
import {type Notification} from "@/hooks/API/ObjectTypes/Notification";
import {colors} from "@/config/styles/01-settings/_colors";
import {hexToRgbA} from "@/utils/hexToRgbA";
import {ThemeContext} from "@/hooks/useColorScheme";
import {AwardIcon, CalendarIcon, ClipboardIcon, ClockIcon, DeleteIcon, EditIcon,} from "../IconComponent";
import styles from "./NotificationTemplateStyle.js";
import {router} from "expo-router";

export default function NotificationTemplate({
                                                 notification,
                                                 onDelete,
                                             }: {
    notification: Notification;
    onDelete: any;
} & Partial<
    BottomTabScreenProps<RootStackParamList, "ModalNotificationScreen">
>): React.JSX.Element {
    const {width} = Dimensions.get("window");
    const {
        type,
        subtype,
        idEvent,
        nameEvent,
        dateEvent,
        startHourEvent,
        endHourEvent,
        levelAmbassador,
        levelPodium,
        stepForm,
        timestamp,
    }: NotificationData = notification.notificationCard;

    const switchEvent = (): switchEventInterfce => {
        let title;
        let icon;
        let message;

        switch (type) {
            case "schedule_event":
                title = "Programmation d'un événement";
                icon = (
                    <ClockIcon
                        size={18}
                        color={colorTheme?.isDark ?? false ? colors.gray300 : colors.black}
                    />
                );
                switch (subtype) {
                    case "beginning_event":
                        message =
                            "L'événement " + nameEvent + " débutera le " + dateEvent + " à " + startHourEvent;
                        break;
                    case "end_event":
                        message =
                            "L'événement " + nameEvent + " prendra fin le " + dateEvent + " à " + endHourEvent;
                        break;
                    default:
                        message = "Un événement est programmé";
                        break;
                }
                break;
            case "new_event":
                title = "Nouvel événement disponible";
                icon = (
                    <CalendarIcon
                        size={18}
                        color={colorTheme?.isDark ?? false ? colors.gray300 : colors.black}
                    />
                );
                message = "Un nouvel événement est disponible le " + dateEvent;
                break;
            case "ranking":
                title = "Changement sur le classement";
                icon = (
                    <AwardIcon
                        size={18}
                        color={colorTheme?.isDark ?? false ? colors.gray300 : colors.black}
                    />
                );
                switch (subtype) {
                    case "new_level":
                        message = "Tu as atteint le niveau " + levelAmbassador;
                        break;
                    case "podium":
                        message = "Tu es classé " + levelPodium + " au classement général";
                        break;
                    case "form_ambassador":
                        message = "Tu as complété " + stepForm + " formulaires";
                        break;
                    default:
                        message = "Tu as atteint un nouveau niveau";
                        break;
                }
                break;
            case "participation_event":
                title = "Nouvelle activité sur un événement";
                icon = (
                    <ClipboardIcon
                        size={18}
                        color={colorTheme?.isDark ?? false ? colors.gray300 : colors.black}
                    />
                );
                switch (subtype) {
                    case "admin_register":
                        message = "Tu as été inscrit à l'événement " + nameEvent;
                        break;
                    case "event_validation":
                        message = "Ta participation à l'événement " + nameEvent + " est validée";
                        break;
                    case "event_rejection":
                        message = "Ta participation à l'événement " + nameEvent + " est refusée";
                        break;
                    default:
                        message = "Une action s'est produite te concernant sur l'un des événements";
                        break;
                }
                break;
            default:
                title = "Une action a eu lieu";
                icon = (
                    <EditIcon size={18} color={colorTheme?.isDark ?? false ? colors.gray300 : colors.black}/>
                );
                message = "Quelque chose s'est produit récemment";
                break;
        }
        return {title, icon, message};
    };
    const DeleteNotification = (notification: Notification): void => {
        if (typeof notification.delete === "function") {
            void notification.delete((resp: any) => {
                onDelete(notification._id);
            });
        } else {
            console.error("No function to delete the notification.");
        }
    };

    const currentNotif = useRef<Swipeable>(null);

    const colorTheme = useContext(ThemeContext);

    return (
        <GestureHandlerRootView>
            <TouchableOpacity
                onPress={() => {
                    router.navigate(`/(app)/(tabs)/${idEvent}`);
                }}
            >
                <Swipeable
                    ref={currentNotif}
                    overshootRight={false}
                    renderRightActions={() => (
                        <>
                            <View
                                style={[
                                    styles.backgroundSwipeable,
                                    {
                                        width: width * 0.9,
                                        marginHorizontal: width * 0.05,
                                        marginTop: 15,
                                    },
                                ]}
                            ></View>
                            <View style={styles.deleteIcon}>
                                <DeleteIcon size={30} color={hexToRgbA(colors.errorLight, 0.7)}/>
                            </View>
                        </>
                    )}
                    onSwipeableWillOpen={() => {
                        DeleteNotification(notification);
                    }}
                >
                    <View
                        style={[
                            styles.container,
                            {
                                marginHorizontal: width * 0.05,
                                marginTop: 15,
                                borderLeftWidth: 5,
                                borderLeftColor: colorTheme?.colors.primaryExtraLight,
                            },
                        ]}
                        darkColor={hexToRgbA(colors.white, 0.16)}
                        lightColor={colors.gray300}
                    >
                        <View style={styles.notificationHeader}>
                            <View
                                style={[
                                    styles.iconContainer,
                                    {backgroundColor: colorTheme?.colors.primaryExtraLight},
                                ]}
                            >
                                {switchEvent().icon}
                            </View>

                            <Text
                                bold
                                style={styles.notificationTitle}
                                lightColor={colors.black}
                                darkColor={colors.gray300}
                            >
                                {switchEvent().title}
                            </Text>
                        </View>

                        <View style={styles.notificationDetails}>
                            <Text lightColor={colors.black} darkColor={colors.gray300}>
                                {switchEvent().message}
                            </Text>
                            <Text
                                style={styles.notificationDate}
                                darkColor={colors.gray200}
                                lightColor={colors.gray600}
                            >
                                {timestamp?.toLocaleString()}
                            </Text>
                        </View>
                    </View>
                </Swipeable>
            </TouchableOpacity>
        </GestureHandlerRootView>
    );
}
