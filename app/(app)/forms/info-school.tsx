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
import {useGetDocumentationsQuery} from "@/services/documentations";
import {convertHTMLEntity} from "@/utils/convertHtmlEntity";

export default function InfoSchool(): React.JSX.Element | null {
    const {data: docs} = useGetDocumentationsQuery();
    const articleData = docs?.map(doc => doc.viewable) ?? [];

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
        if (search.trim() === "" || search.trim().length < 5 || search.trim() === "strong") return htmlContent;

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
                                {HtmlToReactNative(highlightSearch(convertHTMLEntity(article.content), searchValue))}
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
