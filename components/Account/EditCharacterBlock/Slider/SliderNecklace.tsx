import React, { useContext } from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import { styles, CommonStyle } from "./SliderPartStyle.js";
import { ThemeContext } from "../../../../hooks/useColorScheme";
import { type resourceMappingNecklace } from "../CharacterPart/ressourceMappingNecklace";
import { CloseIcon } from "../../../IconComponent/index";

interface SliderNecklaceProps {
  data: Array<{ name: keyof typeof resourceMappingNecklace; type: string }>;
  selectedItem6: string;
  onSelect6: (item: keyof typeof resourceMappingNecklace) => void;
}

export default function SliderNecklace({ data, selectedItem6, onSelect6 }: SliderNecklaceProps) {
  const handleSelect6 = (item: keyof typeof resourceMappingNecklace) => {
    onSelect6(item);
  };
  const themeColor = useContext(ThemeContext);

  // Définissez les chemins des images directement
  const resourceMapping: Record<string, { image: any }> = {
    necklace0: {
      image: null,
    },
    necklace1: {
      image: require("@/assets/models/OBJ/NECKLACE/PREVIEW/necklace1-min.png"),
    },
    necklace2: {
      image: require("@/assets/models/OBJ/NECKLACE/PREVIEW/necklace2-min.png"),
    },
    necklace3: {
      image: require("@/assets/models/OBJ/NECKLACE/PREVIEW/necklace3-min.png"),
    },
    necklace4: {
      image: require("@/assets/models/OBJ/NECKLACE/PREVIEW/necklace4-min.png"),
    },
    necklace5: {
      image: require("@/assets/models/OBJ/NECKLACE/PREVIEW/necklace5-min.png"),
    },
    necklace6: {
      image: require("@/assets/models/OBJ/NECKLACE/PREVIEW/necklace6-min.png"),
    },
    necklace7: {
      image: require("@/assets/models/OBJ/NECKLACE/PREVIEW/necklace7-min.png"),
    },
    necklace8: {
      image: require("@/assets/models/OBJ/NECKLACE/PREVIEW/necklace8-min.png"),
    },
    necklace9: {
      image: require("@/assets/models/OBJ/NECKLACE/PREVIEW/necklace9-min.png"),
    },
    necklace10: {
      image: require("@/assets/models/OBJ/NECKLACE/PREVIEW/necklace10-min.png"),
    },
    necklace11: {
      image: require("@/assets/models/OBJ/NECKLACE/PREVIEW/necklace11-min.png"),
    },
    necklace12: {
      image: require("@/assets/models/OBJ/NECKLACE/PREVIEW/necklace12-min.png"),
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
            style={CommonStyle({ selectedItem: selectedItem6 === x.name })}
            onPress={() => {
              handleSelect6(x.name);
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
