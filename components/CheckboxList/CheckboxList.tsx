import React, {FC, useContext, useState} from 'react'
import {View} from 'react-native'
import styles from "./CheckboxListStyle";
import LabelTemplate from "@/components/FormTemplate/LabelTemplate";
import {decodeHTML} from "entities";
import {Checkbox} from "expo-checkbox";
import {ThemeContext} from "@/hooks/useColorScheme";
import {Text} from "@/components/Themed";

type IRadioButton = {
    setValue: (value: (string | number)[]) => void
    options: Array<{ label: string; value: string }>;
}

const CheckboxList: FC<IRadioButton> = ({options, setValue}) => {

    const colorTheme = useContext(ThemeContext);

    const [selected, setSelected] = useState<(string | number)[]>([]);

    const onUpdate = (value: string | number) => {
        setSelected((prevState) => {
            let newState = [];

            if (prevState.includes(value))
                newState = prevState.filter((i) => i !== value);
            else
                newState = [...prevState, value];

            setValue(newState);

            return newState
        });
    }

    return (
        <View style={styles.container}>
            {options.map((option, index) => (
                <View style={styles.item} key={index}>
                    <Text semiBold>{option.label}</Text>
                    <Checkbox
                        color={colorTheme?.colors.primary}
                        style={[styles.checkbox]}
                        value={selected.includes(option.value)}
                        onValueChange={() => {
                            onUpdate(option.value)
                        }}/>
                </View>
            ))}
        </View>
    )
}

export default CheckboxList;
