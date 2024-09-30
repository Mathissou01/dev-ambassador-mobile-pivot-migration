import {Stack} from "expo-router";
import React from "react";

export default function StacksLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="login"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="logout"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="forgot-password"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="onboard"
                options={{
                    headerShown: false
                }}
            />
        </Stack>
    );
}
