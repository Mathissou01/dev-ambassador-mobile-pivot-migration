import React, {useContext} from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Text, View} from "@/components/Themed";
import {Field} from "@/hooks/API/ObjectTypes/Field";
import {School} from "@/hooks/API/ObjectTypes/School";
import {ThemeContext} from "@/hooks/useColorScheme";

export default function CardForm({
                                     idForm,
                                     guidForm,
                                     nameForm,
                                     nameEvent,
                                     redirection,
                                 }: {
    idForm?: string;
    guidForm?: string | null;
    nameForm?: string;
    nameEvent?: string;
    redirection?: (guid: string) => void;
    fields?: Field[];
    school?: School;
}) {
    // THEME COLOR
    const themeColor = useContext(ThemeContext);

    function hexToRGB(hex: string, alpha: number) {
        var r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);

        if (alpha) {
            return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
        } else {
            return "rgb(" + r + ", " + g + ", " + b + ")";
        }
    }

    function getTextColor(rgba: string): string {
        const rgbaArray = hexToRGB(rgba, 1).match(/\d+/g);

        if (rgbaArray) {
            const [red, green, blue] = rgbaArray.map(Number);
            const luminance = red * 0.299 + green * 0.587 + blue * 0.114;

            return luminance > 186 ? "black" : "white";
        } else {
            throw new Error("Impossible d'extraire les valeurs RGBA.");
        }
    }

    if (!idForm) {
        return <></>;
    }

    return (
        <TouchableOpacity
            key={idForm}
            onPress={() => {
                if (redirection) redirection(guidForm!);
            }}
        >
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: `${themeColor?.colors.primary}`,
                    },
                ]}
            >
                <Text
                    style={[
                        {
                            color: getTextColor(`${themeColor?.colors.primaryExtraDark}`),
                        },
                    ]}
                >
                    {nameForm}
                </Text>
                <Text
                    style={[
                        {
                            color: getTextColor(`${themeColor?.colors.primaryExtraDark}`),
                        },
                    ]}
                >
                    {nameEvent}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        border: "1px solid #ddd8",
        borderRadius: 6,
        padding: 16,
        marginBottom: 15,
    },
});
