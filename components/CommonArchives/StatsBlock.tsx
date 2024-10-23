import React, {useContext} from "react";
import {Text, View} from "@/components/Themed";
import styles from "./StatsBlockStyle";
import {colors} from "@/config/styles/01-settings/_colors";
import {ThemeContext} from "@/hooks/useColorScheme";
import {ClipboardIcon, ClockIcon, RibbonAwardIcon} from "../IconComponent";
import {blocks as dblocks} from "./stats-mocks-data";

export interface blockType {
    icon: string;
    label: string;
    value: number | string;
}

export default function StatsBlock({blocks}: { blocks: blockType[] }): React.JSX.Element {
    const colorTheme = useContext(ThemeContext);
    return (
        <View style={[styles.mainStatsContainer]}>
            {(blocks ?? dblocks).map((block) => (
                <View
                    style={[styles.statsContainer, {backgroundColor: colorTheme?.colors.primary}]}
                    key={"block-" + block.label}
                >
                    <View style={[styles.firstStatsContainer]}>
                        {block.icon !== "" && (
                            <IconComponent
                                icon={block.icon}
                                size={24}
                                color={colorTheme?.isDark ?? false ? colors.backgroundDark : colors.white}
                            />
                        )}
                        <Text bold style={[styles.textInfo]}>
                            {block.label}
                        </Text>
                    </View>
                    <View style={[styles.secondStatsContainer]}>
                        <Text bold style={[styles.textStats]}>
                            {block.value}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );
}

interface IconComponentProps {
    icon: string;
    size: number;
    color: string;
}

const IconComponent: React.FC<IconComponentProps> = ({icon, size, color}) => {
    switch (icon) {
        case "ClockIcon":
            return <ClockIcon size={size} color={color}/>;
        case "RibbonAwardIcon":
            return <RibbonAwardIcon size={size} color={color}/>;
        case "ClipboardIcon":
            return <ClipboardIcon size={size} color={color}/>;
        default:
            return null;
    }
};
