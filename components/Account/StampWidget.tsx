import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  ImageSourcePropType,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import Escen_light from "@/assets/images/school-letter/light/ESCEN_Letter.png";
import Bachelor_light from "@/assets/images/school-letter/light/BACHELOR_Letter.png";
import Webtech_dark from "@/assets/images/school-letter/dark/WEBTECH_Letter.png";
import Magnum_dark from "@/assets/images/school-letter/dark/MAGNUM_Letter.png";
import NEXT_U_Light from "@/assets/images/school/light/Next_U_logo-min_light.png";
import Atlas_dark from "@/assets/images/school-letter/dark/ATLAS_Letter.png";
import Star from "@/components/SvgIllustration/Star";
import { type LogoSchools, type StampWidgetData } from "@/types";
import { colors } from "@/config/styles/01-settings/_colors";
import { Text } from "@/components/Themed";
import { ThemeContext } from "@/hooks/useColorScheme";
import { startGlowAnimation } from "@/utils/AnimationLib";
import styles from "./StampWidgetStyle";

const screenWidth = Dimensions.get("window").width;
const screenHalfWidth = screenWidth / 3;
const outerCircle = screenHalfWidth;
const innerCircle = screenHalfWidth - 40;

const numStars = 12;
const angleIncrement = (2 * Math.PI) / numStars;

const starCoordinates = Array.from({ length: numStars }, (_, index) => {
  const angle = index * angleIncrement;
  const x = outerCircle + (innerCircle / 1.65) * Math.cos(angle);
  const y = outerCircle + (innerCircle / 1.65) * Math.sin(angle);
  return { x, y };
});

const logoWidth = 10;
const logoHeight = 10;

const schoolLogo: LogoSchools = {
  "WebTech Institute": Webtech_dark,
  "ATLAS Institute": Atlas_dark,
  "Magnum Institute": Magnum_dark,
  "Bachelor Institute": Bachelor_light,
  "ESCEN": Escen_light,
  "NEXT-U": NEXT_U_Light,
};

const StampWidget = ({
  logo,
  schoolYear,
}: StampWidgetData): React.JSX.Element => {
  const colorTheme = useContext(ThemeContext);
  const [glowAnimations] = useState(
    Array.from({ length: numStars }, () => new Animated.Value(0.0))
  );

  // Rotation interaction widget
  const rotateValue = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const rotate = gestureState.dx / 2; // Adjust the divisor to control sensitivity
        rotateValue.setValue(rotate);
      },
      onPanResponderRelease: () => {
        Animated.timing(rotateValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  useEffect(() => {
    glowAnimations.forEach((glowAnimation) => {
      startGlowAnimation(glowAnimation);
    });
  }, []);

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [-360, 360],
    outputRange: ["-360deg", "360deg"],
  });

  return (
    <Animated.View
      style={[styles.container, { transform: [{ rotate: rotateInterpolate }] }]}
      {...panResponder.panHandlers}
    >
      <Svg height={outerCircle * 2} width={outerCircle * 2}>
        <Circle
          cx={outerCircle}
          cy={outerCircle}
          r={outerCircle / 2}
          fill={colors.gray300}
        />
        <Circle
          cx={outerCircle}
          cy={outerCircle}
          r={innerCircle / 2}
          fill={colors.gray200}
        />
        {starCoordinates.map((coord, index) => {
          if (index !== 3 && index !== numStars - 3) {
            return (
              <Animated.View
                key={"stars" + index}
                style={{
                  position: "absolute",
                  left: coord.x - logoWidth / 2,
                  top: coord.y - logoHeight / 2,
                  width: logoWidth,
                  height: logoHeight,
                  opacity: glowAnimations[index],
                }}
              >
                <Star
                  color={colorTheme?.colors.secondary}
                  style={{
                    position: "absolute",
                    width: logoWidth,
                    height: logoHeight,
                  }}
                />
              </Animated.View>
            );
          } else {
            return null;
          }
        })}
      </Svg>
      <Text bold style={styles.schoolYearTextTop}>
        N{schoolYear}
      </Text>
      <Text bold style={styles.schoolYearTextBottom}>
        N{schoolYear}
      </Text>
      <Image
        source={schoolLogo[logo] as ImageSourcePropType}
        style={styles.schoolLogo}
      />
    </Animated.View>
  );
};

export default StampWidget;
