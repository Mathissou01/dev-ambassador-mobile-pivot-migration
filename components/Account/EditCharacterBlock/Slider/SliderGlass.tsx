import React, { useContext } from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import { styles, CommonStyle } from "./SliderPartStyle.js";
import { ThemeContext } from "../../../../hooks/useColorScheme";
import { type resourceMappingGlass } from "../CharacterPart/ressourceMappingGlass";
import { CloseIcon } from "../../../IconComponent/index";

interface SliderGlassProps {
  data: Array<{ name: keyof typeof resourceMappingGlass; type: string }>;
  selectedItem5: string;
  onSelect5: (item: keyof typeof resourceMappingGlass) => void;
}

export default function SliderGlass({ data, selectedItem5, onSelect5 }: SliderGlassProps) {
  const handleSelect5 = (item: keyof typeof resourceMappingGlass) => {
    onSelect5(item);
  };
  const themeColor = useContext(ThemeContext);

  // Définissez les chemins des images directement
  const resourceMapping: Record<string, { image: any }> = {
    glass0: {
      image: null,
    },
    glass1: {
      image: require("@/assets/models/OBJ/GLASS/PREVIEW/glass1-min.png"),
    },
    glass2: {
      image: require("@/assets/models/OBJ/GLASS/PREVIEW/glass2-min.png"),
    },
    glass3: {
      image: require("@/assets/models/OBJ/GLASS/PREVIEW/glass3-min.png"),
    },
    glass4: {
      image: require("@/assets/models/OBJ/GLASS/PREVIEW/glass4-min.png"),
    },
    glass5: {
      image: require("@/assets/models/OBJ/GLASS/PREVIEW/glass5-min.png"),
    },
    glass6: {
      image: require("@/assets/models/OBJ/GLASS/PREVIEW/glass6-min.png"),
    },
    glass7: {
      image: require("@/assets/models/OBJ/GLASS/PREVIEW/glass7-min.png"),
    },
    glass8: {
      image: require("@/assets/models/OBJ/GLASS/PREVIEW/glass8-min.png"),
    },
    glass9: {
      image: require("@/assets/models/OBJ/GLASS/PREVIEW/glass9-min.png"),
    },
    glass10: {
      image: require("@/assets/models/OBJ/GLASS/PREVIEW/glass10-min.png"),
    },
    glass11: {
      image: require("@/assets/models/OBJ/GLASS/PREVIEW/glass11-min.png"),
    },
    glass12: {
      image: require("@/assets/models/OBJ/GLASS/PREVIEW/glass12-min.png"),
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
            style={CommonStyle({ selectedItem: selectedItem5 === x.name })}
            onPress={() => {
              handleSelect5(x.name);
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
