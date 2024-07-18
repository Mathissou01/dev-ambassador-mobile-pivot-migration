import React, { useContext } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { CommonStyle, styles } from "./SliderPartStyle.js";
import { type resourceMappingEarings } from "../CharacterPart/ressourceMappingEarings";
import { ThemeContext } from "../../../../hooks/useColorScheme";
import { CloseIcon } from "../../../IconComponent/index";

interface SliderEaringsProps {
  data: Array<{ name: keyof typeof resourceMappingEarings; type: string }>;
  selectedItem4: string;
  onSelect4: (item: keyof typeof resourceMappingEarings) => void;
}

export default function SliderEarings({ data, selectedItem4, onSelect4 }: SliderEaringsProps) {
  const handleSelect4 = (item: keyof typeof resourceMappingEarings) => {
    onSelect4(item);
  };
  const themeColor = useContext(ThemeContext);

  // Définissez les chemins des images directement
  const resourceMapping: Record<string, { image: any }> = {
    earings0: {
      image: null,
    },
    earings1: {
      image: require("@/assets/models/OBJ/EARINGS/PREVIEW/earings1-min.png"),
    },
    earings2: {
      image: require("@/assets/models/OBJ/EARINGS/PREVIEW/earings2-min.png"),
    },
    earings3: {
      image: require("@/assets/models/OBJ/EARINGS/PREVIEW/earings3-min.png"),
    },
    earings4: {
      image: require("@/assets/models/OBJ/EARINGS/PREVIEW/earings4-min.png"),
    },
    earings5: {
      image: require("@/assets/models/OBJ/EARINGS/PREVIEW/earings5-min.png"),
    },
    earings6: {
      image: require("@/assets/models/OBJ/EARINGS/PREVIEW/earings6-min.png"),
    },
    earings7: {
      image: require("@/assets/models/OBJ/EARINGS/PREVIEW/earings7-min.png"),
    },
    earings8: {
      image: require("@/assets/models/OBJ/EARINGS/PREVIEW/earings8-min.png"),
    },
    earings9: {
      image: require("@/assets/models/OBJ/EARINGS/PREVIEW/earings9-min.png"),
    },
    earings10: {
      image: require("@/assets/models/OBJ/EARINGS/PREVIEW/earings10-min.png"),
    },
    earings11: {
      image: require("@/assets/models/OBJ/EARINGS/PREVIEW/earings11-min.png"),
    },
    earings12: {
      image: require("@/assets/models/OBJ/EARINGS/PREVIEW/earings12-min.png"),
    },
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        top: 10,
        paddingLeft: 10,
      }}
    >
      {data.map((x) => (
        <View key={`${x.name}-${x.type}`} style={styles.container}>
          <TouchableOpacity
            style={CommonStyle({ selectedItem: selectedItem4 === x.name })}
            onPress={() => {
              handleSelect4(x.name);
            }}
          >
            {resourceMapping[x.name].image ? (
              <Image style={styles.tinyLogo} source={resourceMapping[x.name].image} />
            ) : (
              <View style={{ padding: 20 }}>
                <CloseIcon size={60} color={themeColor?.colors.primaryDark} />
              </View>
            )}
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}
