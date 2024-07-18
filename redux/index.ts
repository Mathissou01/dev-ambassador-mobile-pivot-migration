import { configureStore } from "@reduxjs/toolkit";
// ...
import UserInfosSlice from "./UserInfos/UserInfosSlice";
import PushTokenSlice from "./PushToken/PushTokenSlice";
import { ambassadorApi } from "./API/ambassadorApi";

export const store = configureStore({
  reducer: {
    userInfos: UserInfosSlice,
    pushToken: PushTokenSlice,
    api: ambassadorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(ambassadorApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
