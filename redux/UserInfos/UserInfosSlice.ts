import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "@/redux";

import {SchoolState, UserState, UserStatistics} from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Define the initial state using that type

// Define the initial state using that type
const initialState: UserState = {
    _id: null,
    email: "",
    firstname: null,
    lastname: null,
    tel: null,
    school: {} as SchoolState,
    roles: [],
    stats: {} as UserStatistics,
    genre: null,
    schoolYear: null,
    tShirtSize: null,
    computerPorts: null,
    isValid: false,
    avatar: {},
    hasAvatarChanged: false,
    gender: 1,
    music: null,
    accessToken: null,
    refreshToken: null,
    permanentToken: null,
};

export const userInfosSlice = createSlice({
    name: "userInfos",
    initialState,
    reducers: {
        updateUserInfos: (state, action: PayloadAction<Partial<UserState>>) => {
            return {...state, ...action.payload};
        },
        updateUserWithLocalStorage: (state, action: PayloadAction<Partial<UserState>>) => {
            void storeData({...state, ...action.payload});
            state = {...state, ...action.payload};
            return {...state, ...action.payload};
        },
        updateToken: (state, action: PayloadAction<string>) => {
            state = {...state, accessToken: action.payload};
            return {...state, accessToken: action.payload};
        },
        logoutUser: (state) => {
            void unLogUser();
            return {...state, ...initialState};
        },
        setAvatarImageChanged: (state) => {
            return {...state, hasAvatarChanged: !state.hasAvatarChanged};
        },
    },
});

const storeData = async (value: any): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("userinfos", jsonValue);
    } catch (e) {
        // saving error
    }
};

const unLogUser = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem("userinfos");
        await AsyncStorage.removeItem("permanentToken");
    } catch (e) {
    }
};

export const {
    updateUserInfos,
    updateToken,
    updateUserWithLocalStorage,
    logoutUser,
    setAvatarImageChanged,
} = userInfosSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserInfos = (state: RootState): UserState => state.userInfos;
export const selectAccessToken = (state: RootState): string | null => state.userInfos.accessToken;

export default userInfosSlice.reducer;
