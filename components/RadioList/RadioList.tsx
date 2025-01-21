import React, {FC, useState} from 'react'
import {View} from 'react-native'
import RadioButton from "@/components/RadioButton/RadioButton";
import styles from "./RadioListStyle";

type IRadioButton = {
    setValue: (value: string | number) => void
    options: Array<{ label: string; value: string }>;
}

const RadioList: FC<IRadioButton> = ({options, setValue}) => {

    const [selected, setSelected] = useState<string | number>("");

    const onUpdate = (value: string | number) => {
        setValue(value);
        setSelected(value);
    }

    return (
        <View style={styles.container}>
            {options.map((option, index) => (
                <RadioButton selected={selected === option.value} onClick={() => onUpdate(option.value)}
                             label={option.label} key={index}/>
            ))}
        </View>
    )
}

export default RadioList;
