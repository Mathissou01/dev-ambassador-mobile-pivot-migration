import React, {ReactNode, useEffect} from "react";
import {Animated} from "react-native";
import {useAnimation} from "./handleAnimation";

interface RNAnimatedBorderProps {
    firstColor: string;
    secondColor: string;
    borderWidth: number;
    borderRadius: number;
    elevation: number;
    margin?: number;
    padding?: number;
    totalDuration: number;
    children: ReactNode
    borderIncreaseDuration?: number
}

const RNAnimatedBorder: React.FC<RNAnimatedBorderProps> = (props) => {
    const {
        firstColor,
        secondColor,
        borderWidth,
        borderRadius,
        elevation,
        margin,
        padding,
        totalDuration,
    } = props;

    const anim = useAnimation(totalDuration);

    const boxInterpolation = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [firstColor, secondColor],
    });

    const borderWidthInterpolation = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [borderWidth, borderWidth * 2], // Augmente la bordure au double
    });

    const animatedStyle = {
        borderColor: boxInterpolation,
        borderWidth: borderWidthInterpolation,
        borderRadius,
        elevation,
        margin,
        padding,
    };

    return <Animated.View style={animatedStyle}>{props.children}</Animated.View>;
};

export default RNAnimatedBorder;
