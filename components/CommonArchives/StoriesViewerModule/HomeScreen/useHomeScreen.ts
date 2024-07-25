import {type ArchivePost} from "@/hooks/API/ObjectTypes/ArchivePost";
import {type User} from "@/hooks/API/ObjectTypes/User";
import {router} from "expo-router";
import {useAppDispatch, useAppSelector} from "@/hooks/store";
import {selectStories, setCurrentStoryIndex} from "@/redux/Archive/ArchiveSlice";

type GroupedStories = Record<
    number,
    {
        user: User;
        stories: ArchivePost[];
    }
>;

export const useHomeScreen = () => {
    const stories = useAppSelector(selectStories);
    const dispatch = useAppDispatch();

    const openStory = (userIndex: number) => {
        const userStories = users[userIndex].stories;
        const firstUserStoryIndex = stories.findIndex((story) => story._id === userStories[0]._id);
        // Set to store
        dispatch(setCurrentStoryIndex(firstUserStoryIndex));

        router.navigate("/(app)/archives/story/viewer/published");
    };

    const groupedStories = stories.reduce((acc: GroupedStories, story) => {
        if (story.user !== null) {
            if (!acc[story.user._id as unknown as number]) {
                acc[story.user._id as unknown as number] = {
                    user: story.user,
                    stories: [],
                };
            }
            acc[story.user._id as unknown as number].stories.push(story);
        }
        return acc;
    }, {} as GroupedStories);

    const users = Object.values(groupedStories);

    return {
        users,
        openStory,
        stories,
    };
};
