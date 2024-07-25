import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "@/redux";
import type {ArchivePost} from "@/hooks/API/ObjectTypes/ArchivePost";

interface ArchiveState {
    stories: ArchivePost[],
    currentStoryIndex: number
}

// Define the initial state using that type
const initialState: ArchiveState = {
    stories: [],
    currentStoryIndex: 0
};

export const archiveSlice = createSlice({
    name: "archive",
    initialState,
    reducers: {
        setStories: (state, action: PayloadAction<ArchivePost[]>) => {
            state.stories = action.payload;
        },
        setCurrentStoryIndex: (state, action: PayloadAction<number>) => {
            state.currentStoryIndex = action.payload;
        },
    },
});

export const {
    setCurrentStoryIndex,
    setStories,
} = archiveSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectStories = (state: RootState): ArchivePost[] => state.archive.stories;
export const selectCurrentStoryIndex = (state: RootState): number => state.archive.currentStoryIndex;
export const selectArchive = (state: RootState): ArchiveState => state.archive;

export default archiveSlice.reducer;
