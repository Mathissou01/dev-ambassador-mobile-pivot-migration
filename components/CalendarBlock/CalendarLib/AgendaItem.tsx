import React, {memo, useContext, useEffect, useState} from "react";
import {Animated, TouchableOpacity} from "react-native";
import isEmpty from "lodash/isEmpty";
import ModalCalendar from "../ModalCalendar";
import {type ItemProps} from "./types";
import {useAppSelector} from "@/hooks/store";
import {type RootState} from "@/redux";
import {Text, View} from "@/components/Themed";
import {type UserState} from "@/types";
import {startBlinkAnimation} from "@/utils/AnimationLib";
import {colors} from "@/config/styles/01-settings/_colors";
import {ThemeContext} from "@/hooks/useColorScheme";
import {LinearGradient} from "expo-linear-gradient";
import styles from "../CalendarStyle";

const AgendaItem = (props: ItemProps): React.JSX.Element => {
    const {isSelected, item, isLast, doRefresh} = props;

    const themeColor = useContext(ThemeContext);

    const listStatus = ["pending", "valid", "not_valid", "not_valid"];

    if (isEmpty(item)) {
        return (
            <View style={styles.emptyItem}>
                <Text style={styles.emptyItemText}>Aucun évènement disponible</Text>
            </View>
        );
    }

    useEffect(() => {
        setModalVisible(isSelected ?? false);
    }, [isSelected]);

    const [modalVisible, setModalVisible] = useState(false);

    const buttonPressed = (): void => {
        setModalVisible(true);
    };

    const closeModal = (): void => {
        setModalVisible(false);
        if (typeof doRefresh === "function") {
            doRefresh();
        }
    };

    const debutHour = item.debut_hour ? item.debut_hour.getTime() : 0;
    const endHour = item.end_hour ? item.end_hour.getTime() : 0;
    const durationInMilliseconds = endHour - debutHour;

    const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

    let duration = "";

    if (hours >= 24) {
        const days = Math.floor(hours / 24);
        const remainingHours = hours % 24;

        duration = `${days}j ${remainingHours}h${minutes}min`;
    } else if (hours > 1) {
        duration = `${hours}h${minutes}min`;
    } else {
        duration = `${minutes}min`;
    }

    const hourOptions: {
        hour: "numeric" | "2-digit" | undefined;
        minute: "numeric" | "2-digit" | undefined;
        hour12: boolean;
    } = {
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
    };

    // COMPUTE STATUS
    const userInfos: UserState = useAppSelector((state: RootState) => state.userInfos);

    const status: number = parseInt(
        item.participationStatus
            ?.filter((participant: Array<string | number>) => participant[0] === userInfos._id)
            .map((part: Array<string | number>) => part[1])?.[0]
    );

    const status_str =
        status === 1
            ? "valid"
            : item?.actual_seat === item?.max_seat ||
            !item?.represented_school?.includes(userInfos.school._id)
                ? "not_valid"
                : isNaN(status)
                    ? "participate"
                    : listStatus[isNaN(status) ? 3 : status];

    // Animated color
    const [blinkAnimation] = useState(new Animated.Value(0.1));

    let borderColor;
    if (status_str === "participate") {
        // DISPONIBLE POUR INSCRIPTION
        borderColor = blinkAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ["rgba(120, 120, 120, .2)", "rgba(120, 120, 120, 1)"],
        });
    } else if (status_str === "pending") {
        // EN ATTENTE
        borderColor = blinkAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ["rgba(255, 165, 0, .2)", "rgba(255, 165, 0, 1)"],
        });
    } else if (status_str === "not_valid") {
        // REFUSER
        borderColor = `rgba(255, 0, 0, 1)`;
    } else if (status_str === "valid") {
        // INSCRIT
        borderColor = `rgba(60, 179, 113, 1)`;
    }
    startBlinkAnimation(blinkAnimation, 0.2);

    // !!!
    return (
        <>
            <TouchableOpacity
                onPress={buttonPressed}
                testID={item.event_id}
                style={{marginBottom: isLast ? 130 : 0, flex: 1, paddingVertical: 10}}
            >
                <Animated.View
                    style={{
                        ...styles.blinkingContainer,
                        backgroundColor: borderColor,
                        paddingRight: 0,
                    }}
                >
                    <LinearGradient
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 1,
                            paddingLeft: 6,
                            width: '100%'
                        }}
                        start={{x: 0.3, y: 0.5}}
                        end={{x: 0.7, y: 0.5}}
                        colors={[
                            "transparent",
                            themeColor?.isDark ? colors.backgroundDark : colors.backgroundDefault,
                        ]}
                    >
                        <Animated.View
                            style={{
                                ...styles.item,
                                backgroundColor: themeColor?.isDark ? colors.inputDark : colors.white,
                            }}
                        >
                            <View
                                style={{backgroundColor: "transparent", minWidth: 60, justifyContent: "center"}}
                            >
                                <Text style={[{color: themeColor?.isDark ? colors.white : colors.black}]}>
                                    {item.debut_hour?.toLocaleTimeString([], hourOptions).replace(":", "h")}
                                </Text>
                                <Text style={styles.itemDurationText}>{duration}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text
                                    bold
                                    style={[
                                        styles.itemTitleText,
                                        {color: themeColor?.isDark ? colors.white : colors.black},
                                    ]}
                                    numberOfLines={2}
                                >
                                    {item.title}
                                </Text>
                            </View>
                            <ModalCalendar
                                open={modalVisible}
                                onClose={closeModal}
                                data={item}
                                hourOptions={hourOptions}
                            />
                        </Animated.View>
                    </LinearGradient>
                </Animated.View>
            </TouchableOpacity>
        </>
    );
};

export default memo(AgendaItem);
