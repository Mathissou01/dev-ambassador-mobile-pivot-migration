import {Redirect, router, Tabs} from 'expo-router';
import React, {useContext, useRef} from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import useColorScheme, {ThemeContext} from '@/hooks/useColorScheme';
import {useAppSelector} from "@/hooks/store";
import {selectUserInfos} from "@/redux/UserInfos/UserInfosSlice";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";
import { useThemeColor, View } from "@/components/Themed";

// TODO - remove TMP
import { Animated, Dimensions, Image, Platform, Pressable, TouchableOpacity } from "react-native";
import {AwardIcon, BellIcon, BurgerMenuIcon} from "@/components/IconComponent";
import {colors} from "@/config/styles/01-settings/_colors";
import styles from "@/styles/Navigation";

export default function TabLayout() {
    const themeContext = useContext(ThemeContext);
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Accueil',
                    headerTitleAlign: 'center',
                    headerShown: true,
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}/>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity
                            style={[styles.headerBtnContainer]}
                            onPress={() => router.navigate("/(app)/(screens)/leaderboard")}
                            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
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
                            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
                        >
                            <BellIcon
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
