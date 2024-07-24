import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { type ArchivePost } from "@/hooks/API/ObjectTypes/ArchivePost";
import { type User } from "@/hooks/API/ObjectTypes/User";

type GroupedStories = Record<
  number,
  {
    user: User;
    stories: ArchivePost[];
  }
>;

export const useHomeScreen = () => {
  const navigation = useNavigation();

  const [stories, setStories] = useState<ArchivePost[]>([]);

  const openStory = (userIndex: number) => {
    const userStories = users[userIndex].stories;
    const firstUserStoryIndex = stories.findIndex((story) => story._id === userStories[0]._id);
    navigation.navigate("StoryViewerScreen", {
      stories,
      currentStoryIndex: firstUserStoryIndex,
    });
  };

  const groupedStories = stories.reduce((acc: GroupedStories, story) => {
    if (!acc[story.user._id]) {
      acc[story.user._id] = {
        user: story.user,
        stories: [],
      };
    }
    acc[story.user._id].stories.push(story);
    return acc;
  }, {} as GroupedStories);

  const users = Object.values(groupedStories);

  return {
    users,
    openStory,
    stories,
    setStories,
  };
};
