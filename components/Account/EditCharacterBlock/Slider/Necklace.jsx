import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 800"
      xmlSpace="preserve"
      enableBackground="new 0 0 800 800"
      {...props}
    >
      <Path
        d="M400 800c-101.3 0-195.8-58.7-266.1-165.3C66.3 532.2 28.4 396.1 27.2 251.4c0-4 .8-7.9 2.4-11.5 3.6-8.2 7.9-11.1 19.5-18.8 65.4-43.4 176.6-126.6 187.1-196.4C238.3 10.5 250.7 0 265.4 0h251.4c14.7 0 27.1 10.5 29.3 24.7 8.3 55.5 83.4 127.7 205.8 197.8 8.8 5 14.6 8.4 18.5 17.3 1.6 3.7 2.4 7.6 2.4 11.6-1.3 144.7-39.2 280.8-106.8 383.3C595.8 741.3 501.3 800 400 800z"
        stroke={props.color || "black"}
        strokeWidth="40px"
        fill="none"
      />
      <Path
        d="M632.2 141.2c-50.9 87.2-134.8 178.3-218.5 236.6-3.9 2.7-8.4 4.1-13.3 4.1-4.8 0-9.4-1.4-13.3-4.1-89.7-62.4-174.3-154.7-224.6-244.4-6.1 5.7-12.3 11.2-18.7 16.7 52.4 91.3 138.3 184.5 229.3 247.8 8 5.6 17.4 8.5 27.2 8.5 9.9 0 19.3-2.9 27.2-8.5 85.4-59.4 171-152.1 223.8-241.2-6.5-5.2-13-10.4-19.1-15.5z"
        fill={props.color || "black"}
        strokeWidth="0px"
      />
      <Path
        d="M400.4 732.3c42.2 0 78.9-29.7 89.2-72.3.1-.4.2-.7.3-1.1 1.6-7.2 2.4-21.3 2.5-23.8.8-56.2-32.1-114.3-85.8-151.7-1.8-1.3-4-1.9-6.1-1.9-2.1 0-4.3.6-6.1 1.9-53.7 37.4-86.6 95.5-85.8 151.7.1 2.6.8 16.6 2.5 23.8.1.4.1.6.2.9l.3 1.2c10.4 42 46.9 71.3 88.8 71.3z"
        stroke={props.color || "black"}
        strokeWidth="20px"
        fill="none"
      />
      <Circle cx={400.4} cy={637.8} r={53.6} fill={props.color || "black"} />
      <Circle
        className="st4"
        cx={305.4}
        cy={328}
        r={38.9}
        fill={props.color || "black"}
      />
      <Circle
        className="st4"
        cx={496.8}
        cy={328}
        r={38.9}
        fill={props.color || "black"}
      />
      <Circle
        className="st5"
        cx={582.9}
        cy={231.9}
        r={38.9}
        fill={props.color || "black"}
      />
      <Circle
        className="st5"
        cx={218}
        cy={231.9}
        r={38.9}
        fill={props.color || "black"}
      />
      <Circle cx={400.4} cy={442.1} r={53.6} fill={props.color || "black"} />
    </Svg>
  );
}

export default SvgComponent;
