import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { SvgCustomProps } from "@/types";

export default function WebTechLogo({
  style,
  fillColor,
  ...props
}: SvgCustomProps) {
  return (
    <Svg viewBox="0 0 75.64 37.89" style={style} {...props}>
      <Path
        d="M20.93 39.77c-1.1-.09-2.76.52-3.71-.22s-1.1-2.31-1.57-3.52Q9.35 19.64 3 3.25c-.42-1.07-.2-1.23.85-1.2 2 .07 4.08.05 6.11 0a1.11 1.11 0 011.25.78q6.88 18 13.82 36c.31.8.11 1-.66.93-1.04-.02-2.12.01-3.44.01z"
        transform="translate(-2.84 -2.03)"
        data-name="Calque 7"
        fill={fillColor}
      />
      <Path
        d="M19 2.07h7.75c.76 0 .74.61.91 1C32.29 15.07 36.85 27 41.49 39c.22.56.14.78-.52.77h-6.83c-.8 0-.88-.5-1.07-1C28.4 26.52 23.59 14.36 19 2.07z"
        transform="translate(-2.84 -2.03)"
        data-name="Calque 6"
        fill={fillColor}
      />
      <Path
        d="M66.94 39.77h-10c-1 0-1.27-.31-1.23-1.27.08-1.82.06-3.65 0-5.47 0-.69.21-.87.88-.87h21.02c.7 0 .87.23.86.89 0 1.9-.06 3.8 0 5.71 0 .8-.22 1-1 1-3.47-.01-7.01.01-10.53.01z"
        transform="translate(-2.84 -2.03)"
        data-name="Calque 5"
        fill={fillColor}
      />
      <Path
        d="M67.14 2.07h10.29c.86 0 1.08.26 1 1.07-.06 1.9 0 3.81 0 5.71 0 .62-.18.82-.81.82H56.48c-.64 0-.82-.21-.81-.82 0-1.91.06-3.81 0-5.72 0-.82.21-1.07 1-1.06 3.53.03 7 0 10.47 0z"
        transform="translate(-2.84 -2.03)"
        data-name="Calque 4"
        fill={fillColor}
      />
      <Path
        d="M63.24 24.67h-6.7c-.69 0-.88-.22-.87-.88v-5.84c0-.71.26-.84.9-.84H70c.61 0 1 .06.93.81v5.95c0 .65-.23.79-.83.78z"
        transform="translate(-2.84 -2.03)"
        data-name="Calque 3"
        fill={fillColor}
      />
      <Path
        d="M46.05 7v2.78a.94.94 0 01-.21.66 1 1 0 01-.88.2h-5.82c-.51 0-.7-.18-.69-.69V3.77c0-.61.26-.71.79-.71h6.09c.56 0 .79.16.77.74a17.49 17.49 0 00-.05 3.2z"
        transform="translate(-2.84 -2.03)"
        data-name="Calque 2"
        fill={fillColor}
      />
    </Svg>
  );
}
