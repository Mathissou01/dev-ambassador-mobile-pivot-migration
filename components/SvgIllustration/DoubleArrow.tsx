import React, { type ReactNode, useContext } from "react";
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "@/hooks/useColorScheme";

export default function DoubleArrow(props: any): ReactNode {
  const colorTheme = useContext(ThemeContext);
  return (
    <Svg
      data-name="Calque 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 212.98 48.74"
      {...props}
    >
      <Path
        d="M445 372.69c53.4-55 142.18-55.32 198.49-.67"
        transform="translate(-437.98 -329.73)"
        fill="none"
        stroke={(colorTheme?.isDark ?? false) === true ? "#fff" : "#000"}
        strokeMiterlimit={10}
        strokeWidth="3px"
      />
      <Path
        d="M208.52 38.77L212.52 47.77 202.52 46.77 208.52 38.77z"
        fill={(colorTheme?.isDark ?? false) === true ? "#fff" : "#000"}
      />
      <Path
        d="M208.52 38.77L202.52 46.77"
        fill={(colorTheme?.isDark ?? false) === true ? "#fff" : "#000"}
        stroke={(colorTheme?.isDark ?? false) === true ? "#fff" : "#000"}
        strokeMiterlimit={10}
      />
      <Path
        d="M212.52 47.77L208.52 38.77"
        fill={(colorTheme?.isDark ?? false) === true ? "#fff" : "#000"}
        stroke={(colorTheme?.isDark ?? false) === true ? "#fff" : "#000"}
        strokeMiterlimit={10}
      />
      <Path
        d="M202.52 46.77L212.52 47.77"
        fill={(colorTheme?.isDark ?? false) === true ? "#fff" : "#000"}
        stroke={(colorTheme?.isDark ?? false) === true ? "#fff" : "#000"}
        strokeMiterlimit={10}
      />
      <Path
        d="M4.05 38.91L10.36 46.48 0.47 48.24 4.05 38.91z"
        fill={(colorTheme?.isDark ?? false) === true ? "#fff" : "#000"}
      />
      <Path
        d="M4.05 38.91L0.47 48.25"
        fill={(colorTheme?.isDark ?? false) === true ? "#fff" : "#000"}
        stroke={(colorTheme?.isDark ?? false) === true ? "#fff" : "#000"}
        strokeMiterlimit={10}
      />
      <Path
        d="M10.36 46.48L4.05 38.91"
        fill={(colorTheme?.isDark ?? false) === true ? "#fff" : "#000"}
        stroke={(colorTheme?.isDark ?? false) === true ? "#fff" : "#000"}
        strokeMiterlimit={10}
      />
      <Path
        d="M0.47 48.25L10.36 46.48"
        fill={(colorTheme?.isDark ?? false) === true ? "#fff" : "#000"}
        stroke={(colorTheme?.isDark ?? false) === true ? "#fff" : "#000"}
        strokeMiterlimit={10}
      />
    </Svg>
  );
}
