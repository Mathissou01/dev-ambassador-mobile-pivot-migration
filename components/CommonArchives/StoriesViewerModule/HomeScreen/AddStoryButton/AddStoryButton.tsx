import React, { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";
import { View } from "@/components/Themed";
import { ThemeContext } from "@/hooks/useColorScheme";
import { AddIcon } from "@/components/IconComponent";
import { colors } from "@/config/styles/01-settings/_colors";
import { AuthorizedImages } from "@/components/AuthorizedImages";
import { type User } from "@/hooks/API/ObjectTypes/User";
import styles from "./AddStoryButtonStyle";

interface AddStoryButton {
  user: User;
  userIndex: number;
  addStory: (userIndex: number) => void;
  canPublish: boolean;
}

export const AddStoryButton: React.FC<AddStoryButton> = ({
  addStory,
  userIndex,
  user,
  canPublish,
}) => {
  const themeColor = useContext(ThemeContext);
  return (
    <View style={styles.addStorieButtonContainer}>
      <LinearGradient
        colors={[
          themeColor?.colors?.primaryLight || "#21a5ff",
          themeColor?.colors?.secondaryDark || "#0072bf",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBorderContainer}
      >
        <Pressable
          disabled={!canPublish}
          style={styles.addStoryButton}
          onPress={() => {
            addStory(userIndex);
          }}
        >
          <AuthorizedImages style={styles.addStoryAvatar} source={{ uri: user.avatarUri }} />
          <View style={styles.addStorieIconContainer}>
            {canPublish && (
              <View style={styles.addStorieIcon}>
                <AddIcon
                  size={16}
                  color={themeColor?.isDark ?? false ? colors.textDark : colors.textLight}
                />
              </View>
            )}
          </View>
        </Pressable>
      </LinearGradient>
    </View>
  );
};
