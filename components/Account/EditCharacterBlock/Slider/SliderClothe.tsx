import React, { useContext } from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import { styles, CommonStyle } from "./SliderPartStyle.js";
import { ThemeContext } from "../../../../hooks/useColorScheme";
import { type resourceMappingClothe } from "../CharacterPart/ressourceMappingClothe";
import { CloseIcon } from "../../../IconComponent/index";

interface SliderClotheProps {
  data: Array<{ name: keyof typeof resourceMappingClothe; type: string }>;
  selectedItem7: string;
  onSelect7: (item: keyof typeof resourceMappingClothe) => void;
}

export default function SliderClothe({ data, selectedItem7, onSelect7 }: SliderClotheProps) {
  const handleSelect7 = (item: keyof typeof resourceMappingClothe) => {
    onSelect7(item);
  };
  const themeColor = useContext(ThemeContext);

  // Définissez les chemins des images directement
  const resourceMapping: Record<string, { image: any }> = {
    clothe0: {
      image: null,
    },
    clothe1: {
      image: require("@/assets/models/OBJ/CLOTHE/PREVIEW/clothe1-min.png"),
    },
    clothe2: {
      image: require("@/assets/models/OBJ/CLOTHE/PREVIEW/clothe2-min.png"),
    },
    clothe3: {
      image: require("@/assets/models/OBJ/CLOTHE/PREVIEW/clothe3-min.png"),
    },
    clothe4: {
      image: require("@/assets/models/OBJ/CLOTHE/PREVIEW/clothe4-min.png"),
    },
    clothe5: {
      image: require("@/assets/models/OBJ/CLOTHE/PREVIEW/clothe5-min.png"),
    },
    clothe6: {
      image: require("@/assets/models/OBJ/CLOTHE/PREVIEW/clothe6-min.png"),
    },
    clothe7: {
      image: require("@/assets/models/OBJ/CLOTHE/PREVIEW/clothe7-min.png"),
    },
    clothe8: {
      image: require("@/assets/models/OBJ/CLOTHE/PREVIEW/clothe8-min.png"),
    },
    clothe9: {
      image: require("@/assets/models/OBJ/CLOTHE/PREVIEW/clothe9-min.png"),
    },
    clothe10: {
      image: require("@/assets/models/OBJ/CLOTHE/PREVIEW/clothe10-min.png"),
    },
    clothe11: {
      image: require("@/assets/models/OBJ/CLOTHE/PREVIEW/clothe11-min.png"),
    },
    clothe12: {
      image: require("@/assets/models/OBJ/CLOTHE/PREVIEW/clothe12-min.png"),
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
            style={CommonStyle({ selectedItem: selectedItem7 === x.name })}
            onPress={() => {
              handleSelect7(x.name);
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
