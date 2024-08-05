import React from "react";
import Svg, {Path, SvgProps} from "react-native-svg";
import { type MusicBackgroundProps } from "@/types";

export default function Street({
  mainColor,
  secondColor,
  thirdColor,
  fourthColor,
  style,
  ...props
}: MusicBackgroundProps & SvgProps): React.JSX.Element {
  return (
    <Svg viewBox="0 0 900 900" preserveAspectRatio="xMidYMid slice" style={style} {...props}>
      <Path
        d="M0 406l64-279 65 252 64 45 64-315 64 36 65 54 64 54 64-63h65l64 144 64-99 64 36 65-117 64-27V0H0z"
        fill={mainColor}
      />
      <Path
        d="M0 523l64-252 65 333 64-45 64-117 64-189 65 171 64-18 64-81 65 18 64 252 64-81h64l65-72 64-81V125l-64 27-65 117-64-36-64 99-64-144h-65l-64 63-64-54-65-54-64-36-64 315-64-45-65-252L0 404z"
        fill={secondColor}
      />
      <Path
        d="M0 703l64 27 65-27 64-18 64 135 64-99 65 81 64-135 64 18 65 162 64-72 64 18 64-90 65 9 64 45V359l-64 81-65 72h-64l-64 81-64-252-65-18-64 81-64 18-65-171-64 189-64 117-64 45-65-333L0 521z"
        fill={thirdColor}
      />
      <Path
        d="M0 901h900V755l-64-45-65-9-64 90-64-18-64 72-65-162-64-18-64 135-65-81-64 99-64-135-64 18-65 27-64-27z"
        fill={fourthColor}
      />
    </Svg>
  );
}
