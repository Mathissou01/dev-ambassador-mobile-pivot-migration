import {Navigator, Stack} from "expo-router";
import Slot = Navigator.Slot;

export default function StacksLayout() {

    return (
        <Stack>
            <Slot/>
        </Stack>
    );
}
