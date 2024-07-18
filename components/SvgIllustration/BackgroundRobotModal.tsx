import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { Image } from "react-native";

export default function BackgroundRobotModal(props) {
  return (
    // Keep into a svg to make some futures changes
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 882.57 1027.28"
      width={100}
      height={100}
      style={{ position: "absolute", left: "-25%", top: "0%", zIndex: -1 }}
    >
      <Image
        style={{
          width: 100,
          height: 100,
          position: "absolute",
          top: 4,
          left: "10%",
          zIndex: 2,
        }}
        source={require("../../assets/images/robot-scene/modal-scene.png")}
      />
      {/* <Path
        d="M353.72 0v32.31H252.81v30.62h-51.26v34.01h17.62v30.62h-33.64v42.52H159.9v42.52h-59.26v30.61h19.22v32.32h20.82v42.52h-40.04v35.71H33.36v37.42h12.82v47.62h32.31v35.72H0v35.72h46.18v39.11H20.55v39.12h80.09v39.12H78.49v37.42h92.63v30.61H46.18v49.33h32.31v40.81h41.37v32.32h-86.5v47.62h107.32v39.12h-40.04v51.02H78.49v37.42h107.04v34.02h697.05V0H353.72z"
        fill={"white"}
      /> */}
    </Svg>
  );
}
