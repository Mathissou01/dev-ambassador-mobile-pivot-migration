import React, {FC, useContext} from 'react'
import {TouchableOpacity, View} from 'react-native'
import styles from "./RadioButtonStyle";
import {ThemeContext} from "@/hooks/useColorScheme";
import {Text} from "@/components/Themed";

type IRadioButton = {
    onClick: () => void,
    label: string;
    selected: boolean;
}

const RadioButton: FC<IRadioButton> = ({onClick, label, selected = false}) => {
    const themeContext = useContext(ThemeContext);

    return (
        <TouchableOpacity style={styles.container} onPress={onClick}>
            <View style={[styles.radio, {borderColor: themeContext?.colors.primary}]}>
                {selected &&
                    <View
                        style={[styles.radio, styles.radioSelected, {backgroundColor: themeContext?.colors.primary}]}/>
                }
            </View>
            <Text semiBold>{label}</Text>
        </TouchableOpacity>
    )
}

export default RadioButton;
