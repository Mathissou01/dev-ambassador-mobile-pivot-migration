import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Linking, Modal, TouchableOpacity } from "react-native";
import { type CardInfo, type ModalWidgetData, type UserState } from "@/types";
import { colors } from "@/config/styles/01-settings/_colors";
import { hexToRgbA } from "@/utils/hexToRgbA";
import { Files as FilesRepo } from "@/hooks/API/Repositories/Files";
import { useAppSelector } from "@/hooks/store";
import { type File } from "@/hooks/API/ObjectTypes/File";
import { ThemeContext } from "@/hooks/useColorScheme";
import { type RootState } from "@/redux";
import { ScrollView, Text, View } from "@/components/Themed";
import { CloseIcon, FileIcon, FileImageIcon, LinkIcon, LocationPinIcon } from "@/components/IconComponent";
import styles from "./ModalInfoWidgetStyle";

const ModalInfoWidget = ({
  isVisible,
  onClose,
  cardInfo,
  maxPoints,
  actualPoints,
}: ModalWidgetData<CardInfo>): React.JSX.Element | null => {
  const themeColor = useContext(ThemeContext);
  const screenWidth = Dimensions.get("window").width;
  let modalContent = null;

  const [progressWidth, setProgressWidth] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const percentage = (actualPoints / maxPoints) * 100;

  const userInfos: UserState = useAppSelector((state: RootState) => state.userInfos);

  useEffect(() => {
    let intervalId: number;

    const progressUpdate = (): void => {
      if (isVisible && cardInfo != null && cardInfo.id === "1" && progressWidth < percentage) {
        intervalId = setInterval(() => {
          setProgressWidth((prevWidth) => prevWidth + 2);
        }, 10);
      } else {
        clearInterval(intervalId);
      }
    };

    progressUpdate();

    return () => {
      clearInterval(intervalId);
    };
  }, [isVisible, progressWidth, percentage, cardInfo]);

  // Fonction pour la redirection vers le site Intranet
  const redirectToIntranet = (): void => {
    void Linking.openURL("https://nextu.myintranet.online/login?ReturnUrl=%2F");
  };

  // Fonction pour la redirection vers l'application GPS Campus Lyon
  const redirectToCampusLyon = (): void => {
    const address = "4 Rue Paul Montrochet Bâtiment C, 69002 Lyon";
    void Linking.openURL(`https://maps.google.com/maps?q=${address}`);
  };

  // Fonction pour la redirection vers l'adresse Café Next-u
  const redirectToCafeNextU = (): void => {
    const address = "6 Pl. Camille Georges, 69002 Lyon";
    void Linking.openURL(`https://maps.google.com/maps?q=${address}`);
  };

  useEffect(() => {
    const fileRepo = new FilesRepo();
    void fileRepo.getWithParams("my-school").then((respFiles) => {
      setFiles(respFiles);
    });
  }, []);

  if (cardInfo == null) {
    return null;
  }

  const renderIconFile = (type?: string): React.JSX.Element => {
    if (type?.match(/pdf/i) != null) {
      return (
        <FileIcon
          size={100}
          color={
            themeColor?.isDark === true
              ? hexToRgbA(colors.black, 0.2)
              : hexToRgbA(colors.gray300, 0.2)
          }
        />
      );
    } else if (type?.match(/image/i) != null) {
      return (
        <FileImageIcon
          size={100}
          color={
            themeColor?.isDark === true
              ? hexToRgbA(colors.black, 0.2)
              : hexToRgbA(colors.gray300, 0.2)
          }
        />
      );
    } else {
      return (
        <FileIcon
          size={100}
          color={
            themeColor?.isDark === true
              ? hexToRgbA(colors.black, 0.2)
              : hexToRgbA(colors.gray300, 0.2)
          }
        />
      );
    }
  };

  const openPDF = (file: string): void => {
    Linking.openURL(file + "/" + userInfos.accessToken).catch(console.error);
  };

  if (cardInfo.id === "1") {
    modalContent = (
      <View
        style={{ flex: 1, justifyContent: "center" }}
        lightColor={colors.white}
        darkColor={colors.backgroundNavDark}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center" }}
          lightColor={"transparent"}
          darkColor={"transparent"}
        >
          <Text
            style={{
              justifyContent: "center",
              alignItems: "center",
              fontSize: 18,
              marginBottom: 10,
            }}
            lightColor={"#5A5A5A"}
            darkColor={"#919191"}
          >
            Prochainement
          </Text>
        </View>
      </View>
    );
  } else if (cardInfo.id === "2") {
    modalContent = (
      <View style={{ flex: 1 }} lightColor={colors.white} darkColor={colors.backgroundNavDark}>
        {files?.length === 0 && (
          <View
            style={{ flex: 1, marginTop: 50 }}
            lightColor={colors.white}
            darkColor={colors.backgroundNavDark}
          >
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 18,
                textDecorationLine: "underline",
              }}
            >
              Aucun fichier
            </Text>
          </View>
        )}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          scrollEnabled={true}
          lightColor={colors.white}
          darkColor={colors.backgroundNavDark}
        >
          {files?.map((item: File, index) => (
            <TouchableOpacity
              style={[styles.logoContainer]}
              onPress={() => {
                openPDF(item.url);
              }}
              key={item._id}
            >
              <View
                lightColor={colors.gray200}
                darkColor={hexToRgbA(colors.white, 0.14)}
                style={[
                  styles.card,
                  {
                    width: screenWidth / 2.5,
                    height: screenWidth / 2.5,
                    marginHorizontal: screenWidth * 0.02,
                  },
                ]}
                key={index}
              >
                <Text
                  style={[styles.cardText]}
                  lightColor={colors.black}
                  darkColor={colors.gray300}
                >
                  {item.name}
                </Text>
                <View style={styles.iconContainer}>{renderIconFile(item.type)}</View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  } else if (cardInfo.id === "3") {
    modalContent = (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        contentContainerStyle={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 15,
        }}
        lightColor={colors.white}
        darkColor={colors.backgroundNavDark}
      >
        <TouchableOpacity onPress={redirectToIntranet}>
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              alignItems: "center",
            }}
            lightColor={colors.white}
            darkColor={colors.backgroundNavDark}
          >
            <Text
              bold
              style={{
                textAlign: "center",
                fontSize: 18,
                textDecorationLine: "underline",
              }}
              lightColor={colors.blue2}
              darkColor={colors.blue4}
            >
              Intranet
            </Text>
            <LinkIcon size={20} color={themeColor?.isDark === true ? colors.blue4 : colors.blue2} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={redirectToCampusLyon}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
            lightColor={colors.white}
            darkColor={colors.backgroundNavDark}
          >
            <Text
              bold
              style={{
                textAlign: "center",
                fontSize: 18,
                textDecorationLine: "underline",
              }}
              lightColor={colors.blue2}
              darkColor={colors.blue4}
            >
              Campus Lyon
            </Text>
            <LocationPinIcon
              size={20}
              color={themeColor?.isDark === true ? colors.blue4 : colors.blue2}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={redirectToCafeNextU}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
            lightColor={colors.white}
            darkColor={colors.backgroundNavDark}
          >
            <Text
              bold
              style={{
                textAlign: "center",
                fontSize: 18,
                textDecorationLine: "underline",
              }}
              lightColor={colors.blue2}
              darkColor={colors.blue4}
            >
              Café Next-u
            </Text>
            <LocationPinIcon
              size={20}
              color={themeColor?.isDark === true ? colors.blue4 : colors.blue2}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <Modal animationType="none" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.modalContainer} lightColor={colors.white}>
        <View
          style={[styles.modalContent, { width: screenWidth * 0.75 }]}
          lightColor={colors.white}
          darkColor={colors.backgroundNavDark}
        >
          <View
            style={styles.header}
            lightColor={colors.white}
            darkColor={colors.backgroundNavDark}
          >
            <Text style={styles.title} lightColor={colors.black} darkColor={colors.gray300}>
              {cardInfo.text}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <CloseIcon
                size={15}
                color={themeColor?.isDark === true ? colors.gray300 : colors.black}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }} lightColor={colors.white} darkColor={colors.backgroundNavDark}>
            {modalContent}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalInfoWidget;
