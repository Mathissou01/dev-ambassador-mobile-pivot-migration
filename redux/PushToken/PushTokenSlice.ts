import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";

import {pushToken} from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the initial state using that type
const initialState: pushToken = {
    token: null
};

export const pushTokenSlice = createSlice({
    name: "pushToken",
    initialState,
    reducers: {
        updatePushToken: (state, action: PayloadAction<{ data: string, type: string }>) => {
            const newState = {...state, token: action.payload.data, platform: action.payload.type};
            void storePushToken(newState);
            return newState;
        }
    }
});

const storePushToken = async (value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("pushToken", jsonValue);
    } catch (e) {
        // saving error
    }
};

export const {updatePushToken} = pushTokenSlice.actions;

export default pushTokenSlice.reducer;
