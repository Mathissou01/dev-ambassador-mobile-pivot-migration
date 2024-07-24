import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Platform, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "@/components/Themed";
import InputTemplate from "@/components/FormTemplate/InputTemplate";
import { ChevronUpIcon, ChevronDownIcon } from "@/components/IconComponent";
import { colors } from "@/config/styles/01-settings/_colors";
import { ThemeContext } from "@/hooks/useColorScheme";
import { type ArticlePolicyData } from "@/types";
import styles from "@/styles/form/InfoSchoolStyle";

export default function InfoSchool(): React.JSX.Element | null {
    // TEMPORAIRE
    const articleData = [
        {
            title: "Introduction",
            content: [
                "Ceci est le premier paragraphe d'introduction.",
                "Et voici le deuxième paragraphe.",
            ],
        },
        {
            title: "Notre Mission et Nos Valeurs",
            content: [
                "Notre mission est de fournir un environnement éducatif de qualité.",
                "Nos valeurs incluent l'excellence académique, le respect, la diversité et l'innovation.",
            ],
        },
        {
            title: "Programmes Académiques",
            content: [
                "Découvrez nos programmes variés qui stimulent la curiosité intellectuelle.",
                "De la maternelle au lycée, nos cours encouragent le développement des compétences essentielles.",
            ],
        },
        {
            title: "Infrastructures et Ressources",
            content: [
                "Explorez nos installations modernes, des laboratoires scientifiques aux espaces artistiques.",
                "Nous investissons dans des infrastructures de qualité pour soutenir l'apprentissage.",
            ],
        },
        {
            title: "Engagement Communautaire",
            content: [
                "Nous croyons en l'importance de l'engagement communautaire.",
                "Découvrez nos initiatives sociales, clubs étudiants et activités parascolaires.",
            ],
        },
        {
            title: "Témoignages d'Étudiants",
            content: [
                "Écoutez ce que nos étudiants ont à dire sur leur expérience à notre école.",
                "Découvrez comment notre établissement les a préparés pour l'avenir.",
            ],
        },
    ];
    // TEMPORAIRE

    const themeColor = useContext(ThemeContext);

    const contentData: ArticlePolicyData[] = articleData;

    const width = Dimensions.get("window").width;

    const [displayArticles, setDisplayArticles] = useState(
        Array.from({ length: contentData.length }, () => false)
    );

    const [searchValue, setSearchValue] = useState("");
    const [selectedArticleIndex, setSelectedArticleIndex] = useState(-1);

    useEffect(() => {
        const matchingArticleIndex = contentData.findIndex((article) => {
            return (
                article.content.some((paragraph) =>
                    paragraph.toLowerCase().includes(searchValue.toLowerCase())
                ) || article.title.toLowerCase().includes(searchValue.toLowerCase())
            );
        });

        setSelectedArticleIndex(matchingArticleIndex);
    }, [searchValue]);

    const headerArticlePress = (index: number): void => {
        const updatedDisplayArticles = [...displayArticles];
        updatedDisplayArticles[index] = !updatedDisplayArticles[index];
        setDisplayArticles(updatedDisplayArticles);

        if (selectedArticleIndex === index) {
            setSelectedArticleIndex(-1);
        } else {
            setSelectedArticleIndex(index);
        }
    };

    const indentation = Platform.OS === "ios" ? "\t".repeat(1) : "\t".repeat(5);

    return (
        <SafeAreaView
            edges={["bottom", "left", "right"]}
            style={[
                styles.container,
                {
                    backgroundColor:
                        themeColor?.isDark === true ? colors.backgroundDark : colors.backgroundDefault,
                },
            ]}
        >
            <View style={{ marginVertical: 15, marginHorizontal: width * 0.04 }}>
                <InputTemplate
                    value={searchValue}
                    placeholder="Rechercher..."
                    onChangeText={(text) => {
                        setSearchValue(text);
                    }}
                    secureTextEntry={false}
                    multiline={false}
                    hasToBeChecked={false}
                    searchInput={true}
                />
            </View>
            <ScrollView style={styles.secureDisplay}>
                {contentData.map((article, index) => (
                    <View style={{ backgroundColor: "transparent" }} key={index?.toString()}>
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
                                {selectedArticleIndex === index ? (
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
                        {selectedArticleIndex === index && (
                            <View style={{ backgroundColor: "transparent" }}>
                                {Array.isArray(article.content) &&
                                    article.content.length > 0 &&
                                    article.content.map((paragraph, paraIndex) => {
                                        const lowerCasedParagraph = paragraph.toLowerCase();
                                        const lowerCasedSearchValue = searchValue.toLowerCase();
                                        const startIndex = lowerCasedParagraph.indexOf(lowerCasedSearchValue);

                                        return (
                                            <Text
                                                key={paraIndex}
                                                style={[styles.textContent, styles.paragraphStyle]}
                                                lightColor={colors.textLight}
                                                darkColor={colors.textDark}
                                            >
                                                {indentation}
                                                {startIndex !== -1 ? (
                                                    <>
                                                        {paragraph.substring(0, startIndex)}
                                                        <Text style={{ backgroundColor: "yellow" }}>
                                                            {paragraph.substr(startIndex, searchValue.length)}
                                                        </Text>
                                                        {paragraph.substring(startIndex + searchValue.length)}
                                                    </>
                                                ) : (
                                                    paragraph
                                                )}
                                            </Text>
                                        );
                                    })}
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
