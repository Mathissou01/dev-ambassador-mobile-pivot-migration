import * as React from "react";
import {
  Animated,
  type StyleProp,
  TouchableWithoutFeedback,
  StyleSheet,
  type GestureResponderHandlers,
} from "react-native";
import { type FunctionComponent } from "react";

interface BlockProps {
  style?: StyleProp<any>;
  dragStartAnimationStyle: StyleProp<any>;
  onPress?: () => void;
  onLongPress: () => void;
  panHandlers: GestureResponderHandlers;
  delayLongPress: number;
  children?: React.ReactNode;
}

export const Block: FunctionComponent<BlockProps> = ({
  style,
  dragStartAnimationStyle,
  onPress,
  onLongPress,
  children,
  panHandlers,
  delayLongPress,
}) => {
  return (
    <Animated.View style={[styles.blockContainer, style, dragStartAnimationStyle]} {...panHandlers}>
      <Animated.View>
        <TouchableWithoutFeedback
          delayLongPress={delayLongPress}
          onPress={onPress}
          onLongPress={onLongPress}
        >
          {children}
        </TouchableWithoutFeedback>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  blockContainer: {
    alignItems: "center",
  },
});
