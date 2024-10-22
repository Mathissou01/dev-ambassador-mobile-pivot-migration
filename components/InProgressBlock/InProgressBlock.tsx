import React, { useContext } from "react";
import { Dimensions } from "react-native";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import { ThemeContext } from "@/hooks/useColorScheme";
import LottieView from "lottie-react-native";
import { Text, View } from "../Themed";
import styles from "./InProgressBlockStyle";
import { colors } from "@/config/styles/01-settings/_colors";

export default function InProgressBlock(): React.JSX.Element {
  const { width, height } = Dimensions.get("screen");
  const themeColor = useContext(ThemeContext);

  return (
    <>
      <Svg style={styles.backgroundScreen}>
        <Defs>
          <RadialGradient id="gradient" cx="50%" cy="50%">
            <Stop
              offset="5%"
              stopColor={themeColor?.isDark ? "#98a5b2" : "#D4EDFF"}
            />
            <Stop
              offset="100%"
              stopColor={
                themeColor?.isDark
                  ? themeColor?.colors?.primaryDark
                  : themeColor?.colors?.primaryLight
              }
            />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={width} height={height} fill="url(#gradient)" />
      </Svg>
      <View style={styles.container}>
        <View
          lightColor={"white"}
          darkColor={colors.backgroundDark}
          style={[
            styles.messageContainer,
            {
              borderColor: themeColor?.isDark
                ? colors.backgroundDark
                : "#DCDCDC",
            },
          ]}
        >
          <Text
            lightColor={colors.textLight}
            darkColor={colors.textDark}
            style={styles.description}
          >
            En raison d'une insuffisance de matériaux, cette page ne sera
            accessible que lors de la prochaine année scolaire.
          </Text>
        </View>
        <View
          style={[
            styles.bottomBuble,
            {
              borderBottomColor: themeColor?.isDark
                ? colors.backgroundDark
                : "white",
            },
          ]}
        ></View>
        <View style={styles.lottieContainer}>
          <LottieView
            source={require("../../assets/json/acces-robot/bricolage.json")}
            autoPlay
            loop
            style={styles.lottieImage}
          />
          <View style={styles.ellispe}></View>
        </View>
      </View>
    </>
  );
}
