import React from 'react'
import {Slot, Stack} from "expo-router";

export default function Layout(): React.JSX.Element {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="[id]"/>
            <Stack.Screen name="info-archive"/>
            <Stack.Screen name="maker"/>
        </Stack>
    )
}
