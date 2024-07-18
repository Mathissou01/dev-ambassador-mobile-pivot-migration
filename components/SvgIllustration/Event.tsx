import * as React from "react";
import Svg, {Path, type SvgProps} from "react-native-svg";
import {type Props} from "@/types";

const Event = ({ color }: SvgProps & Props): React.JSX.Element => (
  <Svg height={220} width={220} viewBox="0 0 26 26" fill="none">
    <Path
      d="M18.91 14.692c0 1.29 1.06 2.34 2.35 2.34 0 3.75-.94 4.69-4.69 4.69H7.19c-3.75 0-4.69-.94-4.69-4.69v-.46a2.36 2.36 0 002.35-2.35 2.36 2.36 0 00-2.35-2.35v-.46c.01-3.75.94-4.69 4.69-4.69h9.37c3.75 0 4.69.94 4.69 4.69v.94c-1.29 0-2.34 1.04-2.34 2.34z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.211 6.723h-9.09l2.93-2.93c2.39-2.39 3.59-2.39 5.98 0l.6.6c-.63.63-.78 1.56-.42 2.33z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.879 6.723v15"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="5 5"
      fill={color}
    />
  </Svg>
);

export default Event;
