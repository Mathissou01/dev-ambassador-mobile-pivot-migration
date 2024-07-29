import React from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import { styles, CommonStyle } from "./SliderPartStyle.js";
import { type resourceMappingHead } from "../CharacterPart/ressourceMappingHead";

interface SliderHeadProps {
  data: Array<{ name: keyof typeof resourceMappingHead; type: string }>;
  selectedItem2: string;
  onSelect2: (item: keyof typeof resourceMappingHead) => void;
}

export default function SliderHead({ data, selectedItem2, onSelect2 }: SliderHeadProps) {
  const handleSelect2 = (item: keyof typeof resourceMappingHead) => {
    onSelect2(item);
  };

  // Définissez les chemins des images directement
  const resourceMapping: Record<string, { image: any }> = {
    head1: {
      image: require("../../../../assets/models/OBJ/HEAD/PREVIEW/head1-min.png"),
    },
    head2: {
      image: require("../../../../assets/models/OBJ/HEAD/PREVIEW/head2-min.png"),
    },
    head3: {
      image: require("../../../../assets/models/OBJ/HEAD/PREVIEW/head3-min.png"),
    },
    head4: {
      image: require("../../../../assets/models/OBJ/HEAD/PREVIEW/head4-min.png"),
    },
    head5: {
      image: require("../../../../assets/models/OBJ/HEAD/PREVIEW/head5-min.png"),
    },
    head6: {
      image: require("../../../../assets/models/OBJ/HEAD/PREVIEW/head6-min.png"),
    },
    head7: {
      image: require("../../../../assets/models/OBJ/HEAD/PREVIEW/head7-min.png"),
    },
    head8: {
      image: require("../../../../assets/models/OBJ/HEAD/PREVIEW/head8-min.png"),
    },
    head9: {
      image: require("../../../../assets/models/OBJ/HEAD/PREVIEW/head9-min.png"),
    },
    head10: {
      image: require("../../../../assets/models/OBJ/HEAD/PREVIEW/head10-min.png"),
    },
    head11: {
      image: require("../../../../assets/models/OBJ/HEAD/PREVIEW/head11-min.png"),
    },
    head12: {
      image: require("../../../../assets/models/OBJ/HEAD/PREVIEW/head12-min.png"),
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
            style={CommonStyle({ selectedItem: selectedItem2 === x.name })}
            onPress={() => {
              handleSelect2(x.name);
            }}
          >
            <Image style={styles.tinyLogo} source={resourceMapping[x.name].image } />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}
