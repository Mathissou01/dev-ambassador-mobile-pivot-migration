import React, { useContext, useEffect, useRef } from "react";
import { View, TouchableOpacity, Animated, Dimensions } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { type ProgressButtonProps } from "@/types";
import { ThemeContext } from "@/hooks/useColorScheme";
import { ArrowRight, FingerTapIcon } from "@/components/IconComponent";
import styles from "./ProgressButtonStyle";

interface SvgWithSetNativeProps extends React.RefObject<Svg> {
  setNativeProps: (props: object) => void;
}

export default function ProgressButton({
  percentage,
  navigateTo,
  timer,
  onPressOut,
}: ProgressButtonProps): React.JSX.Element {
  const width = Dimensions.get("window").width;

  const size = width <= 380 ? 80 : 100;
  const strokeWidth = 3;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef<SvgWithSetNativeProps | null>(null);
  const pressTimeout = useRef<number | null>(null);
  const isButtonPressed = useRef(false);
  const opacityAnimation = useRef(new Animated.Value(1)).current; // Opacity control for the icon

  const icon =
    timer ?? false ? (
      <Animated.View style={{ opacity: opacityAnimation }}>
        <FingerTapIcon color={"#fff"} size={width <= 380 ? 20 : 30} />
      </Animated.View>
    ) : (
      <ArrowRight color={"#fff"} size={width <= 380 ? 20 : 30} />
    );

  let animationTimeout: number | null = null;

  const animatePercentage = (toValue: number, duration: number): void => {
    if (animationTimeout != null) {
      clearTimeout(animationTimeout);
    }
    Animated.timing(progressAnimation, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        if (toValue === 100) {
          navigateTo();
        }
      }
    });
  };

  const buttonPress = (): void => {
    if (timer ?? false) {
      isButtonPressed.current = true;
      pressTimeout.current = setTimeout(() => {
        if (isButtonPressed.current) {
          animatePercentage(100, 1000);
        }
      }, 500) as unknown as number;
    } else {
      navigateTo();
    }
  };

  const buttonRelease = (): void => {
    isButtonPressed.current = false;
    if (timer ?? false) {
      if (pressTimeout.current != null) {
        clearTimeout(pressTimeout.current);
      }
      if (progressAnimation._value < 100) {
        animationTimeout = setTimeout(() => {
          animatePercentage(0, 300);
          onPressOut();
        }, 500) as unknown as number;
      }
    }
  };

  useEffect(() => {
    if (!(timer ?? false) && progressRef?.current != null) {
      const strokeDashoffset = circumference - (circumference * percentage) / 100;
      progressRef.current.setNativeProps({
        strokeDashoffset,
      });
    }

    progressAnimation.addListener((value) => {
      const strokeDashoffset = circumference - (circumference * value.value) / 100;

      if (progressRef?.current != null) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });

    // Clignotement
    if (timer ?? false) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacityAnimation, {
            toValue: 0.4,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnimation, {
            toValue: 0.4,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnimation, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  const colorTheme = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            stroke={colorTheme?.isDark ?? false ? "#b6b6b6" : "#fff"}
            fill="transparent"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef as React.RefObject<Circle>}
            stroke={"#00f"}
            fill="transparent"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity
        onPressIn={buttonPress}
        onPressOut={buttonRelease}
        style={styles.button}
        activeOpacity={0.6}
      >
        {icon}
      </TouchableOpacity>
    </View>
  );
}
