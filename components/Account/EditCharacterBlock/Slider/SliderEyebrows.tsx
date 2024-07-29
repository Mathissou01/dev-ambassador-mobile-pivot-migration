import React from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import { styles, CommonStyle } from "./SliderPartStyle.js";
import { type resourceMappingEyebrows } from "../CharacterPart/ressourceMappingEyebrows";

interface SliderEyebrowsProps {
  data: Array<{ name: keyof typeof resourceMappingEyebrows; type: string }>;
  selectedItem3: string;
  onSelect3: (item: keyof typeof resourceMappingEyebrows) => void;
}

export default function SliderEyebrows({ data, selectedItem3, onSelect3 }: SliderEyebrowsProps) {
  const handleSelect3 = (item: keyof typeof resourceMappingEyebrows) => {
    onSelect3(item);
  };

  // Définissez les chemins des images directement
  const resourceMapping: Record<string, { image: any }> = {
    eyebrows1: {
      image: require("../../../../assets/models/OBJ/EYEBROWS/PREVIEW/eyebrows1-min.png"),
    },
    eyebrows2: {
      image: require("../../../../assets/models/OBJ/EYEBROWS/PREVIEW/eyebrows2-min.png"),
    },
    eyebrows3: {
      image: require("../../../../assets/models/OBJ/EYEBROWS/PREVIEW/eyebrows3-min.png"),
    },
    eyebrows4: {
      image: require("../../../../assets/models/OBJ/EYEBROWS/PREVIEW/eyebrows4-min.png"),
    },
    eyebrows5: {
      image: require("../../../../assets/models/OBJ/EYEBROWS/PREVIEW/eyebrows5-min.png"),
    },
    eyebrows6: {
      image: require("../../../../assets/models/OBJ/EYEBROWS/PREVIEW/eyebrows6-min.png"),
    },
    eyebrows7: {
      image: require("../../../../assets/models/OBJ/EYEBROWS/PREVIEW/eyebrows7-min.png"),
    },
    eyebrows8: {
      image: require("../../../../assets/models/OBJ/EYEBROWS/PREVIEW/eyebrows8-min.png"),
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
        <View key={`${x.name}-${x.type}`} style={[styles.container, styles.shadowProp]}>
          <TouchableOpacity
            style={CommonStyle({ selectedItem: selectedItem3 === x.name })}
            onPress={() => {
              handleSelect3(x.name);
            }}
          >
            <Image style={styles.tinyLogo} source={resourceMapping[x.name].image } />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}
