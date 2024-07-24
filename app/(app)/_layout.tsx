import {Redirect, Stack} from 'expo-router';
import {useAppSelector} from "@/hooks/store";
import {selectUserInfos} from "@/redux/UserInfos/UserInfosSlice";
import React from "react";

export default function AppLayout() {
    const userInfos = useAppSelector(selectUserInfos);

    // Redirect to log-in page while not logged in
    if (userInfos.accessToken === null) {
        return <Redirect href="/(auth)/login"/>;
    }

    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="(tabs)"/>
            <Stack.Screen name="(screens)"/>
            <Stack.Screen name="first-login"/>
            <Stack.Screen name="forms"/>
            <Stack.Screen name="profil-settings"/>
        </Stack>
    )
}
