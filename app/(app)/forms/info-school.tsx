import React, {useContext, useEffect, useState} from "react";
import {Dimensions, ScrollView, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text, View} from "@/components/Themed";
import InputTemplate from "@/components/FormTemplate/InputTemplate";
import {ChevronDownIcon, ChevronUpIcon} from "@/components/IconComponent";
import {colors} from "@/config/styles/01-settings/_colors";
import {ThemeContext} from "@/hooks/useColorScheme";
import styles from "@/styles/form/InfoSchoolStyle";
import HtmlToReactNative from "@/utils/HtmlToReactNative";

export default function InfoSchool(): React.JSX.Element | null {
    const articleData = [
        {
            title: "Introduction",
            content: "<p>Ceci est <a href='https://google.com '>le premier paragraphe</a> d'introduction.</p><p>Et voici le deuxième paragraphe.</p>",
        },
        {
            title: "Notre Mission et Nos Valeurs",
            content: "<p>Notre mission est de fournir un environnement éducatif de qualité.</p><p>Nos valeurs incluent l'excellence académique, le respect, la diversité et l'innovation.</p>"
        },
        {
            title: "Programmes Académiques",
            content: "<p>Découvrez nos programmes variés qui stimulent la curiosité intellectuelle.</p><p>De la maternelle au lycée, nos cours encouragent le développement des compétences essentielles.</p>"
        },
        {
            title: "Infrastructures et Ressources",
            content: "<p>Explorez nos installations modernes, des laboratoires scientifiques aux espaces artistiques.</p><p>Nous investissons dans des infrastructures de qualité pour soutenir l'apprentissage.</p>"
        },
        {
            title: "Engagement Communautaire",
            content: "<p>Nous croyons en l'importance de l'engagement communautaire.</p><p>Découvrez nos initiatives sociales, clubs étudiants et activités parascolaires.</p>"
        },
        {
            title: "Témoignages d'Étudiants",
            content: "<p>Écoutez ce que nos étudiants ont à dire sur leur expérience à notre école.</p><p>Découvrez comment notre établissement les a préparés pour l'avenir.</p>"
        },
    ];

    const themeColor = useContext(ThemeContext);
    const width = Dimensions.get("window").width;

    const [displayArticles, setDisplayArticles] = useState(
        Array.from({length: articleData.length}, () => false)
    );
    const [searchValue, setSearchValue] = useState("");
    const [selectedArticleIndex, setSelectedArticleIndex] = useState(-1);

    useEffect(() => {
        const matchingArticleIndex = articleData.findIndex((article) => {
            return (
                article.content.toLowerCase().includes(searchValue.toLowerCase()) ||
                article.title.toLowerCase().includes(searchValue.toLowerCase())
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

    const highlightSearch = (htmlContent: string, search: string): string => {
        if (search.trim() === "") return htmlContent;
        const regex = new RegExp(`(${search})`, "gi");
        return htmlContent.replace(regex, `<mark style="background-color: yellow;">$1</mark>`);
    };

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
            <View style={{marginVertical: 15, marginHorizontal: width * 0.04}}>
                <InputTemplate
                    value={searchValue}
                    placeholder="Rechercher..."
                    onChangeText={(text) => setSearchValue(text)}
                    secureTextEntry={false}
                    multiline={false}
                    hasToBeChecked={false}
                    searchInput={true}
                />
            </View>
            <ScrollView style={styles.secureDisplay}>
                {articleData.map((article, index) => (
                    <View style={{backgroundColor: "transparent"}} key={index.toString()}>
                        <TouchableOpacity
                            onPress={() => headerArticlePress(index)}
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
                            <View style={{backgroundColor: "transparent", marginTop: 10}}>
                                {HtmlToReactNative(
                                    highlightSearch(article.content, searchValue)
                                )}
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
