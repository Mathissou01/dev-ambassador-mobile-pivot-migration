import React, {useContext} from 'react'
import {router, Stack} from "expo-router";
import {TouchableOpacity} from "react-native";
import {ChevronLeftIcon} from "@/components/IconComponent";
import {colors} from "@/config/styles/01-settings/_colors";
import {ThemeContext} from "@/hooks/useColorScheme";

export default function Layout(): React.JSX.Element {
    const themeContext = useContext(ThemeContext);

    return (
        <Stack screenOptions={{
            headerShown: true,
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
            <Stack.Screen name="[id]"/>
            <Stack.Screen name="story" options={{headerShown: false}}/>
        </Stack>
    )
}
