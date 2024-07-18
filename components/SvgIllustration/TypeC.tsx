import * as React from "react";
import Svg, { Path, Text } from "react-native-svg";
import { useContext } from "react";
import { ThemeContext } from "@/hooks/useColorScheme";
import { type PortIconProps } from "@/types";

export default function TypeC(props: PortIconProps): React.JSX.Element {
  const colorTheme = useContext(ThemeContext);

  const colors = {
    light: {
      border: "black",
      inner: props.isActive ? props.portColor : "black",
      text: "black",
    },
    dark: {
      border: "white",
      inner: props.isActive ? props.portColor : "white",
      text: "white",
    },
  };
  return (
    <Svg x="0px" y="0px" viewBox="0 0 196 86.2" enableBackground="new 0 0 196 86.2" {...props}>
      <Path
        d="M179.4 33.7C175.5 22.5 165 15 153.1 15c-36.8-.1-73.5 0-110.3 0-2 0-4 .2-5.9.6-14.1 3.2-23.4 16.5-21.8 30.9 1.6 14 13.4 24.6 27.5 24.7 18.3.2 36.6 0 54.9 0v.1c18.3 0 36.6-.1 54.9 0 6.7.1 13.2-2.2 18.4-6.5 9.1-7.5 12.6-19.9 8.6-31.1z"
        fill="none"
        strokeWidth={8}
        strokeMiterlimit={10}
        stroke={colors[colorTheme?.isDark ? "dark" : "light"].border}
      />
      <Path
        d="M98 35.7h52.4c1.8-.1 3.7 0 5.5.3 3.8.9 5.5 3.5 5.5 7.3-.1 3.5-1.9 6-5.4 6.8-1.6.3-3.3.4-5 .3H45.1c-1.7.1-3.3 0-5-.3-3.8-.9-5.5-3.6-5.5-7.3.1-3.5 1.9-6 5.4-6.8 1.8-.3 3.6-.4 5.5-.3H98z"
        fill={colors[colorTheme?.isDark ? "dark" : "light"].inner}
      />
      <Text
        x="50%"
        y="50%"
        transform="translate(-60, 20)"
        fontSize="40"
        fill={colors[colorTheme?.isDark ? "dark" : "light"].text}
      >
        Type C
      </Text>
    </Svg>
  );
}
