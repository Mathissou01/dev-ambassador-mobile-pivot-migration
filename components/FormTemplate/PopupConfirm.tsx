import React, { useContext, useRef, useEffect } from "react";
import { Animated, Modal, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { BlurView } from "expo-blur";
import { ThemeContext } from "@/hooks/useColorScheme";
import { Text, View } from "@/components/Themed";
import { colors } from "@/config/styles/01-settings/_colors";
import RNAnimatedBorder from "@/components/FormScreen/RNAnimatedBorder";
import styles from "./PopUpConfirmStyle";

interface PopupConfirmProps {
  message: string;
  onConfirm: () => void;
  visible: boolean; // Affichage du modal
  isError: boolean;
  closeTimer: number;
}

const PopupConfirm: React.FC<PopupConfirmProps> = ({
  message,
  onConfirm,
  visible,
  isError = false,
  closeTimer,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const themeColor = useContext(ThemeContext);

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        handleClose();
      }, closeTimer);
    }
  }, [fadeAnim, visible]);

  const handleClose = (): void => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      onConfirm();
    });
  };

  const colorTheme = useContext(ThemeContext);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
      hardwareAccelerated={true}
    >
      <BlurView
        style={styles.blurContainer}
        intensity={5}
        tint={colorTheme?.isDark ? "dark" : "light"}
      >
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
          <RNAnimatedBorder
            firstColor={!isError ? colors.success : colors.error}
            secondColor={!isError ? colors.successLight : colors.errorDark}
            borderWidth={5}
            borderRadius={20}
            elevation={5}
            totalDuration={10000} // Durée totale de l'animation
            borderIncreaseDuration={10000} // Augmentation de la bordure sur 10 secondes
          >
            <View
              style={styles.modalContent}
              darkColor={colors.gray800}
              lightColor={colors.backgroundDefault}
            >
              <Text
                style={styles.messageText}
                darkColor={colors.gray200}
                lightColor={colors.gray800}
              >
                {message}
              </Text>
              <View style={styles.lottieContainer}>
                <LottieView
                  source={
                    !isError
                      ? require("@/assets/json/acces-robot/yesValidate.json")
                      : require("@/assets/json/acces-robot/noError.json")
                  }
                  autoPlay
                  loop
                  style={styles.lottieImage}
                />
              </View>
              <TouchableOpacity onPress={handleClose} style={[styles.okButton]}>
                {!isError ? (
                  <LottieView
                    style={styles.loaderContent}
                    source={require("../../assets/json/acces-logo/check.json")}
                    autoPlay
                    loop={false}
                    colorFilters={[
                      {
                        keypath: "Shape Layer 1",
                        color:
                          themeColor?.isDark === false
                            ? colors.success
                            : colors.successLight,
                      },
                      {
                        keypath: "Shape Layer 5",
                        color:
                          themeColor?.isDark === false
                            ? colors.successDark
                            : colors.success,
                      },
                      { keypath: "Comp 2", color: colors.white },
                    ]}
                  />
                ) : (
                  <LottieView
                    style={styles.loaderContent}
                    source={require("../../assets/json/acces-logo/error.json")}
                    autoPlay
                    loop={false}
                    colorFilters={[
                      {
                        keypath: "circle",
                        color:
                          themeColor?.isDark === false
                            ? colors.errorDark
                            : colors.error,
                      },
                      {
                        keypath: "circle 2",
                        color:
                          themeColor?.isDark === false
                            ? colors.errorDark
                            : colors.error,
                      },
                      { keypath: "1", color: "white" },
                      { keypath: "2", color: "white" },
                      {
                        keypath: "line1",
                        color:
                          themeColor?.isDark === false
                            ? colors.errorDark
                            : colors.error,
                      },
                    ]}
                  />
                )}
              </TouchableOpacity>
            </View>
          </RNAnimatedBorder>
        </Animated.View>
      </BlurView>
    </Modal>
  );
};

export default PopupConfirm;
