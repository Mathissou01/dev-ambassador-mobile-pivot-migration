import React, {ReactNode, useContext, useEffect, useState} from "react";
import {Linking, Platform, ScrollView, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text, View} from "@/components/Themed";
import {type ArticlePolicyData, type ArticleSubtitleData, type ContentItem} from "@/types";
import {colors} from "@/config/styles/01-settings/_colors";
import {ThemeContext} from "@/hooks/useColorScheme";
import {ChevronDownIcon, ChevronUpIcon} from "@/components/IconComponent";
import articleData from "@/constants/ArticleData.json";
import styles from "@/styles/profil-settings/about/ContentPolicyScreenStyle";
import {useLocalSearchParams, useNavigation} from "expo-router";
import aboutData from "@/constants/AboutData.json";

export default function AboutIndex(): ReactNode | null {
    const navigation = useNavigation();
    const {"content-type": contentType} = useLocalSearchParams<{ "content-type": string }>();
    const themeColor = useContext(ThemeContext);

    useEffect(()=>{
        const contentItem = (aboutData as ContentItem[]).find(s => s.contentType === contentType);
        navigation.setOptions({
            title: "ICI"
        })
    }, []);

    if (!(contentType ?? "" in articleData)) {
        return null;
    }

    const contentData: ArticlePolicyData[] = articleData[contentType as keyof typeof articleData];

    if (!contentData){
        return null;
    }

    const [displayArticles, setDisplayArticles] = useState(
        Array.from({length: contentData.length}, () => false)
    );

    const headerArticlePress = (index: number): void => {
        const updatedDisplayArticles = [...displayArticles];
        updatedDisplayArticles[index] = !updatedDisplayArticles[index];
        setDisplayArticles(updatedDisplayArticles);
    };

    const handleLinkPress = (url: string): void => {
        Linking.openURL(url).catch((err) => {
            console.error("Impossible d'ouvrir le lien:", err);
        });
    };

    const indentation = Platform.OS === "ios" ? "\t".repeat(1) : "\t".repeat(5);

    return (
        <SafeAreaView
            edges={["bottom", "left", "right"]}
            style={[
                styles.container,
                {
                    paddingTop: 20,
                    backgroundColor:
                        themeColor?.isDark === true ? colors.backgroundDark : colors.backgroundDefault,
                },
            ]}
        >
            <ScrollView style={styles.secureDisplay}>
                {contentData.map((article, index) => (
                    <View style={{backgroundColor: "transparent"}} key={index?.toString()}>
                        <TouchableOpacity
                            onPress={() => {
                                headerArticlePress(index);
                            }}
                        >
                            <View style={styles.header}>
                                <Text
                                    bold
                                    style={styles.title}
                                    lightColor={colors.textLight}
                                    darkColor={colors.textDark}
                                >
                                    {article.title}
                                </Text>
                                {displayArticles[index] ? (
                                    <ChevronUpIcon
                                        size={24}
                                        color={themeColor?.isDark === true ? colors.textDark : colors.textLight}
                                    />
                                ) : (
                                    <ChevronDownIcon
                                        size={24}
                                        color={themeColor?.isDark === true ? colors.textDark : colors.textLight}
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                        {displayArticles[index] && (
                            <View style={{backgroundColor: "transparent"}}>
                                {Array.isArray(article.content) &&
                                    article.content.length > 0 &&
                                    article.content.map((paragraph, paraIndex) => (
                                        <Text
                                            key={paraIndex}
                                            style={[styles.textContent, styles.paragraphStyle]}
                                            lightColor={colors.textLight}
                                            darkColor={colors.textDark}
                                        >
                                            {indentation}
                                            {paragraph}
                                        </Text>
                                    ))}
                                {article.subtitles?.map((subtitle: ArticleSubtitleData, subIndex) => (
                                    <View style={{backgroundColor: "transparent"}} key={subIndex?.toString()}>
                                        <Text
                                            style={styles.subtitle}
                                            lightColor={colors.textLight}
                                            darkColor={colors.textDark}
                                        >
                                            {subtitle.title}
                                        </Text>
                                        {Array.isArray(subtitle.content) &&
                                            subtitle.content.length > 0 &&
                                            subtitle.content.map((paragraph, paraIndex) => (
                                                <Text
                                                    key={paraIndex}
                                                    style={[styles.paragraphStyle]}
                                                    lightColor={colors.textLight}
                                                    darkColor={colors.textDark}
                                                >
                                                    {indentation}
                                                    {paragraph}
                                                </Text>
                                            ))}
                                    </View>
                                ))}

                                {article.url != null && (
                                    <Text
                                        style={styles.urlRedirection}
                                        lightColor={colors.secondaryColorDark}
                                        darkColor={colors.secondaryColor}
                                        onPress={() => {
                                            if (article.url != null) {
                                                handleLinkPress(article.url);
                                            }
                                        }}
                                    >
                                        {article.title}
                                    </Text>
                                )}
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
