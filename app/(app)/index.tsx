import React from 'react'
import {Redirect} from "expo-router";

export default function Index(): React.JSX.Element {
    return <Redirect href="/(app)/(tabs)/home"/>;
}
