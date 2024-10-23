import {router, Stack, useGlobalSearchParams} from "expo-router";
import {TouchableOpacity} from "react-native";
import {ChevronLeftIcon} from "@/components/IconComponent";
import {colors} from "@/config/styles/01-settings/_colors";
import {useContext} from "react";
import {ThemeContext} from "@/hooks/useColorScheme";
import aboutData from "@/constants/AboutData.json";
import type {ContentItem} from "@/types";

export default function StacksLayout() {
    const themeContext = useContext(ThemeContext);

    const {"content-type": contentType} = useGlobalSearchParams<{ "content-type": string }>();

    const contentItem = (aboutData as ContentItem[]).find(s => s.contentType === contentType);

    return (
        <Stack screenOptions={{
            headerShown: true,
            headerTitleAlign: "center",
            headerLeft: () => {
                return <TouchableOpacity
                    onPress={() => router.back()}
                    hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
                >
                    <ChevronLeftIcon
                        size={20}
                        color={themeContext?.isDark ?? false ? "white" : "black"}
                    />
                </TouchableOpacity>
            },
            headerStyle: {
                backgroundColor:
                    (themeContext?.isDark
                        ? themeContext?.colors.primarySemiDark
                        : themeContext?.colors.primarySemiLight),
            },
            headerTitleStyle: {
                fontSize: 17,
                fontFamily: "Raleway-Bold",
                color: themeContext?.isDark ? colors.textDark : colors.textLight,
            },
        }}>
            <Stack.Screen
                name="notification-edit"
                options={{
                    title: "Paramètre de notifications"
                }}/>
            <Stack.Screen
                name="help"
                options={{
                    title: 'Aide'
                }}
            />
            <Stack.Screen
                name="about"
                options={{
                    title: 'À propos'
                }}
            />
            <Stack.Screen
                name="character-edit"
                options={{
                    title: 'Modifier mon avatar'
                }}
            />
            <Stack.Screen
                name="security-edit"
                options={{
                    title: 'Sécurité'
                }}
            />
            <Stack.Screen
                name="user-edit"
                options={{
                    title: 'Informations',
                    headerBackButtonMenuEnabled: false,
                }}
            />
            <Stack.Screen
                name="about-details"
                options={{
                    title: contentItem?.name ?? "Infos"
                }}
            />
            <Stack.Screen
                name="music-edit"
                options={{
                    title: "Musique"
                }}
            />
        </Stack>
    );
}
