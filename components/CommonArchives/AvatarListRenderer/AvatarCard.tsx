import React, { type ReactElement } from "react";
import Animated, { interpolate, type SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "@/components/Themed";
import { useHeaders } from "@/hooks/useHeaders";
import useColorScheme from "@/hooks/useColorScheme";
import WebTechLogo from "@/components/SvgIllustration/SchoolLogo/WebTechLogo";
import AtlasLogo from "@/components/SvgIllustration/SchoolLogo/AtlasLogo";
import MagnumLogo from "@/components/SvgIllustration/SchoolLogo/MagnumLogo";
import BachelorLogo from "@/components/SvgIllustration/SchoolLogo/BachelorLogo";
import NextuLogo from "@/components/SvgIllustration/SchoolLogo/NextuLogo";
import { type User } from "@/hooks/API/ObjectTypes/User";
import { useGetSchoolByNameQuery, useGetSchoolQuery } from "@/services/schools";
import { LoadingRect } from "@/components/LoadingSqueleton/LoadingRect";
import { InterogationPointIcon } from "@/components/IconComponent";
import { colors } from "@/config/styles/01-settings/_colors";
import styles from "./AvatarCardStyle";

interface IAvatarCards {
  user: Partial<User>;
  scrollXOffsetSharedValue: SharedValue<number>;
  inputRange: number[];
  index: number;
}

const AvatarCard = ({
  user,
  inputRange,
  scrollXOffsetSharedValue,
  index,
}: IAvatarCards): React.JSX.Element => {
  // API DATA
  const { data: userSchool, isLoading } =
    typeof user.school === "string"
      ? useGetSchoolQuery(user.school)
      : useGetSchoolByNameQuery("NEXT-U");

  const CARD_WIDTH = (40 / 200) * Dimensions.get("screen").width;
  const CARD_HEIGHT = (20 / 200) * Dimensions.get("screen").height;

  const [hasNoAvatar, setHasNoAvatar] = React.useState(false);

  const animatedTranslationStyle = useAnimatedStyle(() => {
    const interpolatedX = interpolate(scrollXOffsetSharedValue.value, inputRange, [-10, 0, 10]);
    return {
      transform: [{ translateX: interpolatedX - CARD_WIDTH / 2 }, { translateY: -CARD_HEIGHT / 2 }],
    };
  });
  const isDark = useColorScheme() === "dark";

  const headers = useHeaders();

  const SchoolLogo = ({ schoolName }: { schoolName: string }): ReactElement => {
    switch (schoolName) {
      case "WebTech Institute":
        return (
          <WebTechLogo height={40} style={styles.illustrationSchoolLogo} fillColor="#3a393790" />
        );
      case "ATLAS Institute":
        return (
          <AtlasLogo height={60} style={styles.illustrationSchoolLogo} fillColor="#3a393790" />
        );
      case "Magnum Institute":
        return (
          <MagnumLogo height={50} style={styles.illustrationSchoolLogo} fillColor="#3a393790" />
        );
      case "Bachelor Institute":
        return (
          <BachelorLogo height={45} style={styles.illustrationSchoolLogo} fillColor="#3a393790" />
        );
      case "ESCEN":
        // return <EscenLogo height={50} style={styles.illustrationSchoolLogo} fillColor="#3a393790" />;
        return (
          <Image
            style={{ height: 50, objectFit: "contain", opacity: 0.9, tintColor: "#3a393790" }}
            source={require("@/assets/images/school/light/ESCEN_new-logo.png")}
          />
        );
      default:
        // Default logo
        return <NextuLogo style={styles.illustrationSchoolLogo} fillColor="#3a393790" />;
    }
  };

  if (isLoading)
    return <LoadingRect index={index} width={CARD_WIDTH} height={CARD_HEIGHT}></LoadingRect>;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        ...styles.cardContainer,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
      }}
    >
      <View style={styles.cardContent}>
        <Text bold style={styles.textFirstName} ellipsizeMode={"middle"} numberOfLines={1}>
          {user.firstname}
        </Text>
      </View>
      <LinearGradient
        colors={[
          userSchool?.colors?.primary ?? "#21a5ff",
          userSchool?.colors?.secondary ?? "#0072bf",
        ]}
        style={styles.gradientContainer}
      >
        <SchoolLogo schoolName={userSchool?.name ?? "ESCEN"} />
      </LinearGradient>
      <BlurView intensity={8} style={{display: "flex", alignItems: "center"}}>
        {hasNoAvatar && (
          <InterogationPointIcon
            width={50}
            height={50}
            fill={isDark ? colors.black : colors.backgroundDefault}
            color={isDark ? colors.black : colors.backgroundDefault}
            style={{top: 20}}
          />
        )}
        {!hasNoAvatar && (
          <Animated.Image
            onError={() => {
              setHasNoAvatar(true);
            }}
            source={{
              uri: user.avatarUri,
              headers,
            }}
            alt=""
            resizeMode="contain"
            style={[
              {
                height: CARD_HEIGHT,
                width: CARD_WIDTH,
                display: "flex",
                left: "50%",
                top: "50%",
                justifyContent: "center",
                alignItems: "center",
              },
              animatedTranslationStyle,
            ]}
          />
        )}
      </BlurView>
    </TouchableOpacity>
  );
};

export default AvatarCard;
