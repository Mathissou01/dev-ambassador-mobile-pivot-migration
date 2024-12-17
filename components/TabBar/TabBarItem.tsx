import React, {useContext, useEffect, useRef, useState} from "react";
import {TouchableOpacity} from "react-native";
import {View} from "@/components/Themed";
import {colors} from "@/config/styles/01-settings/_colors";
import LottieView from "lottie-react-native";
import {ThemeContext} from "@/hooks/useColorScheme";
import {getIconColorsForSchool, TabsDetails} from "@/components/TabBar/util";
import {useThemeColor} from "@/hooks/useThemeColor";
import * as Animatable from "react-native-animatable";
import styles from "./tabBarStyle";
import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import {ParamListBase} from "@react-navigation/routers";
import {RouteProp} from "@react-navigation/native";

const animateShow = {
    0: {scale: 0.5, translateY: 0},
    0.92: {translateY: -34},
    1: {scale: 1.2, translateY: -20},
};

const circleShow = {
    0: {scale: 0},
    0.3: {scale: 0.9},
    0.5: {scale: 0.2},
    0.8: {scale: 0.7},
    1: {scale: 1},
};

const animateHiding = {
    0: {scale: 1.2, translateY: -20},
    1: {scale: 1, translateY: 0},
};

const circleHiding = {
    0: {scale: 1},
    1: {scale: 0},
};

// TODO - Right types
interface TabBarItemProps {
    index: number;
    route: RouteProp<ParamListBase, string>;
    selectedIndex: number;
}

export default function TabBarItem({
                                       index,
                                       route,
                                       selectedIndex,
                                       descriptors,
                                       navigation,
                                   }: Pick<BottomTabBarProps, "navigation"> & Pick<BottomTabBarProps, "descriptors"> & Pick<BottomTabBarProps, "state"> & TabBarItemProps): React.JSX.Element {
    const themeContext = useContext(ThemeContext);
    const [currentFocusedTab, setCurrentFocusedTab] = useState(0);
    const viewRef = useRef<any>(null);
    const circleRef = useRef<any>(null);
    const textRef = useRef<any>(null);
    const lottieRef = useRef<any>(null);
    const item = TabsDetails[index];

    const isFocused = currentFocusedTab === index;

    const {options} = descriptors[route.key];
    const label =
        options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
                ? options.title
                : item.label != undefined
                    ? item.label
                    : route.name;

    // const TabBarIcon = options.tabBarIcon;

    useEffect(() => {
        setCurrentFocusedTab(selectedIndex);
    }, [selectedIndex]);

    useEffect(() => {
        // Executed only when updated
        if (isFocused) {
            lottieRef.current.play();
            viewRef.current.animate(animateShow);
            circleRef.current.animate(circleShow);
            textRef.current.transitionTo({scale: 1}, 1000);
        } else {
            lottieRef.current.reset();
            viewRef.current.animate(animateHiding);
            circleRef.current.animate(circleHiding);
            textRef.current.transitionTo({scale: 0}, 1000);
        }
    }, [isFocused]);

    const onPress = () => {
        const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
        }
    };

    const secondaryColor =
        themeContext?.colors?.primary ??
        getIconColorsForSchool("ESCEN").primaryColor;
    const primaryColor =
        themeContext?.colors?.secondary ??
        getIconColorsForSchool("ESCEN").secondaryColor;

    const color = useThemeColor({
        light: colors.textLight,
        dark: colors.textDark,
    });

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={styles.mainContainer}
        >
            <Animatable.View
                useNativeDriver={true}
                ref={viewRef}
                style={styles.container}
            >
                <View
                    lightColor={colors.white}
                    darkColor={colors.backgroundNavDark}
                    style={[
                        styles.btn,
                        {
                            borderColor: themeContext?.isDark
                                ? colors.backgroundNavDark
                                : colors.white,
                        },
                    ]}
                >
                    <Animatable.View
                        useNativeDriver={true}
                        ref={circleRef}
                        duration={500}
                        style={[
                            styles.circle,
                            {
                                backgroundColor: `${
                                    themeContext?.colors?.primary ?? "#000000"
                                }4D`,
                            },
                        ]}
                    />
                    <LottieView
                        ref={lottieRef}
                        style={{
                            height: item.iconHeight,
                            width: item.iconWidth,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        source={item.icon}
                        loop={false}
                        progress={isFocused ? 1 : 0}
                        autoPlay={false}
                        speed={1.8}
                        colorFilters={[
                            {keypath: "primary", color: primaryColor},
                            {keypath: "secondary", color: secondaryColor},
                        ]}
                    />
                </View>
                <Animatable.Text
                    useNativeDriver={true}
                    ref={textRef}
                    duration={500}
                    style={[styles.text, {color: color}]}
                >
                    {typeof label === "function" ? label({
                        children: "",
                        color: "",
                        focused: false,
                        position: "below-icon"
                    }) : label}
                </Animatable.Text>
            </Animatable.View>
        </TouchableOpacity>
    );
}
