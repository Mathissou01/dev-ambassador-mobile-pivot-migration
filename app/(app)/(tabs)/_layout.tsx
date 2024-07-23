import {Redirect, router, Tabs} from 'expo-router';
import React, {useContext, useRef} from 'react';
import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import useColorScheme, {ThemeContext} from '@/hooks/useColorScheme';
import {useAppSelector} from "@/hooks/store";
import {
    type RootStackParamList,
    type RootTabParamList,
    type RootTabScreenProps,
    type SchoolIconColors,
    type UserState,
} from "@/types";
// Import light school logo
import Webtech_light from "@/assets/images/school/light/Webtech_logo-min_light.png";
import Escen_light from "@/assets/images/school/light/Escen_logo-min_light.png";
import Magnum_light from "@/assets/images/school/light/Magnum_logo-min_light.png";
import Bachelor_light from "@/assets/images/school/light/Bachelor_logo-min_light.png";
import Atlas_light from "@/assets/images/school/light/Atlas_logo-min_light.png";
// Import dark school logo
import Webtech_dark from "@/assets/images/school/dark/Webtech_logo-min_dark.png";
import Escen_dark from "@/assets/images/school/dark/Escen_logo-min_dark.png";
import Magnum_dark from "@/assets/images/school/dark/Magnum_logo-min_dark.png";
import Bachelor_dark from "@/assets/images/school/dark/Bachelor_logo-min_dark.png";
import Atlas_dark from "@/assets/images/school/dark/Atlas_logo-min_dark.png";
// TODO - remove TMP
import { Animated, Dimensions, Image, Platform, Pressable, TouchableOpacity } from "react-native";
import {AwardIcon, BellIcon, BurgerMenuIcon} from "@/components/IconComponent";
import {colors} from "@/config/styles/01-settings/_colors";
import styles from "@/styles/Navigation";

export default function TabLayout() {
    const themeContext = useContext(ThemeContext);
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";
    const userInfos: UserState = useAppSelector((state) => state.userInfos);
    const logoToDisplay = {
        "WebTech Institute": isDark ? Webtech_dark : Webtech_light,
        "ATLAS Institute": isDark ? Atlas_dark : Atlas_light,
        "Magnum Institute": isDark ? Magnum_dark : Magnum_light,
        "Bachelor Institute": isDark ? Bachelor_dark : Bachelor_light,
        "ESCEN": isDark ? Escen_dark : Escen_light
    };

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    headerTitleAlign: 'center',
                    headerShown: true,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                    ),
                    headerTitle: () => (
                        <Image
                            source={logoToDisplay[userInfos?.school?.name ?? "ESCEN"]} // School Icon from the user
                            style={styles.schoolLogo}
                        />
                    ),
                    headerLeft: () => (
                        <TouchableOpacity
                            style={[styles.headerBtnContainer]}
                            onPress={() => router.navigate("/(app)/(screens)/leaderboard")}
                            hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
                        >
                            <AwardIcon
                                size={20}
                                color={themeContext?.isDark ?? false ? "white" : "black"}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            style={[styles.headerBtnContainer]}
                            onPress={() => router.navigate("/(app)/(screens)/notification")}
                            hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
                        >
                            <BellIcon
                                size={20}
                                color={themeContext?.isDark ?? false ? "white" : "black"}
                            />
                        </TouchableOpacity>
                    ),
                    headerStyle: {
                        backgroundColor: (themeContext?.isDark
                            ? themeContext?.colors.primarySemiDark
                            : themeContext?.colors.primarySemiLight) ?? "red",
                    },
                }}
            />
            <Tabs.Screen
                name="list-form"
                options={{
                    title: 'Formulaire',
                    headerTitleAlign: 'center',
                    headerShown: true,
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'clipboard' : 'clipboard-outline'} color={color}/>
                    ),
                    headerStyle: {
                        backgroundColor:
                            (themeContext?.isDark
                                ? themeContext?.colors.primarySemiDark
                                : themeContext?.colors.primarySemiLight) ?? "red",
                    },
                    headerTitleStyle: {
                        fontSize: 17,
                        fontFamily: "Raleway-Bold",
                        color: themeContext?.isDark ? colors.textDark : colors.textLight,
                    },
                }}
            />
            <Tabs.Screen
                name="archive"
                options={{
                    title: 'Archive',
                    headerTitleAlign: 'center',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'archive' : 'archive-outline'} color={color}/>
                    ),
                    headerStyle: {
                        backgroundColor:
                            (themeContext?.isDark
                                ? themeContext?.colors.primarySemiDark
                                : themeContext?.colors.primarySemiLight) ?? "red",
                    },
                    headerTitleStyle: {
                        fontSize: 17,
                        fontFamily: "Raleway-Bold",
                        color: themeContext?.isDark ? colors.textDark : colors.textLight,
                    },
                }}
            />
            <Tabs.Screen
                name="[calendar]"
                options={{
                    title: 'Calendrier',
                    headerTitleAlign: 'center',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color}/>
                    ),
                    headerStyle: {
                        backgroundColor:
                            (themeContext?.isDark
                                ? themeContext?.colors.primarySemiDark
                                : themeContext?.colors.primarySemiLight) ?? "red",
                    },
                    headerTitleStyle: {
                        fontSize: 17,
                        fontFamily: "Raleway-Bold",
                        color: themeContext?.isDark ? colors.textDark : colors.textLight,
                    },
                    // Allows to call the route with default parameter 'undefined'
                    href: {
                        pathname: '/[calendar]',
                        params: {
                            calendar: "undefined",
                        },
                    },
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: 'Compte',
                    headerTitleAlign: 'center',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={"body"} color={color}/>
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            style={[styles.headerBtnContainer]}
                            onPress={() => router.navigate("/(app)/(screens)/parameters")}
                            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
                        >
                            <BurgerMenuIcon
                                size={20}
                                color={themeContext?.isDark ?? false ? "white" : "black"}
                            />
                        </TouchableOpacity>
                    ),
                    headerStyle: {
                        backgroundColor:
                            (themeContext?.isDark
                                ? themeContext?.colors.primarySemiDark
                                : themeContext?.colors.primarySemiLight) ?? "red",
                    },
                    headerTitleStyle: {
                        fontSize: 17,
                        fontFamily: "Raleway-Bold",
                        color: themeContext?.isDark ? colors.textDark : colors.textLight,
                    },
                }}
            />
        </Tabs>
    );
}
