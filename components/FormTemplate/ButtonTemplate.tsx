import React, {useContext, useEffect, useState} from "react";
import { Animated, TouchableOpacity } from "react-native";
import { type ButtonData } from "@/types";
import { startBlinkAnimation } from "@/utils/AnimationLib";
import { CheckIcon } from "@/components/IconComponent";
import styles from "./FormTemplateStyle";
import {ThemeContext} from "@/hooks/useColorScheme";

const ButtonTemplate = ({ isFormValid, handleSubmit }: ButtonData): React.JSX.Element => {
  const themeContext = useContext(ThemeContext);
  const [blinkAnimation] = useState(new Animated.Value(0.3));

  useEffect(() => {
    if (!isFormValid) {
      blinkAnimation.setValue(0.3);
    } else {
      startBlinkAnimation(blinkAnimation, 0.3);
    }
  }, [isFormValid]);

  return (
    <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={!isFormValid}>
      <Animated.View style={{ opacity: blinkAnimation }}>
        <CheckIcon size={25} color={themeContext?.isDark ?? false ? "white" : "black"} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ButtonTemplate;
