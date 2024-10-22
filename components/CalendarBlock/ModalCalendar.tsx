import React, {useEffect, useMemo, useState} from "react";
import {Alert, Appearance, Modal, ScrollView, TouchableOpacity,} from "react-native";
import {Audio} from "expo-av";
import {Text, View} from "@/components/Themed";
import {type Modaltype, type UserState} from "@/types";
import {useAppSelector} from "@/hooks/store";
import {type RootState} from "@/redux";
import {CheckCircleIcon, CloseIcon} from "@/components/IconComponent";
import {putAPI} from "@/hooks/API/requestsManager";
import {colors} from "@/config/styles/01-settings/_colors";
import BackgroundRobotModal from "@/components/SvgIllustration/BackgroundRobotModal";
import styles from "./CalendarStyle";
import {RegistrationStatus} from "@/types/enums/RegistrationStatus";
import LoadingDot from "@/components/CalendarBlock/LoadingDot";

const listStatus = [RegistrationStatus.PENDING, RegistrationStatus.VALID, RegistrationStatus.NOT_VALID];

const ModalCalendar = ({
                           open,
                           onClose,
                           data,
                           hourOptions,
                       }: Modaltype): React.JSX.Element => {
    const userInfos: UserState = useAppSelector(
        (state: RootState) => state.userInfos
    );

    // participationStatus
    // 0 : ASKED
    // 1 : VALIDATE
    // 2 : REFUSED
    // 3 : CANCELED BY USER
    const [participationStatus, setParticipationStatus] = useState<RegistrationStatus>(RegistrationStatus.NOT_VALID);

    const colorScheme = Appearance.getColorScheme();
    const isDark = colorScheme === "dark";

    useEffect(() => {
        const isSchoolRepresented = data?.represented_school?.includes(
            userInfos.school._id
        );

        const status: number = parseInt(
            data.participationStatus
                .filter((participant) => participant[0] === userInfos._id)
                .map((part) => part[1])?.[0]
        );

        const isEventFull =
            data?.actual_seat >= data?.max_seat &&
            !listStatus[isNaN(status) ? 3 : status];

        const statusStr =
            status === 1
                ? RegistrationStatus.VALID
                : data?.actual_seat === data?.max_seat ||
                !data?.represented_school?.includes(userInfos.school._id)
                    ? RegistrationStatus.NOT_VALID
                    : isNaN(status)
                        ? RegistrationStatus.PARTICIPATE
                        : listStatus[isNaN(status) ? 3 : status];

        setParticipationStatus(statusStr);

        if (!isSchoolRepresented) {
            setParticipationStatus(RegistrationStatus.SCHOOL_NOT_REPRESENTED);
        } else if (isEventFull) {
            setParticipationStatus(RegistrationStatus.EVENT_FULL);
        }
    }, [data, listStatus, userInfos._id, userInfos.school._id]);

    const handleParticipation = async (): Promise<void> => {
        if (participationStatus === RegistrationStatus.PARTICIPATE) {
            setParticipationStatus(RegistrationStatus.VALIDATE);
        } else if (participationStatus === RegistrationStatus.VALIDATE) {
            // SEND TO API PARTICIPATION
            const res = await putAPI({
                objectType: "events",
                idToModify: "participation/" + data.event_id + "/" + userInfos._id,
                dataToTransfert: {},
            });
            if (res) {
                void playSound(); // Play the sound
                setParticipationStatus(RegistrationStatus.PENDING);
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

    const buttonData = useMemo(() => {
        if (participationStatus === RegistrationStatus.SCHOOL_NOT_REPRESENTED) {
            return {
                buttonTextColor: "grey",
                buttonColor: "lightgrey",
                buttonText: "École non représentée",
                renderIcon: false,
            }
        } else if (participationStatus === RegistrationStatus.EVENT_FULL) {
            return {
                buttonTextColor: "white",
                buttonColor: "red",
                buttonText: "Événement plein",
                renderIcon: false,
            }
        } else if (participationStatus === RegistrationStatus.PARTICIPATE) {
            return {
                buttonTextColor: "white",
                buttonColor: "#4BBEFF",
                buttonText: "Je participe",
                renderIcon: true,
            }
        } else if (participationStatus === RegistrationStatus.VALIDATE) {
            return {

                buttonTextColor: "white",
                buttonColor: "green",
                buttonText: "Valider ?",
                renderIcon: false,
            }
        } else if (participationStatus === RegistrationStatus.PENDING) {
            return {

                buttonTextColor: "white",
                buttonColor: "#ff8f1f",
                buttonText: "En attente",
                renderIcon: false,
            }
        } else if (participationStatus === RegistrationStatus.NOT_VALID) {
            return {

                buttonTextColor: "grey",
                buttonColor: "lightgrey",
                buttonText: "Non disponible",
                renderIcon: false,
            }
        } else if (participationStatus === RegistrationStatus.VALID) {
            return {
                buttonTextColor: "white",
                buttonColor: "green",
                buttonText: "Déjà inscrit",
                renderIcon: false,
            }
        }

        return {
            buttonTextColor: "grey",
            buttonColor: "lightgrey",
            buttonText: "Non disponible",
            renderIcon: false,
        }
    }, [participationStatus]);

    // SOUND PLAYER
    const playSound = async (): Promise<void> => {
        try {
            const {sound} = await Audio.Sound.createAsync(
                require("../../assets/sounds/SUCESS.mp3")
            );
            await sound.playAsync(); // Play the sound
        } catch (error) {
            console.error("Error playing sound:", error);
        }
    };

    return (
        <Modal visible={open} onRequestClose={onClose} transparent>
            <View style={[styles.modalContainer]}>
                <View
                    lightColor={colors.white}
                    darkColor={colors.gray800}
                    style={styles.modalContent}
                >
                    <BackgroundRobotModal/>
                    <View style={styles.header}>
                        <Text style={styles.title} bold>
                            {data.title}
                        </Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={onClose}
                            hitSlop={{left: 25, right: 25, top: 25, bottom: 25}}
                        >
                            <CloseIcon
                                size={15}
                                color={isDark ? colors.textDark : colors.textLight}
                            />
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
                        De{" "}
                        {data.debut_hour
                            ?.toLocaleTimeString([], hourOptions)
                            .replace(":", "h")}{" "}
                        à{" "}
                        {data.end_hour
                            ?.toLocaleTimeString([], hourOptions)
                            .replace(":", "h")}{" "}
                        au {data.localisation}
                    </Text>
                    <View style={styles.trait_body}></View>
                    <Text style={styles.bodyText}>
                        Rendez-vous :{" "}
                        {data.rdv_hour
                            ?.toLocaleTimeString([], hourOptions)
                            .replace(":", "h")}{" "}
                        au {data.rdv_localisation}
                    </Text>
                    <View style={styles.trait_body}></View>
                    <Text>
                        Places prises : {data.actual_seat} / {data.max_seat}
                    </Text>
                    <TouchableOpacity
                        disabled={
                            !(
                                participationStatus === RegistrationStatus.PARTICIPATE ||
                                participationStatus === RegistrationStatus.VALIDATE
                            )
                        }
                        style={[styles.buttonValidation, {backgroundColor: buttonData.buttonColor}]}
                        onPress={handleParticipation}
                    >
                        <Text style={[styles.buttonText, {color: buttonData.buttonTextColor}]}>
                            {buttonData.buttonText}
                            {participationStatus === RegistrationStatus.PENDING && <LoadingDot/>}
                        </Text>
                        {(buttonData.renderIcon ?? false) && (
                            <CheckCircleIcon size={20} color="white"/>
                        )}
                    </TouchableOpacity>
                </View>
                {/* </ScrollView> */}
            </View>
        </Modal>
    );
};

export default ModalCalendar;
