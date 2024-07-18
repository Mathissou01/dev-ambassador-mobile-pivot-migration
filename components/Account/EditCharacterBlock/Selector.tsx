import React, {type FC, useContext} from "react";
import {TouchableOpacity, useColorScheme, View} from "react-native";
import {ThemeContext} from "@/hooks/useColorScheme";
import Mouth from "./Slider/Mouth";
import Hair from "./Slider/Hair";
import Necklace from "./Slider/Necklace";
import EyeBrows from "./Slider/Eyebrows";
import Earings from "./Slider/Earings";
import Clothe from "./Slider/Clothe";
import Glasses from "./Slider/Glasses";
import Skin from "./Slider/Skin";
import styles from "./SelectorStyle";
import {colors} from "@/config/styles/01-settings/_colors";

interface SelectorProps {
    selectedSlider: string;
    onSelectSlider: (sliderName: string) => void;
}

const Selector: FC<SelectorProps> = ({selectedSlider, onSelectSlider}) => {
    const themeContext = useContext(ThemeContext);
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";
    const defaultColor = isDarkMode ? colors.textDark : colors.textLight;

    return (
        <View
            style={[styles.container, {backgroundColor: themeContext?.colors.primaryExtraLight + "4D"}]}
        >
            <SelectorButton
                label="Cheveux"
                selected={selectedSlider === "Slider"}
                component={<Hair color={defaultColor}/>}
                onPress={() => {
                    onSelectSlider("Slider");
                }}
            />
            <SelectorButton
                label="Bouche"
                selected={selectedSlider === "Slider2"}
                component={<Mouth color={defaultColor}/>}
                onPress={() => {
                    onSelectSlider("Slider2");
                }}
            />
            <SelectorButton
                label="Sur-cil"
                selected={selectedSlider === "Slider3"}
                component={<EyeBrows color={defaultColor}/>}
                onPress={() => {
                    onSelectSlider("Slider3");
                }}
            />
            <SelectorButton
                label="Boucle d'oreille"
                selected={selectedSlider === "Slider4"}
                component={<Earings color={defaultColor}/>}
                onPress={() => {
                    onSelectSlider("Slider4");
                }}
            />
            <SelectorButton
                label="Lunette"
                selected={selectedSlider === "Slider5"}
                component={<Glasses color={defaultColor}/>}
                onPress={() => {
                    onSelectSlider("Slider5");
                }}
            />
            <SelectorButton
                label="Collier"
                selected={selectedSlider === "Slider6"}
                component={<Necklace color={defaultColor}/>}
                onPress={() => {
                    onSelectSlider("Slider6");
                }}
            />
            <SelectorButton
                label="Vetement"
                selected={selectedSlider === "Slider7"}
                component={<Clothe color={defaultColor}/>}
                onPress={() => {
                    onSelectSlider("Slider7");
                }}
            />
            <SelectorButton
                label="Peau"
                selected={selectedSlider === "Slider12"}
                component={<Skin color={defaultColor}/>}
                onPress={() => {
                    onSelectSlider("Slider12");
                }}
            />
        </View>
    );
};

interface SelectorButtonProps {
    label: string;
    selected: boolean;
    component: React.ReactNode;
    onPress: () => void;
}

const SelectorButton: FC<SelectorButtonProps> = ({component, onPress}) => {
    return (
        <TouchableOpacity style={[styles.button]} onPress={onPress}>
            {component}
        </TouchableOpacity>
    );
};

export default Selector;
