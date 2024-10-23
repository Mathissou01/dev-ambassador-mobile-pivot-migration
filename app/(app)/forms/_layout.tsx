import {Stack, useLocalSearchParams, useRouter} from "expo-router";
import React, {useContext} from "react";
import {TouchableOpacity} from "react-native";
import {ChevronLeftIcon} from "@/components/IconComponent";
import {colors} from "@/config/styles/01-settings/_colors";
import {ThemeContext} from "@/hooks/useColorScheme";

export default function Layout() {
    const themeContext = useContext(ThemeContext);
    const router = useRouter();
    const {title} = useLocalSearchParams() || "Formulaires"; // Utilisation du hook pour obtenir les paramètres

    return (
        <Stack
            screenOptions={{
                title: typeof title === "string" ? title : title?.join(" - "),
                headerShown: true,
                headerLeft: () => {
                    return (
                        <TouchableOpacity
                            onPress={() => router.back()}
                            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
                        >
                            <ChevronLeftIcon
                                size={20}
                                color={themeContext?.isDark ?? false ? "white" : "black"}
                            />
                        </TouchableOpacity>
                    );
                },
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
                headerTitleAlign: "center"
            }}
        >
            <Stack.Screen
                name="info-school"
                options={{headerShown: true, title: "Informations"}}
            />
            <Stack.Screen name="[id]"/>
        </Stack>
    );
}
