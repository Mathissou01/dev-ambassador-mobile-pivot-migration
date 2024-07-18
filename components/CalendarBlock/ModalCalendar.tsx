import React, { useEffect, useState } from "react";
import { Alert, Modal, ScrollView, TouchableOpacity, Appearance } from "react-native";
import { Audio } from "expo-av";
import { Text, View } from "@/components/Themed";
import { type Modaltype, type UserState } from "@/types";
import { useAppSelector } from "@/hooks/store";
import { type RootState } from "@/redux";
import { CloseIcon, CheckCircleIcon } from "@/components/IconComponent";
import { putAPI } from "@/hooks/API/requestsManager";
import { colors } from "@/config/styles/01-settings/_colors";
import LoadingDot from "./LoadingDot";
import BackgroundRobotModal from "@/components/SvgIllustration/BackgroundRobotModal";
import styles from "./CalendarStyle";

const ModalCalendar = ({ open, onClose, data, hourOptions }: Modaltype): React.JSX.Element => {
  const userInfos: UserState = useAppSelector((state: RootState) => state.userInfos);

  // participationStatus
  // 0 : ASKED
  // 1 : VALIDATE
  // 2 : REFUSED
  // 3 : CANCELED BY USER
  const [participationStatus, setParticipationStatus] = useState("not_valid");
  const listStatus = ["pending", "valid", "not_valid", "not_valid"];

  const colorScheme = Appearance.getColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    const status: number = parseInt(
      data.participationStatus
        .filter((participant) => participant[0] === userInfos._id)
        .map((part) => part[1])?.[0]
    );
    const statusStr =
      status === 1
        ? "valid"
        : data?.actual_seat === data?.max_seat ||
          !data?.represented_school?.includes(userInfos.school._id)
        ? "not_valid"
        : isNaN(status)
        ? "participate"
        : listStatus[isNaN(status) ? 3 : status];
    setParticipationStatus(statusStr);
  }, [data]);

  const handleParticipation = async (): Promise<void> => {
    if (participationStatus === "participate") {
      setParticipationStatus("validate");
    } else if (participationStatus === "validate") {
      void playSound(); // Play the sound
      // SEND TO API PARTICIPATION
      const res = await putAPI({
        objectType: "events",
        idToModify: "participation/" + data.event_id + "/" + userInfos._id,
        dataToTransfert: {},
      });
      if (res) {
        setParticipationStatus("pending");
      } else {
        Alert.alert(
          "Erreur d'enregistrement",
          "Il y a eu une erreur lors de l'enregistrement de ta demande de participation à l'évènement " +
            data.title +
            ". Réessaye plus tard ou contacte les développeurs pour signaler un problème dans la page de contact."
        );
      }
    }
  };

  let buttonTextColor, buttonColor, renderIcon, buttonText;

  if (participationStatus === "participate") {
    buttonTextColor = "white";
    buttonColor = "#4BBEFF";
    buttonText = "Je participe";
    renderIcon = true;
  } else if (participationStatus === "validate") {
    buttonTextColor = "white";
    buttonColor = "green";
    buttonText = "Valider ?";
    renderIcon = false;
  } else if (participationStatus === "pending") {
    buttonTextColor = "white";
    buttonColor = "#ff8f1f";
    buttonText = "En attente";
    renderIcon = false;
  } else if (participationStatus === "not_valid") {
    buttonTextColor = "grey";
    buttonColor = "lightgrey";
    buttonText = "Non disponible";
    renderIcon = false;
  } else if (participationStatus === "valid") {
    buttonTextColor = "white";
    buttonColor = "green";
    buttonText = "Déjà inscrit";
    renderIcon = false;
  }
  // SOUND PLAYER
  const playSound = async (): Promise<void> => {
    try {
      const { sound } = await Audio.Sound.createAsync(require("../../assets/sounds/SUCESS.mp3"));
      await sound.playAsync(); // Play the sound
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };
  return (
    <Modal visible={open} onRequestClose={onClose} transparent>
      <View style={[styles.modalContainer]}>
        <View lightColor={colors.white} darkColor={colors.gray800} style={styles.modalContent}>
          <BackgroundRobotModal />
          <View style={styles.header}>
            <Text style={styles.title} bold>
              {data.title}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              hitSlop={{ left: 25, right: 25, top: 25, bottom: 25 }}
            >
              <CloseIcon size={15} color={isDark ? colors.textDark : colors.textLight} />
            </TouchableOpacity>
          </View>
          <View
            lightColor={colors.black}
            darkColor={colors.gray500}
            style={styles.trait_header}
          ></View>
          {data.description.length > 0 && (
            <>
              <ScrollView alwaysBounceVertical={false}>
                <Text>{data.description}</Text>
              </ScrollView>
              <View style={styles.trait_body}></View>
            </>
          )}
          <Text>
            De {data.debut_hour?.toLocaleTimeString([], hourOptions).replace(":", "h")} à{" "}
            {data.end_hour?.toLocaleTimeString([], hourOptions).replace(":", "h")} au{" "}
            {data.localisation}
          </Text>
          <View style={styles.trait_body}></View>
          <Text style={styles.bodyText}>
            Rendez-vous : {data.rdv_hour?.toLocaleTimeString([], hourOptions).replace(":", "h")} au{" "}
            {data.rdv_localisation}
          </Text>
          <View style={styles.trait_body}></View>
          <Text>
            Places prises : {data.actual_seat} / {data.max_seat}
          </Text>
          <TouchableOpacity
            disabled={participationStatus === "valid"}
            style={[styles.buttonValidation, { backgroundColor: buttonColor }]}
            onPress={handleParticipation}
          >
            <Text style={[styles.buttonText, { color: buttonTextColor }]}>
              {buttonText}
              {participationStatus === "pending" && <LoadingDot />}
            </Text>
            {(renderIcon ?? false) && <CheckCircleIcon size={20} color="white" />}
          </TouchableOpacity>
        </View>
        {/* </ScrollView> */}
      </View>
    </Modal>
  );
};

export default ModalCalendar;
