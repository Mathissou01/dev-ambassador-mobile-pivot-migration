import React, {ReactNode, useContext, useEffect, useState} from "react";
import {Animated, Dimensions, Linking, TouchableOpacity} from "react-native";
// import * as Calendar from "expo-calendar";
import {useNavigation} from "@react-navigation/native";
import {startBlinkAnimation} from "@/utils/AnimationLib";
import useColorScheme, {ThemeContext} from "@/hooks/useColorScheme";
import {hexToRgbA} from "@/utils/hexToRgbA";
import {colors} from "@/config/styles/01-settings/_colors";
import {Text, View} from "@/components/Themed";
import {CalendarIcon, InterogationPointIcon, LocationPinIcon} from "@/components/IconComponent";
import styles from "./NextEventBlockStyle";
import {router} from "expo-router";

export default function NextEventBlock({
                                           nbFuturEvent,
                                           eventInfo,
                                       }: {
    nbFuturEvent: number;
    eventInfo?: any;
}): ReactNode {
    const navigation = useNavigation();
    const themeColor = useContext(ThemeContext);
    const {width} = Dimensions.get("window");

    const title = eventInfo
        ? "Ton prochain évènement"
        : nbFuturEvent !== undefined && nbFuturEvent !== null
            ? `${nbFuturEvent} évènement${nbFuturEvent > 1 ? "s" : ""} disponible${
                nbFuturEvent > 1 ? "s" : ""
            }`
            : "Aucun évènement disponible";

    const handleNavigationPress = (): void => {
        if (!eventInfo) {
            router.navigate("/(app)/(tabs)/calendar");
            // navigation.navigate("Calendrier");
        } else {
            const url = `https://www.google.com/maps/search/?api=1&query=${eventInfo.rdv_address}`;

            Linking.openURL(url).catch((error) => {
                console.error(`Error opening navigation app: ${error}`);
            });
        }
    };
    // Accessibility
    const [blinkAnimation] = useState(new Animated.Value(0.6));
    useEffect(() => {
        startBlinkAnimation(blinkAnimation, 0.6);
    }, []);

    const monthString = [
        "Janv",
        "Fev",
        "Mars",
        "Avr",
        "Mai",
        "Juin",
        "Juil",
        "Aout",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];

    // THEME HANDLER
    const isDark = useColorScheme() === "dark";

    // DYNAMIC CLICKABLE CALENDAR
    const DynamicCalendar = eventInfo ? TouchableOpacity : View;

    return (
        <View
            style={[
                styles.container_calendar,
                styles.shadowProp,
                {
                    marginHorizontal: width * 0.04,
                    backgroundColor: isDark ? hexToRgbA(colors.white, 0.11) : colors.gray300,
                },
            ]}
        >
            <Text style={styles.event_title}>{title}</Text>
            <View style={styles.info_event}>
                {/* Bloc qui dessine le mini calendrier et son date intérieur */}
                {/* Rectangle en blanc */}
                <DynamicCalendar
                    style={[
                        styles.calendar_draw,
                        {backgroundColor: isDark ? colors.gray500 : colors.white},
                    ]}
                    onPress={() => {
                        // void createEvent(eventInfo);
                    }}
                >
                    {/* Rectangle rouge / haut du calendrier */}
                    <View
                        style={[
                            styles.topcalendar_draw,
                            {backgroundColor: themeColor?.colors?.primarySemiLight},
                        ]}
                    >
                        {/* Les petites spirale du calendrier / les trois petit rectangle en gris */}
                        <View style={styles.order_spirale_draw}>
                            <View
                                style={[
                                    styles.spirale_draw,
                                    {backgroundColor: isDark ? colors.gray700 : colors.gray800},
                                ]}
                            ></View>
                            <View
                                style={[
                                    styles.spirale_draw,
                                    {backgroundColor: isDark ? colors.gray700 : colors.gray800},
                                ]}
                            ></View>
                            <View
                                style={[
                                    styles.spirale_draw,
                                    {backgroundColor: isDark ? colors.gray700 : colors.gray800},
                                ]}
                            ></View>
                        </View>
                    </View>
                    {/* Info du calendrier donc la date et le mois */}
                    <View style={styles.calendar_info}>
                        {eventInfo && (
                            <>
                                <Text style={[styles.calendar_date_title]}>
                                    {eventInfo.start_date.getDate() ?? "?"}
                                </Text>
                                <Text style={styles.calendar_date_subtitle}>
                                    {monthString[eventInfo.start_date.getMonth() ?? 0]}
                                </Text>
                            </>
                        )}
                        {!eventInfo && (
                            <InterogationPointIcon
                                width={65}
                                height={65}
                                fill={isDark ? colors.white : colors.black}
                                color={isDark ? colors.white : colors.black}
                            />
                        )}
                    </View>
                </DynamicCalendar>
                {/* Bloc de droite qui affiche les infos de l'event donc emplacement et heure */}
                <View
                    style={Object.assign({}, styles.text_info_all, {
                        marginBottom: 8,
                    })}
                >
                    <View style={styles.text_area_time}>
                        {eventInfo && (
                            <>
                                {/* Mettre le prochain event de l'élève */}
                                <Text style={styles.text_subtitle_hour}>
                                    {eventInfo.start_date.getHours() +
                                        "h" +
                                        (eventInfo.start_date.getMinutes() > 0
                                            ? String(eventInfo.start_date.getMinutes()).padStart(2, "0")
                                            : "")}
                                    &nbsp;-&nbsp;
                                    {eventInfo.end_date.getHours() +
                                        "h" +
                                        (eventInfo.end_date.getMinutes() > 0
                                            ? String(eventInfo.end_date.getMinutes()).padStart(2, "0")
                                            : "")}
                                </Text>
                                <Text style={styles.text_subtitle}>{eventInfo.rdv_address.trim()}</Text>
                                {/* NOT STORED IN THE DATA BASE */}
                                {/* <Text style={progressBarStyle.text_subtitle}>69008 Lyon</Text> */}
                            </>
                        )}
                        {!eventInfo && (
                            <>
                                <Text style={styles.text_subtitle}>Rejoins-nous sur un futur évènement!</Text>
                            </>
                        )}
                    </View>
                    <TouchableOpacity onPress={handleNavigationPress}>
                        <Animated.View
                            style={[
                                styles.navigationButton,
                                {
                                    opacity: blinkAnimation,
                                    backgroundColor: isDark ? hexToRgbA(colors.white, 0.2) : colors.gray200,
                                },
                            ]}
                        >
                            {eventInfo ? (
                                <LocationPinIcon size={22} color={isDark ? colors.textDark : colors.textLight}/>
                            ) : (
                                <CalendarIcon size={22} color={isDark ? colors.textDark : colors.textLight}/>
                            )}
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

// async function getDefaultCalendarSource(): Promise<string> {
//     const calendars = await Calendar.getCalendarsAsync();
//     const ambassadorCalendar = calendars.find((cal) => cal.title === "Ambassador");
//     if (ambassadorCalendar) {
//         return ambassadorCalendar.id;
//     }
//     return await createCalendar();
// }

// async function createCalendar(): Promise<string> {
//     const defaultCalendarSource =
//         Platform.OS === "ios"
//             ? (await Calendar.getDefaultCalendarAsync())?.source.id
//             : {
//                 isLocalAccount: true,
//                 name: "Ambassador",
//             };
//     return await Calendar.createCalendarAsync({
//         title: "Ambassador",
//         color: "#1d85c7",
//         entityType: Calendar.EntityTypes.EVENT,
//         sourceId: defaultCalendarSource.id,
//         source: defaultCalendarSource,
//         name: "internalCalendarName",
//         ownerAccount: "personal",
//         accessLevel: Calendar.CalendarAccessLevel.OWNER,
//     });
// }

// async function createEvent(eventInfos: Evenement): Promise<void> {
//     const {status} = await Calendar.requestCalendarPermissionsAsync();
//     if (status === "granted") {
//         const calendarId = await getDefaultCalendarSource();
//         if (calendarId) {
//             if (eventInfos.start_date && eventInfos.end_date) {
//                 const diff = Math.abs(
//                     new Date(eventInfos.start_date).getTime() - new Date(eventInfos.end_date).getTime()
//                 );
//                 const eventObj = {
//                     title: eventInfos.name ?? "Evènement ambassador",
//                     startDate: new Date(eventInfos.start_date),
//                     endDate: new Date(eventInfos.end_date),
//                     location: eventInfos.rdv_address,
//                     alarms: [{relativeOffset: -Math.floor(diff / 1000 / 60)}],
//                     status: Calendar.EventStatus.CONFIRMED,
//                     accessLevel: Calendar.CalendarAccessLevel.OWNER,
//                     notes:
//                         "RDV : " +
//                         eventInfos.rdv_date?.toLocaleDateString() +
//                         " à " +
//                         eventInfos.rdv_date?.toLocaleTimeString(),
//                 };
//                 const newevent = await Calendar.createEventAsync(calendarId, eventObj);
//                 if (newevent) {
//                     Alert.alert(
//                         "Evenement ajouté au calendrier",
//                         "L'évènement a bien été ajouté au calendrier."
//                     );
//                 } else {
//                     Alert.alert(
//                         "Erreur d'enregistrement",
//                         "Une erreur est survenue lors de l'ajout de l'évènement à votre calendrier."
//                     );
//                 }
//             } else {
//                 Alert.alert(
//                     "Erreur d'enregistrement",
//                     "Une erreur est survenue lors de l'ajout de l'évènement à votre calendrier."
//                 );
//             }
//         }
//     } else {
//         Alert.alert(
//             "Accès refusé",
//             "L'application n'a pas accès à votre calendrier. Veuillez modifier l'accès au calendrier de l'application dans les réglages de votre appareil."
//         );
//     }
// }
