import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { type IconProps } from "../../../types";

export default function SaveIcon({ color = "#000", size }: IconProps): React.JSX.Element {
  return (
    <Svg viewBox="0 0 48 48" width={size} height={size} fill="none">
      <G
        transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)"
        fill={color}
        stroke="none"
      >
        <Path d="M107 460 c-40 -4 -63 -11 -72 -23 -32 -45 -29 -363 5 -397 36 -36 364 -36 400 0 21 21 36 187 25 274 -6 49 -12 60 -56 101 -26 25 -56 45 -66 46 -102 3 -188 3 -236 -1z m43 -54 c0 -41 25 -56 90 -56 65 0 90 15 90 56 0 34 18 30 62 -13 l38 -37 0 -141 c0 -141 -5 -165 -37 -165 -10 0 -13 22 -13 86 0 126 3 124 -140 124 -143 0 -140 2 -140 -124 0 -87 -8 -104 -38 -74 -17 17 -17 339 0 356 7 7 29 12 50 12 34 0 38 -3 38 -24z m148 2 c-3 -21 -9 -23 -58 -23 -49 0 -55 2 -58 23 -3 21 0 22 58 22 58 0 61 -1 58 -22z m50 -269 l3 -86 -32 -7 c-40 -8 -118 -8 -158 0 l-31 7 0 82 c0 45 3 85 7 89 4 4 52 5 107 4 l101 -3 3 -86z" />
        <Path d="M183 168 c2 -8 23 -13 57 -13 34 0 55 5 58 13 3 9 -13 12 -58 12 -45 0 -61 -3 -57 -12z" />
        <Path d="M183 108 c2 -7 19 -13 37 -13 18 0 35 6 38 13 2 8 -9 12 -38 12 -29 0 -40 -4 -37 -12z" />
      </G>
    </Svg>
  );
}