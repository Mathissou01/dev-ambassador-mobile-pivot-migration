import React, {useContext, useState} from "react";
import {FlatList, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, Text, View} from "@/components/Themed";
import {type elementCategory, type itemNavigation} from "@/types";
import {colors} from "@/config/styles/01-settings/_colors";
import {ThemeContext} from "@/hooks/useColorScheme";
import {
    AboutIcon,
    BellIcon,
    BubbleIcon,
    ChevronRightIcon,
    EditIcon,
    LockIcon,
    LogoutIcon,
} from "@/components/IconComponent";
import {hexToRgbA} from "@/utils/hexToRgbA";
import styles from "@/styles/screens/ParametersStyle";
import {router, useNavigation} from 'expo-router';

export default function ParametersScreen(): React.JSX.Element {
    const navigation = useNavigation();
    const themeColor = useContext(ThemeContext);

    const iconComponents = {
        EditIcon,
        LockIcon,
        BellIcon,
        BubbleIcon,
        AboutIcon,
        LogoutIcon,
    };

    const [categoryList] = useState<itemNavigation[]>([
        {
            id: 1,
            name: "Modifier mes informations",
            url: "/(app)/profil-settings/user-edit",
            category: "contenu",
            nameIcon: "EditIcon",
        },
        {
            id: 2,
            name: "Notifications",
            url: "/(app)/profil-settings/notification-edit",
            category: "préférences",
            nameIcon: "BellIcon",
        },
        {
            id: 3,
            name: "Sécurité",
            url: "/(app)/profil-settings/security-edit",
            category: "contenu",
            nameIcon: "LockIcon",
        },
        {
            id: 4,
            name: "Aide",
            url: "/(app)/profil-settings/help",
            category: "informations",
            nameIcon: "BubbleIcon",
        },
        {
            id: 5,
            name: "A propos",
            url: "/(app)/profil-settings/about",
            category: "informations",
            nameIcon: "AboutIcon",
        },
        {
            id: 6,
            name: "Déconnexion",
            url: "/(auth)/logout",
            category: "autre",
            nameIcon: "LogoutIcon",
        },
    ]);

    function renderCategoryList(item: itemNavigation, _index: number): React.JSX.Element {
        const IconComponent = iconComponents[item.nameIcon!];
        return (
            <TouchableOpacity
                onPress={() => {
                    if (item.url === "/(auth)/logout") {
                        router.navigate(item.url);
                    } else {
                        router.navigate(item.url);
                    }
                }}
            >
                <View
                    style={[
                        styles.blockParameter,
                        {borderColor: themeColor?.isDark ?? false ? "transparent" : colors.gray200},
                    ]}
                    darkColor={"rgba(255, 255, 255, 0.07)"}
                    lightColor={colors.white}
                >
                    <IconComponent
                        size={20}
                        color={themeColor?.isDark ?? false ? colors.textDark : colors.textLight}
                    />
                    <Text
                        lightColor={colors.textLight}
                        darkColor={colors.textDark}
                        style={[{marginLeft: 10}, styles.subCategory]}
                    >
                        {item.name}
                    </Text>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "transparent",
                            alignItems: "flex-end",
                        }}
                    >
                        <View
                            style={[
                                styles.icon,
                                {
                                    backgroundColor:
                                        themeColor?.isDark ?? false ? "rgba(255, 255, 255, 0.16)" : colors.gray200,
                                },
                            ]}
                        >
                            <ChevronRightIcon
                                size={14}
                                color={themeColor?.isDark ?? false ? hexToRgbA(colors.white, 0.5) : colors.black}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    const categories = categoryList.reduce((element: elementCategory, item) => {
        if (item.category !== undefined) {
            if (element[item.category] === undefined) {
                element[item.category] = [];
            }
            element[item.category].push(item);
        }
        return element;
    }, {});

    return (
        <ScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            lightColor={colors.backgroundDefault}
            darkColor={colors.backgroundDark}
        >
            <SafeAreaView
                edges={["bottom", "left", "right"]}
                style={[
                    styles.container,
                    {
                        backgroundColor:
                            themeColor?.isDark ?? false ? colors.backgroundDark : colors.backgroundDefault,
                        marginTop: 20,
                    },
                ]}
            >
                {Object.keys(categories).map((category, index) => {
                    return (
                        <View key={index} style={{backgroundColor: "transparent"}}>
                            <View style={styles.titleCategory}>
                                <Text
                                    bold
                                    style={styles.textCategory}
                                    lightColor={colors.textLight}
                                    darkColor={colors.textDark}
                                >
                                    {category}
                                </Text>
                            </View>
                            <FlatList
                                scrollEnabled={false}
                                data={categories[category]}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({item, index}) => renderCategoryList(item, index)}
                            />
                        </View>
                    );
                })}
            </SafeAreaView>
        </ScrollView>
    );
}
