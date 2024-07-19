import {Redirect, Tabs} from 'expo-router';
import React from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import {useAppSelector} from "@/hooks/store";
import {selectUserInfos} from "@/redux/UserInfos/UserInfosSlice";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const userInfos = useAppSelector(selectUserInfos);

    // Redirect to log-in page while not logged in
    if (userInfos.accessToken === null) {
        return <Redirect href="/(auth)/login"/>;
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                // headerShown: false,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="listForm"
                options={{
                    title: 'listForm',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}/>
                    ),
                }}
            />
            {/*<Tabs.Screen*/}
            {/*    name="Archive"*/}
            {/*    options={{*/}
            {/*        title: 'Archive',*/}
            {/*        tabBarIcon: ({color, focused}) => (*/}
            {/*            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}/>*/}
            {/*        ),*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<Tabs.Screen*/}
            {/*    name="Calendar"*/}
            {/*    options={{*/}
            {/*        title: 'Calendar',*/}
            {/*        tabBarIcon: ({color, focused}) => (*/}
            {/*            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}/>*/}
            {/*        ),*/}
            {/*    }}*/}
            {/*/>*/}
            <Tabs.Screen
                name="account"
                options={{
                    title: 'Compte',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={"body"} color={color}/>
                    ),
                }}
            />
        </Tabs>
    );
}
