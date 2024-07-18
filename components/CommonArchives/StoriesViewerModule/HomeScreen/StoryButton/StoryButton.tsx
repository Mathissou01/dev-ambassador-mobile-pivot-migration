import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";
import { Text, View } from "@/components/Themed";
import { ThemeContext } from "@/hooks/useColorScheme";
import styles from "./StoryButtonStyle";
import { AuthorizedImages } from "@/components/AuthorizedImages";
import { useGetStoryQuery } from "@/services/stories";
import {ArchivePost} from "@/hooks/API/ObjectTypes/ArchivePost";

type StoryButtonProps = {
  // user: User;
  userIndex: number;
  openStory: (userIndex: number) => void;
  story: ArchivePost;
};

export const StoryButton: React.FC<StoryButtonProps> = ({
  // user,
  userIndex,
  openStory,
                                                            story,
}) => {
  const [isAvatar, setIsAvatar] = useState<boolean>(true);
  const themeColor = useContext(ThemeContext);
  let initials = "?";
  if (story?.user?.firstname !== undefined && story?.user?.lastname !== undefined) {
    initials = story?.user.firstname?.slice(0, 1) + story?.user.lastname?.slice(0, 1);
  }
  return (
    <View key={story._id}>
      <LinearGradient
        colors={[
          themeColor?.colors?.primaryLight ?? "#21a5ff",
          themeColor?.colors?.secondaryDark ?? "#0072bf",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBorder}
      >
        <Pressable
          style={styles.storyButton}
          onPress={() => {
            openStory(userIndex);
          }}
        >
          <AuthorizedImages
            onError={() => {
              setIsAvatar(false);
            }}
            style={[styles.image, { display: isAvatar ? "flex" : "none" }]}
            source={{ uri: story?.user?.avatarUri ?? "#" }}
          />
          {!isAvatar && (
            <Text bold style={{ fontSize: 30, textAlign: "center" }}>
              {initials}
            </Text>
          )}
        </Pressable>
      </LinearGradient>
    </View>
  );
};
