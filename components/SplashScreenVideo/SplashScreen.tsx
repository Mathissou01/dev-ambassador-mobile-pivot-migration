import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { hideAsync } from "expo-splash-screen";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import useColorScheme from "../../hooks/useColorScheme";

type Props = {
  onComplete: (status: boolean) => void;
};

export default function SplashScreen({ onComplete }: Props) {
  const [lastStatus, setStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus);
  const colorSchema = useColorScheme();

  function onPlaybackStatusUpdate(status: AVPlaybackStatus) {
    if (status.isLoaded) {
      if (lastStatus.isLoaded !== status.isLoaded) {
        hideAsync();
      }
      if (status.didJustFinish) {
        onComplete(true);
      }
    }
    setStatus(status);
  }

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: colorSchema === "dark" ? "#0b1623" : "#FEF5EA" },
      ]}
    >
      <Video
        style={[StyleSheet.absoluteFill]}
        videoStyle={[
          StyleSheet.absoluteFill,
          { backgroundColor: colorSchema === "dark" ? "#0b1623" : "#FEF5EA" },
        ]}
        resizeMode={ResizeMode.COVER}
        source={
          colorSchema === "dark"
            ? require("../../assets/videos/dark_splash.mp4")
            : require("../../assets/videos/light_splash.mp4")
        }
        isLooping={false}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        shouldPlay={true}
      />
    </View>
  );
}
