import * as React from "react";
import Svg, { Path, G } from "react-native-svg";

export default function Info({ color }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 110 110"
      xmlSpace="preserve"
      enableBackground="new 0 0 110 110"
    >
      <G transform="translate(0, 7)">
        <Path
          fill={color}
          d="M55 0C24.7 0 0 24.7 0 55s24.7 55 55 55 55-24.7 55-55S85.3 0 55 0zm0 13c23.2 0 42 18.8 42 42S78.2 97 55 97 13 78.2 13 55s18.8-42 42-42zm0 12c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM45 45v4.5h5v29.1h-5V83h20v-4.5h-5V45H45z"
        />
      </G>
    </Svg>
  );
}
