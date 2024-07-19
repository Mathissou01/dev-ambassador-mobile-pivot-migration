import {StyleSheet} from 'react-native'
import {useAppSelector} from "@/hooks/store";
import {selectUserInfos} from "@/redux/UserInfos/UserInfosSlice";
import {Redirect} from "expo-router";
import React, {ReactNode} from "react";

export default function Index(): ReactNode {
    const userInfos = useAppSelector(selectUserInfos);

    // Redirect to log-in page while not logged in
    if (userInfos.accessToken === null) {
        return <Redirect href="/(auth)/login"/>;
    }
    return <Redirect href="/(app)/(tabs)/home"/>;
}

const styles = StyleSheet.create({})
