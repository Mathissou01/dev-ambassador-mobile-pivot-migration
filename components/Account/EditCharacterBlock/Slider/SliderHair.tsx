import React, { useContext } from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import { styles, CommonStyle } from "./SliderPartStyle";
import { ThemeContext } from "../../../../hooks/useColorScheme";
import { type resourceMappingHair } from "../CharacterPart/ressourceMappingHair";
import { CloseIcon } from "../../../IconComponent/index";

interface SliderHairProps {
  data: Array<{ name: keyof typeof resourceMappingHair; type: string }>;
  selectedItem: string;
  onSelect: (item: keyof typeof resourceMappingHair) => void;
}

export default function SliderHair({
  data,
  selectedItem,
  onSelect,
}: SliderHairProps) {
  const handleSelect = (item: keyof typeof resourceMappingHair) => {
    onSelect(item);
  };
  const themeColor = useContext(ThemeContext);

  // Définissez les chemins des images directement
  const resourceMapping: Record<string, { image: any }> = {
    hair0: {
      image: null, // Set image to null for hair0
    },
    hair1: {
      image: require("../../../../assets/models/OBJ/HAIR/PREVIEW/hair1-min.png"),
    },
    hair2: {
      image: require("../../../../assets/models/OBJ/HAIR/PREVIEW/hair2-min.png"),
    },
    hair3: {
      image: require("../../../../assets/models/OBJ/HAIR/PREVIEW/hair3-min.png"),
    },
    hair4: {
      image: require("../../../../assets/models/OBJ/HAIR/PREVIEW/hair4-min.png"),
    },
    hair5: {
      image: require("../../../../assets/models/OBJ/HAIR/PREVIEW/hair5-min.png"),
    },
    hair6: {
      image: require("../../../../assets/models/OBJ/HAIR/PREVIEW/hair6-min.png"),
    },
    hair7: {
      image: require("../../../../assets/models/OBJ/HAIR/PREVIEW/hair7-min.png"),
    },
    hair8: {
      image: require("../../../../assets/models/OBJ/HAIR/PREVIEW/hair8-min.png"),
    },
    hair9: {
      image: require("../../../../assets/models/OBJ/HAIR/PREVIEW/hair9-min.png"),
    },
    hair10: {
      image: require("../../../../assets/models/OBJ/HAIR/PREVIEW/hair10-min.png"),
    },
    hair11: {
      image: require("../../../../assets/models/OBJ/HAIR/PREVIEW/hair11-min.png"),
    },
    hair12: {
      image: require("../../../../assets/models/OBJ/HAIR/PREVIEW/hair12-min.png"),
    },
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        flexDirection: "row",
        position: "absolute",
        top: 10,
        paddingLeft: 10,
      }}
    >
      {data.map((x) => (
        <View key={`${x.name}-${x.type}`} style={styles.container}>
          <TouchableOpacity
            style={CommonStyle({ selectedItem: selectedItem === x.name })}
            onPress={() => {
              handleSelect(x.name);
            }}
          >
            {resourceMapping[x.name].image ? (
              <Image
                style={styles.tinyLogo}
                source={resourceMapping[x.name].image}
              />
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
