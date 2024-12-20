import {useEffect, useState} from "react";
import {ArchivePost} from "@/hooks/API/ObjectTypes/ArchivePost";
import {router} from "expo-router";

interface StoryScreenHookProps {
    stories: ArchivePost[];
    currentStoryIndex: number;
}

export const useStoryScreen = ({stories, currentStoryIndex}: StoryScreenHookProps) => {
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
            router.navigate("/(app)/(tabs)/archive");
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
                router.navigate("/(app)/(tabs)/archive");
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
            setProgresses((prevProgresses: number[] | null) => {
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

                return updatedProgresses;
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
