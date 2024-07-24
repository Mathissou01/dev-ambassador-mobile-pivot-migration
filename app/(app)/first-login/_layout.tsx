import {Stack} from 'expo-router';
import React from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import useColorScheme from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="step-1"
                options={{
                    title: 'Home',
                }}
            />
            <Stack.Screen
                name="step-2"
                options={{
                    title: 'Home',
                }}
            />
            <Stack.Screen
                name="step-3"
                options={{
                    title: 'Home',
                }}
            />
            <Stack.Screen
                name="step-4"
                options={{
                    title: 'Home',
                }}
            />
            <Stack.Screen
                name="step-5"
                options={{
                    title: 'Home',
                }}
            />
        </Stack>
    );
}
