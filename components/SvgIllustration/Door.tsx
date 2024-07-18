import * as React from "react";
import Svg, { G, Path, Circle } from "react-native-svg";

const Door = ({ color }: SvgProps & Props): React.JSX.Element => (
    <Svg height={320} width={320} viewBox="0 0 21 21">
        <G fill="none" fillRule="evenodd" transform="translate(4 1)">
            <Path
                d="M2.5 2.5h2v14h-2a2 2 0 01-2-2v-10a2 2 0 012-2zM7.202.513l4 1.5A2 2 0 0112.5 3.886v11.228a2 2 0 01-1.298 1.873l-4 1.5A2 2 0 014.5 16.614V2.386A2 2 0 017.202.513z"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Circle cx={6.5} cy={9.5} fill={color} r={1} />
        </G>
    </Svg>
);

export default Door;
