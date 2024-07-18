import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

export default function PdfFiles({ color }) {
  return (
    <Svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <Path
          d="M13.586 2a2 2 0 011.284.467l.13.119L19.414 7a2 2 0 01.578 1.238l.008.176V20a2 2 0 01-1.85 1.995L18 22H6a2 2 0 01-1.995-1.85L4 20V4a2 2 0 011.85-1.995L6 2h7.586zM12 4H6v16h12V10h-4.5a1.5 1.5 0 01-1.493-1.356L12 8.5V4zm.988 7.848a6.223 6.223 0 002.235 3.872c.887.717.076 2.121-.988 1.712a6.223 6.223 0 00-4.47 0c-1.065.41-1.876-.995-.989-1.712a6.222 6.222 0 002.235-3.872c.178-1.127 1.8-1.126 1.977 0zm-.99 2.304l-.688 1.196h1.38l-.691-1.196zM14 4.414V8h3.586L14 4.414z"
          fill={color}
          transform="translate(-480 -96) translate(480 96)"
        />
      </G>
    </Svg>
  );
}

