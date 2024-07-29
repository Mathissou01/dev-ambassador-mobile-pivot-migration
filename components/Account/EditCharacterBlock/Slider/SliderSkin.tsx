import React from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import { styles, CommonStyle } from "./SliderPartStyle.js";
import { type resourceMappingSkin } from "../CharacterPart/ressourceMappingSkin";

interface SliderSkinProps {
  data: Array<{ name: keyof typeof resourceMappingSkin; type: string }>;
  selectedItem12: string;
  // eslint-disable-next-line no-undef
  onSelect12: (item: keyof typeof resourceMappingSkin) => void;
}

export default function SliderSkin({ data, selectedItem12, onSelect12 }: SliderSkinProps) {
  const handleSelect12 = (item: keyof typeof resourceMappingSkin) => {
    onSelect12(item);
  };

  // Définissez les chemins des images directement
  const resourceMapping: Record<string, { image: any }> = {
    skin1: {
      image: require("../../../../assets/models/OBJ/SKIN/PREVIEW/skin1-min.png"),
    },
    skin2: {
      image: require("../../../../assets/models/OBJ/SKIN/PREVIEW/skin2-min.png"),
    },
    skin3: {
      image: require("../../../../assets/models/OBJ/SKIN/PREVIEW/skin3-min.png"),
    },
    skin4: {
      image: require("../../../../assets/models/OBJ/SKIN/PREVIEW/skin4-min.png"),
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
            style={CommonStyle({ selectedItem: selectedItem12 === x.name })}
            onPress={() => {
              handleSelect12(x.name);
            }}
          >
            <Image style={styles.tinyLogo} source={resourceMapping[x.name].image} />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}
