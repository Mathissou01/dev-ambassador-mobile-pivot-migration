import React from 'react'
import {useColorScheme, View} from 'react-native'
import TabBarItem from "@/components/TabBar/TabBarItem";
import {colors} from '@/config/styles/01-settings/_colors';

export default function TabBar({state, descriptors, navigation}): React.JSX.Element {
    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: "transparent",
            bottom: 0,
            height: 100
        }}>
            {state.routes.map((route, index) => (
                    <TabBarItem
                        key={index + "_" + route.name}
                        index={index}
                        route={route}
                        selectedIndex={state.index}
                        descriptors={descriptors}
                        navigation={navigation}/>
                )
            )}
        </View>
    )
}
