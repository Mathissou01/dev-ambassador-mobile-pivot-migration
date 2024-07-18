import React, {useContext, useMemo, useRef, useState} from "react";
import {Animated, Dimensions, PanResponder, ScrollView, StyleSheet, TouchableOpacity, View,} from "react-native";
import {BlurView} from "expo-blur";
import {ThemeContext} from "@/hooks/useColorScheme";
import MusicCard from "./MusicCard";
import styles from "./BottomCollapsedMenuStyle";

interface BottomCollapsedMenuProps {
    componentsWithMusic: any[];
    toggleView: (arg1: boolean, arg2: number) => void;
    isToggleAnimating: boolean;
    isPlaying: boolean;
    setIsPlaying: (arg1: boolean) => void;
    currentIndex: number;
}

export default function BottomCollapsedMenu({
                                                componentsWithMusic,
                                                toggleView,
                                                isToggleAnimating,
                                                isPlaying,
                                                setIsPlaying,
                                                currentIndex,
                                            }: BottomCollapsedMenuProps): React.JSX.Element {
    const colorTheme = useContext(ThemeContext);
    const [isToolbarOpen, setIsToolbarOpen] = useState(false);
    const {width, height} = Dimensions.get("window");
    const menuBottomPosition = useRef(new Animated.Value(-height * 0.5)).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,

            onMoveShouldSetPanResponder: (_, gestureState) => {
                return (
                    Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && Math.abs(gestureState.dy) > 5
                );
            },

            onPanResponderRelease: (_, gestureState) => {
                const {dy, vy} = gestureState;

                if (dy < -50 || (dy < -10 && vy < -0.5)) {
                    Animated.timing(menuBottomPosition, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: false,
                    }).start();

                    setIsToolbarOpen(true);
                } else if (dy > 50 || (dy > 10 && vy > 0.5)) {
                    Animated.timing(menuBottomPosition, {
                        toValue: -height * 0.5,
                        duration: 200,
                        useNativeDriver: false,
                    }).start();
                    setIsToolbarOpen(false);
                }
            },
        })
    ).current;

    const onPressHandler = (index: number): void => {
        if (index === currentIndex) {
            setIsPlaying(!isPlaying);
        } else {
            toggleView(false, index);
        }
    };

    const toggleToolbar = (): void => {
        setIsToolbarOpen(!isToolbarOpen);
        Animated.timing(menuBottomPosition, {
            toValue: isToolbarOpen ? -height * 0.5 : -50,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const musicCards = useMemo(
        () =>
            componentsWithMusic.map((item, index) => (
                <React.Fragment key={index}>
                    <MusicCard
                        title={item.title}
                        tag={item.tag}
                        onPress={() => {
                            onPressHandler(index);
                        }}
                        isToggleAnimating={isToggleAnimating}
                        isPlaying={index === currentIndex ? isPlaying : false}
                    />
                    {index < componentsWithMusic.length - 1 && (
                        <View style={{alignItems: "center"}}>
                            <View style={styles.breakList}/>
                        </View>
                    )}
                </React.Fragment>
            )),
        [componentsWithMusic, currentIndex, isPlaying, isToggleAnimating]
    );

    const triggerAreaHitSlop = {left: 25, right: 25, top: 25, bottom: 25};

    return (

        <Animated.View style={[styles.menuContainer, {bottom: menuBottomPosition}]}>
            <View style={styles.triggerArea} {...panResponder.panHandlers} hitSlop={triggerAreaHitSlop}>
                <TouchableOpacity
                    style={{width: "100%", height: "100%"}}
                    hitSlop={triggerAreaHitSlop}
                    onPress={toggleToolbar}
                ></TouchableOpacity>
            </View>
            <BlurView
                style={{
                    flex: 1,
                    ...StyleSheet.absoluteFillObject,
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                    overflow: "hidden",
                }}
                intensity={100}
                tint={colorTheme?.isDark ?? false ? "dark" : "light"}
            >
                <View style={styles.blurView}>
                    <BlurView
                        style={{
                            flex: 1,
                            paddingHorizontal: width * 0.05,
                            borderTopLeftRadius: 50,
                            borderTopRightRadius: 50,
                        }}
                        intensity={100}
                        tint={colorTheme?.isDark ?? false ? "dark" : "light"}
                    >
                        <ScrollView
                            contentContainerStyle={{
                                paddingTop: 25,
                                paddingBottom: 25,
                            }}
                            showsVerticalScrollIndicator={false}
                        >
                            {musicCards}
                        </ScrollView>
                    </BlurView>
                </View>
            </BlurView>
        </Animated.View>
    );
}
