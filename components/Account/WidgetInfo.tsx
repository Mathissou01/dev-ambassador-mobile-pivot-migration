import React, { useContext, useState } from "react";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { type CardInfo, type PointsData } from "@/types";
import ModalInfoWidget from "./ModalInfoWidget";
import Charts from "@/components/SvgIllustration/Charts";
import PdfFiles from "@/components/SvgIllustration/PdfFiles";
import Infos from "@/components/SvgIllustration/Info";
import { colors } from "@/config/styles/01-settings/_colors";
import { hexToRgbA } from "@/utils/hexToRgbA";
import { ThemeContext } from "@/hooks/useColorScheme";
import styles from "./WidgetInfoStyle";

const screenWidth = Dimensions.get("window").width;

const data = [
  { id: "1", text: "Statistiques", icon: Charts },
  { id: "2", text: "Guide\nAmbassador", icon: PdfFiles },
  { id: "3", text: "Informations\nUtiles", icon: Infos },
];

interface CardItem {
  id: string;
  text: string;
  icon: string;
}

const WidgetInfo = ({ maxPoints, actualPoints }: PointsData): React.JSX.Element => {
  const themeColor = useContext(ThemeContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardInfo | null>(null);

  const openModal = (card: CardInfo): void => {
    setSelectedCard(card);
    setModalVisible(true);
  };

  const renderItem = ({ item }: { item: CardItem }): React.JSX.Element => (
    <TouchableOpacity
      onPress={() => {
        openModal(item);
      }}
    >
      <View
        style={styles.card}
        lightColor={colors.gray300}
        darkColor={hexToRgbA(colors.white, 0.4)}
      >
        <Text bold style={styles.text} lightColor={colors.textLight} darkColor={colors.textDark}>
          {item.text}
        </Text>
        <View
          style={{
            backgroundColor: "transparent",
            position: "absolute",
            zIndex: -1,
            height: 150,
            width: 150,
            opacity: themeColor?.isDark === false ? 0.2 : 0.4,
            left: "50%",
            transform: [{ translateX: -75 }, { translateY: 22 }, { rotate: "8deg" }],
          }}
        >
          <item.icon color={themeColor?.isDark === false ? "#585858" : "#ffff"} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item: CardItem) => item.id}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: screenWidth * 0.025 }}
      />
      <ModalInfoWidget
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        cardInfo={selectedCard}
        maxPoints={maxPoints}
        actualPoints={actualPoints}
      />
    </View>
  );
};

export default WidgetInfo;
