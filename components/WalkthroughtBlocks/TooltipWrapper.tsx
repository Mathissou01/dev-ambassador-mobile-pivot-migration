import { StyleSheet, Platform, StatusBar } from "react-native";
import { Text, View } from "../Themed";
import Tooltip from "react-native-walkthrough-tooltip";
import React, { useState } from "react";

export default function TooltipWrapper({
  children,
  tooltipContent,
  showChildInTooltip,
  placement = "bottom",
}) {
  const [showTip, setTip] = useState(false);

  return (
    <Tooltip
      accessible={false}
      isVisible={showTip}
      supportedOrientations={["portrait"]}
      showChildInTooltip={showChildInTooltip}
      content={
        <View style={styles.containerTooltip}>
          <Text>{tooltipContent}</Text>
        </View>
      }
      onClose={() => setTip(false)}
      placement={placement}
      topAdjustment={Platform.OS === "android" ? -StatusBar.currentHeight : 0}
    >
      {children}
    </Tooltip>
  );
}
const styles = StyleSheet.create({
  containerTooltip: {
    backgroundColor: "transparent",
    alignContent: "center",
    justifyContent: "center",
    padding: 10,
  },
});
