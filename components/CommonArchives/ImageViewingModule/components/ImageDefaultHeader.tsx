import React from "react";
import { Image, type ImageSourcePropType, SafeAreaView, TouchableOpacity } from "react-native";
import { CloseIcon } from "@/components/IconComponent";
import { colors } from "@/config/styles/01-settings/_colors";
import { Text, View } from "@/components/Themed";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import styles from "./ImageDefaultHeaderStyle";

interface Props {
  onRequestClose: () => void;
  userAvatar: ImageSourcePropType;
  userName: string;
}

const HIT_SLOP = { top: 16, left: 16, bottom: 16, right: 16 };

const ImageDefaultHeader = ({ userAvatar, onRequestClose, userName }: Props): React.JSX.Element => (
  <SafeAreaView style={styles.root}>
    <View style={[styles.userInfoContainer]}>
      <View style={[styles.imageAvatarContainer]}>
        {/* Image */}
        <Image style={[styles.userInfoImageAvatar]} source={userAvatar} />
        {/* Fond */}
        <Svg width={150} height={150} style={styles.backgroundScreen}>
          <Defs>
            <RadialGradient id="gradient" cx="30%" cy="35%">
              <Stop offset="5%" stopColor={colors.white} stopOpacity="0.6" />
              <Stop offset="80%" stopColor="transparent" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Rect x={0} y={0} width={150} height={150} fill="url(#gradient)" />
        </Svg>
        <Text style={styles.userInfoText}>{userName}</Text>
      </View>
      <View style={[styles.rightContainer]}>
        <TouchableOpacity style={styles.closeButton} onPress={onRequestClose} hitSlop={HIT_SLOP}>
          <CloseIcon size={18} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>
);

export default ImageDefaultHeader;
