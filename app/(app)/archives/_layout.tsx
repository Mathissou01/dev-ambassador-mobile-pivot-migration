import React from 'react'
import {Slot, Stack} from "expo-router";
import {Archive} from "@/hooks/API/ObjectTypes/Archive";

export default function Layout(): React.JSX.Element {
    return (
        <Stack>
            <Stack.Screen name="[id]" />
            <Stack.Screen name="index" />
        </Stack>
    )
}
