import * as React from "react";
import Svg, { SvgProps, G, Path, Circle } from "react-native-svg";
import { hexToRgbA } from "@/utils/hexToRgbA";
import { type MusicBackgroundProps } from "@/types";

export default function Avoir({
  mainColor,
  secondColor,
  thirdColor,
  fourthColor,
  style,
  ...props
}: MusicBackgroundProps & SvgProps): React.JSX.Element {
  return (
    <Svg preserveAspectRatio="none" viewBox="0 0 900 900" {...props}>
      <G fill="none">
        <Path fill={hexToRgbA(secondColor, 0.6)} d="M0 0H900V900H0z" />
        <Circle r={29.11} cx={800.1} cy={159.88} fill={mainColor} />
        <Circle r={88.33} cx={327.85} cy={192.27} fill={secondColor} />
        <Circle r={79.27} cx={94.75} cy={398.38} fill={thirdColor} />
        <Circle r={41.055} cx={297.16} cy={129.71} fill={fourthColor} />
        <Circle r={47.42} cx={845.77} cy={448.88} fill={thirdColor} />
        <Circle r={56.59} cx={252.89} cy={469.98} fill={fourthColor} />
        <Circle r={42.775} cx={572.32} cy={618.76} fill={thirdColor} />
        <Circle r={73.685} cx={766.83} cy={771.84} fill={secondColor} />
        <Circle r={60.975} cx={887.85} cy={181.27} fill={mainColor} />
      </G>
    </Svg>
  );
}
