import {router, Stack} from "expo-router";
import {ThemeContext} from "@/hooks/useColorScheme";
import {useContext} from "react";
import {colors} from "@/config/styles/01-settings/_colors";
import {ChevronLeftIcon} from "@/components/IconComponent";
import {TouchableOpacity} from "react-native";
import styles from "@/styles/Navigation";

export default function StacksLayout() {
    const themeContext = useContext(ThemeContext);

    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="leaderboard"
                options={{
                    title: "Classement",
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
                                : themeContext?.colors.primarySemiLight) ?? "red",
                    },
                    headerTitleStyle: {
                        fontSize: 17,
                        fontFamily: "Raleway-Bold",
                        color: themeContext?.isDark ? colors.textDark : colors.textLight,
                    },
                }}
            />
        </Stack>
    );
}
