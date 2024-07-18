import * as React from "react";
import Svg, { Path, Text } from "react-native-svg";
import { useContext } from "react";
import { ThemeContext } from "@/hooks/useColorScheme";
import { type PortIconProps } from "@/types";

export default function Hdmi(props: PortIconProps): React.JSX.Element {
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
    <Svg x="0px" y="0px" viewBox="0 0 199.8 74.4" enableBackground="new 0 0 199.8 74.4" {...props}>
      <Path
        d="M100.5 9.1h81.4c7.2 0 9 1.8 9 9.2 0 7-.1 14 0 21 0 3.9-1.5 6.5-5.4 7.2-7.3 1.1-12.5 5.5-16 11.5-3.1 5.3-7 7.3-13.4 7.2-37.8-.3-75.5-.3-113.3 0-5.5 0-9.1-1.8-12-6.3-2.4-3.6-4.9-7.2-8.6-9.6-1.5-1-3.2-1.7-4.9-2.2C9.3 45 9 44.7 9 36.7V17.2c0-6 2-8.1 8.1-8.1h83.4z"
        fill="none"
        strokeWidth={8}
        strokeMiterlimit={10}
        stroke={colors[colorTheme?.isDark ? "dark" : "light"].border}
      />
      <Path
        d="M30.6 33.6c.6-2.2-.6-5.3 2.3-6.3 1.4-.5 4.6-1.1 4.9.6.6 3.2 2.7 2.3 4.4 2.4 1.2.1 2.3.3 2.9-1.7.7-2.1 5.3-2.1 6.7-.3 2.1 2.8 5 2.9 6.9.2s4.7-2.1 6.6-.4c3.2 2.8 4.1 2.9 7.1.1 1.9-1.8 4.6-2.2 6.6.3s4.9 2.5 7 0c1.4-1.9 4.2-2.3 6.1-.9.2.2.4.3.6.5 3 2.9 4 2.9 7.2-.1 1.9-1.7 4.8-1.7 6.5.1 2.9 2.9 4 2.8 7.1 0 1.9-1.7 4.5-2.2 6.5.4s4.5 2.3 7-.3c1.5-1.8 4.3-2.1 6.1-.6l.6.6c2.5 2.8 4.6 2.8 7.1 0 1.5-1.8 4.2-2.1 6.1-.6l.6.6c2.5 2.6 4.8 2.9 7 .2s5.3-2.3 6.3-.2c1.2 2.4 2.7 1.9 4.3 2.1s3.9-.9 3.9 2.2.4 6.7-2.2 8.6c-1.7 1.3-4.1 1.1-5.4-.6-.3-.4-.5-.8-.6-1.2-1-2.2-4.5-2-6.2-.1-2.9 3.5-4.6 3.9-7.5-.2-1.4-1.7-3.9-1.9-5.5-.5-.4.3-.7.7-.9 1.2-1.7 2.6-4.9 2.4-7-.2s-4.8-2.1-6.6-.3c-3 2.9-4.7 3.1-7.2.2-2-2.3-4.5-2.2-6.5 0-2.5 2.7-4.9 2.9-7 .1-1.7-1.8-4.5-2-6.3-.3-.2.1-.3.3-.4.4-1.9 2.7-5.1 2.6-6.9-.1-1.3-1.9-5.5-1.9-6.9 0-1.9 2.8-5 2.7-7 .1s-4.6-2.2-6.5-.3c-3 2.9-4.3 2.9-7.2 0-1.9-1.9-4.5-2.3-6.5.2s-5.1 2.7-7 0c-1.4-2-5.9-2.2-6.8-.1-1.6 3.7-6.1 2.1-6.2 1.5-1-3.6-3.5-2.8-5.8-2.8-3.8.2-1.6-2.9-2.3-4.5z"
        fill={colors[colorTheme?.isDark ? "dark" : "light"].inner}
      />
      <Text
        x="50%"
        y="50%"
        transform="translate(-50, 20)"
        fontSize="40"
        fill={colors[colorTheme?.isDark ? "dark" : "light"].text}
      >
        HDMI
      </Text>
    </Svg>
  );
}

