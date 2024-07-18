import {Stack} from "expo-router";

export default function StacksLayout() {

    return (
        <Stack>
            <Stack.Screen
                name="login"
                options={{
                    headerShown: false
                }}
            />
        </Stack>
    );
}