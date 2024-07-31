import React from "react";
import { View } from "react-native";
import TabBarItem from "@/components/TabBar/TabBarItem";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { colors } from "@/config/styles/01-settings/_colors";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps): React.JSX.Element {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: colors.white,
        zIndex: 5,
        bottom: -10,
        height: 100,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginTop: -100, // Margin negative de la même taille que la 'height' pour que la View de l'écran passe derrière la barre de navigation (sorte de absolute sans absolute)
      }}
    >
      {state.routes.map((route, index) => (
        <TabBarItem
          key={index + "_" + route.name}
          index={index}
          route={route}
          selectedIndex={state.index}
          descriptors={descriptors}
          navigation={navigation}
        />
      ))}
    </View>
  );
}
