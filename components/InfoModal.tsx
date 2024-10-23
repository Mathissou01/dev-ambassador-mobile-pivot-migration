import {ScrollView, Text, View} from "@/components/Themed";
import React, {useContext} from "react";
import {Dimensions, Modal, TouchableOpacity} from "react-native";
import {BlurView} from "expo-blur";
import {colors} from "@/config/styles/01-settings/_colors";
import {ThemeContext} from "@/hooks/useColorScheme";
import {CloseIcon} from "@/components/IconComponent";
import styles from "./InfoModalStyle";

export default function InfoModal({
                                      title,
                                      subtitle,
                                      paragraphe,
                                      isOpen,
                                      setIsOpen,
                                  }: {
    title?: string[];
    subtitle?: string[];
    paragraphe?: string[][];
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}): React.JSX.Element {
    const themeColor = useContext(ThemeContext);
    const screenWidth = Dimensions.get("window").width;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
            onRequestClose={() => {
                setIsOpen(false);
            }}
        >
            <View style={styles.modalContainer} lightColor={colors.white}>
                <BlurView
                    style={styles.blurContainer}
                    intensity={15}
                    tint={themeColor?.isDark ?? false ? "dark" : "light"}
                >
                    <View
                        style={[styles.modalContent, {width: screenWidth * 0.75}]}
                        lightColor={colors.white}
                        darkColor={colors.backgroundNavDark}
                    >
                        <View
                            style={styles.header}
                            lightColor={colors.white}
                            darkColor={colors.backgroundNavDark}
                        >
                            <Text style={styles.title} lightColor={colors.black} darkColor={colors.gray300}>
                                {title}
                            </Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => {
                                    setIsOpen(false);
                                }}
                            >
                                <CloseIcon
                                    size={15}
                                    color={themeColor?.isDark === true ? colors.gray300 : colors.black}
                                />
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            contentContainerStyle={styles.modalScrollContent}
                            lightColor={colors.white}
                            darkColor={colors.backgroundNavDark}
                        >
                            {subtitle != null &&
                                subtitle?.length > 0 &&
                                subtitle.map((subTitle, index) => (
                                    <React.Fragment key={"subtitle_" + index}>
                                        <Text
                                            key={index}
                                            style={styles.subtitle}
                                            lightColor={colors.black}
                                            darkColor={colors.gray300}
                                        >
                                            {subTitle}
                                        </Text>
                                        {paragraphe?.[index].map((p, index) => (
                                            <Text
                                                key={index}
                                                style={styles.paragraphe}
                                                lightColor={colors.black}
                                                darkColor={colors.gray300}
                                            >
                                                {p}
                                            </Text>
                                        ))}
                                    </React.Fragment>
                                ))}
                        </ScrollView>
                    </View>
                </BlurView>
            </View>
        </Modal>
    );
}
