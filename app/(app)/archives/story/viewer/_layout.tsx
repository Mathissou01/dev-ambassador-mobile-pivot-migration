import React from 'react'
import {Stack} from "expo-router";

export default function Layout(): React.JSX.Element {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="published"/>
            <Stack.Screen name="[path]"/>
        </Stack>
    )
}
