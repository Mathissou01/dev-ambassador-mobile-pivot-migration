import React, {useContext} from "react";
import {FlatList, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text, View} from "@/components/Themed";
import {type ContentItem, type ContentType, type Props} from "@/types";
import styles from "@/styles/profil-settings/AboutStyle";
import {ThemeContext} from "@/hooks/useColorScheme";
import {hexToRgbA} from "@/utils/hexToRgbA";
import {colors} from "@/config/styles/01-settings/_colors";
import {ChevronRightIcon} from "@/components/IconComponent";

export default function About({navigation}: Props): React.JSX.Element {
    const themeColor = useContext(ThemeContext);

    const contentTypes: ContentItem[] = [
        {
            id: 1,
            name: "Politique de confidentialité",
            contentType: "confidentialityPolicy",
        },
        {
            id: 2,
            name: "Conditions d'utilisation",
            contentType: "thermOfUsePolicy",
        },
        {
            id: 3,
            name: "Mentions légales",
            contentType: "legalMentionPolicy",
        },
        {
            id: 4,
            name: "Règlement FR & UE",
            contentType: "EuropeanReglementationPolicy",
        },
    ];

    const navigateToContent = (contentType: ContentType): void => {
        navigation.navigate("ContentPolicyScreen", {contentType});
    };

    const renderCategoryList = (item: ContentItem): React.JSX.Element => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigateToContent(item.contentType);
                }}
            >
                <View
                    style={[
                        styles.blockParameter,
                        {
                            borderColor:
                                themeColor?.isDark ?? false ? hexToRgbA(colors.white, 0.07) : colors.gray200,
                        },
                    ]}
                    darkColor={hexToRgbA(colors.white, 0.07)}
                    lightColor={colors.white}
                >
                    <Text
                        style={[{marginLeft: 10}, styles.text]}
                        darkColor={colors.textDark}
                        lightColor={colors.textLight}
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
    };

    return (
        <SafeAreaView
            style={[
                styles.container,
                {
                    backgroundColor:
                        themeColor?.isDark ?? false ? colors.backgroundDark : colors.backgroundDefault,
                },
            ]}
        >
            <View style={{backgroundColor: "transparent"}}>
                <FlatList
                    scrollEnabled={false}
                    data={contentTypes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => renderCategoryList(item)}
                />
            </View>
        </SafeAreaView>
    );
}
