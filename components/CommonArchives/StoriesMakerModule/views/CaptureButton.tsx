import React, { useCallback, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, type ViewProps } from "react-native";
import { Audio } from "expo-av";
import Reanimated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import type { Camera, PhotoFile, VideoFile } from "react-native-vision-camera";
import { CAPTURE_BUTTON_SIZE } from "../Constants";

const BORDER_WIDTH = CAPTURE_BUTTON_SIZE * 0.1;

interface Props extends ViewProps {
  camera: React.RefObject<Camera>;
  onMediaCaptured: (media: PhotoFile | VideoFile, type: "photo" | "video") => void;

  minZoom: number;
  maxZoom: number;
  cameraZoom: Reanimated.SharedValue<number>;

  flash: "off" | "on";

  enabled: boolean;

  setIsPressingButton: (isPressingButton: boolean) => void;
}

const _CaptureButton: React.FC<Props> = ({
  camera,
  onMediaCaptured,
  minZoom,
  maxZoom,
  cameraZoom,
  flash,
  enabled,
  setIsPressingButton,
  style,
  ...props
}): React.ReactElement => {
  const [tsIsPressing, setIsPressing] = useState(false);
  const isPressingButton = useSharedValue(false);
  // SOUND PLAYER
  const playSound = async (): Promise<void> => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("@/assets/sounds/TAKINGPHOTO.mp3")
      );
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  // #region Camera Capture
  const takePhoto = useCallback(async () => {
    try {
      if (camera.current == null) throw new Error("Camera ref is null!");
      console.log("Taking photo...");
      const photo = await camera.current.takePhoto({
        flash,
        enableShutterSound: true,
        enableAutoRedEyeReduction: true,
      });
      console.log("Photo waiting !");
      onMediaCaptured(photo, "photo");
      console.log("Photo taken !");
    } catch (e) {
      console.error("Failed to take photo!", e);
    }
  }, [camera, flash, onMediaCaptured]);

  const buttonStyle = useAnimatedStyle(() => {
    let scale: number;
    if (enabled) {
      if (isPressingButton.value) {
        scale = withRepeat(
          withSpring(1, {
            stiffness: 100,
            damping: 1000,
          }),
          -1,
          true
        );
        // backgroundColor = "red";
      } else {
        scale = withSpring(0.9, {
          stiffness: 500,
          damping: 300,
        });
      }
    } else {
      scale = withSpring(0.6, {
        stiffness: 500,
        damping: 300,
      });
    }

    return {
      opacity: withTiming(enabled ? 1 : 0.3, {
        duration: 100,
        easing: Easing.linear,
      }),
      transform: [
        {
          scale,
        },
      ],
    };
  }, [enabled, isPressingButton]);

  const shadowStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          scale: withSpring(tsIsPressing ? 1 : 0, {
            mass: 1,
            damping: 35,
            stiffness: 300,
          }),
        },
      ],
    }),
    [tsIsPressing]
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        void takePhoto();
      }}
      onPressIn={() => {
        setIsPressingButton(true);
        setIsPressing(true);
      }}
      onPressOut={() => {
        setIsPressingButton(false);
        void playSound();
      }}
    >
      <Reanimated.View {...props} style={[buttonStyle, style]}>
        <Reanimated.View style={[styles.flex]}>
          <Reanimated.View style={[styles.shadow, shadowStyle]} />
          <Reanimated.View style={[styles.button]} />
        </Reanimated.View>
      </Reanimated.View>
    </TouchableWithoutFeedback>
  );
};

export const CaptureButton = React.memo(_CaptureButton);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  shadow: {
    position: "absolute",
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    backgroundColor: "#e34077",
  },
  button: {
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    borderWidth: BORDER_WIDTH,
    borderColor: "white",
    backgroundColor: "transparent",
  },
});
