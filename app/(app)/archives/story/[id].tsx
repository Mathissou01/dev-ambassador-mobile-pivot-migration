import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Redirect, useLocalSearchParams} from "expo-router";

export default function StoryById(): React.JSX.Element {
    const {id: storyId} = useLocalSearchParams<{ id: string }>();

    // If no id corresponding to the story go back
    if(storyId === undefined) {
        return <Redirect href={`/(app)/archives/index`} />
    }

    return (
        <View>
            <Text> STORY : {storyId} </Text>
        </View>
    )
}

const styles = StyleSheet.create({})
