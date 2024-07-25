import {BlurView, BlurViewProps} from "expo-blur";
import React from "react";
import {Platform, StyleSheet} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const StatusBarBlurBackgroundImpl = ({
                                         style,
                                         ...props
                                     }: BlurViewProps): React.ReactElement | null => {
    const {top} = useSafeAreaInsets();

    if (Platform.OS !== "ios") return null;

    return (
        <BlurView
            style={[styles.statusBarBackground, {height: top}, style]}
            intensity={25}
        />
    );
};

export const StatusBarBlurBackground = React.memo(StatusBarBlurBackgroundImpl);

const styles = StyleSheet.create({
    statusBarBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
    },
});
