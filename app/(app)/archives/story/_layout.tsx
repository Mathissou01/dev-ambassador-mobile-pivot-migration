import React from 'react'
import {Slot, Stack} from "expo-router";

export default function Layout(): React.JSX.Element {
    return (
        <Stack>
            <Slot/>
        </Stack>
    )
}
