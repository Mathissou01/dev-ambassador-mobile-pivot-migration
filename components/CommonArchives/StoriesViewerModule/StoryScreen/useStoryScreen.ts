import { RouteProp } from "@react-navigation/native";
import { type RootStackParamList } from "../../../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { ArchivePost } from "@hooks/API/ObjectTypes/ArchivePost";

interface StoryScreenHookProps {
  route: RouteProp<RootStackParamList, "Story">;
  navigation: StackNavigationProp<RootStackParamList, "Story">;
}

export const useStoryScreen = ({ route, navigation }: StoryScreenHookProps) => {
  const { stories, currentStoryIndex } = route.params;
  const [currentIndex, setCurrentIndex] = useState(currentStoryIndex);
  const [liked, setLiked] = useState(false);

  const [userStories, setUserStories] = useState<ArchivePost[]>([]);
  const [progresses, setProgresses] = useState<number[] | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgresses((prevProgresses) => {
        //@ts-ignore
        const updatedProgresses = [...prevProgresses];
        updatedProgresses[currentIndex] = 0;
        updatedProgresses[currentIndex - 1] = 0;
        return updatedProgresses;
      });
    } else {
      navigation.navigate("Archives");
    }
  };

  const goForward = (isAutomatic = false) => {
    if (currentIndex < stories.length - 1) {
      setProgresses((prevProgresses) => {
        let updatedProgresses = [...prevProgresses];
        updatedProgresses[currentIndex] = 1;
        return updatedProgresses;
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      if (!isAutomatic) {
        navigation.navigate("Archives");
      }
    }
  };

  useEffect(() => {
    const currentStory = stories[currentIndex];
    const currentUser = currentStory?.user?._id;
    const userStories = stories.filter((story) => story?.user?._id === currentUser);
    const userStoryIndex = userStories.findIndex((story) => story?._id === currentStory._id);
    setUserStories(userStories);
    setProgresses(
      userStories.map((_: ArchivePost, index: number) =>
        userStoryIndex !== null ? (index < userStoryIndex ? 1 : 0) : 0
      )
    );

    const timer = setInterval(() => {
      setProgresses((prevProgresses) => {
        const updatedProgresses = [...prevProgresses];
        const newProgress = updatedProgresses[userStoryIndex] + 0.01;

        if (!isNaN(newProgress)) {
          updatedProgresses[userStoryIndex] = newProgress;

          if (updatedProgresses[userStoryIndex] >= 1) {
            clearInterval(timer);
            goForward(true);
          }

          return updatedProgresses;
        }
      });
    }, 50);

    if (!imageLoaded) clearInterval(timer);

    return () => {
      clearInterval(timer);
    };
  }, [currentIndex, stories, imageLoaded]);

  return {
    userStories,
    progresses,
    stories,
    currentIndex,
    goBack,
    goForward: () => {
      goForward(false);
    },
    setLiked,
    liked,
    setLoaded: setImageLoaded,
  };
};
