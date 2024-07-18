import React, { useState, useEffect, useContext, useRef } from "react";
import { PanResponder, TouchableOpacity, Animated, Dimensions } from "react-native";
import { Audio } from "expo-av";
import { View, Text } from "@components/Themed";
import { ThemeContext } from "../../hooks/useColorScheme";
import { colors } from "../../config/styles/01-settings/_colors";
import { type AudioControllerProp } from "../../types";
import { PlayIcon, PauseIcon, NextIcon, PreviousIcon, StarIcon } from "../IconComponent";
import styles from "./AudioControllerStyle";

export default function AudioController({
  mp3File,
  musicTitle,
  musicSubtitle,
  musicTheme,
  musicTag,
  onPlayPause,
  onNext,
  onPrevious,
  isToggleAnimating,
  isPlaying,
  setIsPlaying,
}: AudioControllerProp): React.JSX.Element {
  const colorTheme = useContext(ThemeContext);
  const width = Dimensions.get("window").width;
  const sound = useRef(null);

  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [lastPosition, setLastPosition] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isStarred, setIsStarred] = useState(false);

  const handleStarPress = () => {
    setIsStarred(!isStarred); // Toggle star icon state
  };

  useEffect(() => {
    setPosition(0);
    setIsPlaying(false);
    async function loadSound(): Promise<void> {
      try {
        const { sound: loadedSound } = await Audio.Sound.createAsync(
          mp3File,
          {},
          (playbackStatus) => {
            if (playbackStatus.isLoaded) {
              setDuration(playbackStatus.durationMillis);
            }
          }
        );
        sound.current = loadedSound;
      } catch (err) {
        console.error("Failed to load sound", err);
      }
    }

    void loadSound();

    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, [mp3File]);

  useEffect(() => {
    const updatePosition = async (): Promise<void> => {
      if (sound.current !== null && isPlaying && !isSeeking) {
        const { positionMillis } = await (sound.current as any).getStatusAsync();
        setPosition(positionMillis);
        setLastPosition(positionMillis);
      }
    };

    const interval = setInterval(updatePosition, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, isSeeking]);

  useEffect(() => {
    if (!isSeeking) {
      setLastPosition(position);
    }
  }, [position, isSeeking]);

  useEffect(() => {
    const toggleSound = async (): Promise<void> => {
      if (sound.current !== null && sound.current !== undefined) {
        if (isPlaying) {
          await (sound.current as any).playAsync();
        } else {
          await (sound.current as any).pauseAsync();

          const status = await (sound.current as any).getStatusAsync();
          if (status.didJustFinish) {
            await (sound.current as any).setPositionAsync(0);
          }
        }
      }
    };

    void toggleSound();

    if (sound.current !== null && sound.current !== undefined) {
      const onPlaybackStatusUpdate = (playbackStatus: any): void => {
        if (playbackStatus.didJustFinish as boolean) {
          setIsPlaying(false);
        }
      };

      (sound.current as any).setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

      return () => {
        (sound.current as any).setOnPlaybackStatusUpdate(null);
      };
    }
  }, [isPlaying]);

  const handlePlayPausePress = async (): Promise<void> => {
    if (isPlaying) {
      await (sound.current as any).pauseAsync();
      onPlayPause();
    } else {
      if (position === duration) {
        await (sound.current as any).setPositionAsync(0);
      }

      await (sound.current as any).playAsync();
      onPlayPause();
    }

    setIsPlaying(!isPlaying);
  };

  const handleTouchStart = (): void => {
    setIsSeeking(true);
  };

  const handleTouchEnd = async (): Promise<void> => {
    if (sound.current !== null) {
      await (sound.current as any).setPositionAsync(position);
      setIsSeeking(false);
    }
  };

  const handlePanResponderMove = (_: any, gestureState: { dx: any }): void => {
    if (!isSeeking) return;

    const { dx } = gestureState;
    const newPosition = Number(position) + dx / 10;
    setPosition(Math.max(0, Math.min(newPosition, duration ?? 0)));
  };

  const formatTime = (milliseconds: number | null): string => {
    if (milliseconds === null || isNaN(milliseconds)) return "0:00";
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: handleTouchStart,
    onPanResponderMove: handlePanResponderMove,
    onPanResponderRelease: handleTouchEnd,
    onPanResponderTerminate: handleTouchEnd,
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 25,
          alignSelf: "flex-start",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: width * 0.8,
        }}
        lightColor={"transparent"}
        darkColor={"transparent"}
      >
        <View lightColor={"transparent"} darkColor={"transparent"}>
          <Text
            extraBold
            lightColor={colors.black}
            darkColor={colors.gray300}
            style={styles.titleSong}
          >
            {musicTitle}
          </Text>

          <Text
            bolditalic
            lightColor={colors.black}
            darkColor={colors.gray300}
            style={styles.artisteSong}
          >
            {musicTheme !== null && musicTheme !== undefined ? `(${musicTheme})` : ""}
          </Text>
          <Text lightColor={colors.black} darkColor={colors.gray300} style={styles.subTitleSong}>
            {musicSubtitle}
          </Text>
          <Text lightColor={colors.black} darkColor={colors.gray300} style={styles.subTitleSong}>
            {musicTag}
          </Text>
        </View>
        <View lightColor={"transparent"} darkColor={"transparent"}>
          {/* Change star color when clicked */}
          <TouchableOpacity onPress={handleStarPress}>
            <StarIcon
              size={24}
              color={colorTheme?.isDark ?? false ? colors.gray0 : colors.black}
              isStarred={isStarred}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: width * 0.8,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text lightColor={colors.black} darkColor={colors.gray300} style={{ textAlign: "left" }}>
          {formatTime(position)}
        </Text>
        <Text lightColor={colors.black} darkColor={colors.gray300} style={{ textAlign: "right" }}>
          {formatTime(duration)}
        </Text>
      </View>
      <View style={styles.timeTraveler} {...panResponder.panHandlers}>
        <Animated.View
          style={{
            borderColor: "#e0e0e0",
            borderWidth: 1,
            width: lastPosition !== null ? `${(lastPosition / duration) * 100}%` : "0%",
            height: "100%",
            backgroundColor: "#2196F3",
          }}
        />
      </View>
      <View style={styles.controllerContainer}>
        <TouchableOpacity
          style={[
            styles.skipBtn,
            {
              backgroundColor: colorTheme?.isDark ?? false ? colors.gray0 : colors.white,
            },
          ]}
          onPress={onPrevious}
          disabled={isToggleAnimating}
        >
          <PreviousIcon size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.playBtn,
            {
              backgroundColor: colorTheme?.isDark ?? false ? colors.gray0 : colors.white,
            },
          ]}
          onPress={handlePlayPausePress}
          disabled={isToggleAnimating}
        >
          {isPlaying ? <PauseIcon size={35} /> : <PlayIcon size={35} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.skipBtn,
            {
              backgroundColor: colorTheme?.isDark ?? false ? colors.gray0 : colors.white,
            },
          ]}
          onPress={onNext}
          disabled={isToggleAnimating}
        >
          <NextIcon size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
