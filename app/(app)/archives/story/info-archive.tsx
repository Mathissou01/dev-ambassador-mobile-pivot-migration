import React from "react";
import {Text, View} from "@/components/Themed";
import LottieView from "lottie-react-native";
import {TouchableOpacity} from "react-native";
import {ChevronRightIcon} from "@/components/IconComponent";
import styles from "@/styles/archives/InfoArchiveStyle";
import {router} from "expo-router";

export default function InfoArchiveScreen(): React.JSX.Element {
    const nextPage = (): void => {
        router.push("/(app)/archives/story/maker");
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoBackground}>
                <LottieView
                    source={require("@/assets/json/acces-robot/noPicture.json")}
                    style={styles.noPictureAnimation}
                    autoPlay
                    loop
                    height={350}
                    width={350}
                />
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.textContainer}>
                    <Text bold style={styles.headTitleText}>
                        C&apos;est l&apos;heure de la photo !
                    </Text>
                    <Text italic style={styles.subheadTitleText}>
                        Avant de commencer, veuillez noter :
                    </Text>
                    <Text medium style={styles.infoText}>
                        Prenez une photo de l&apos;événement, que ce soit de vous-même ou des autres
                        participants
                    </Text>
                    <Text medium style={styles.infoText}>
                        Vous ne pouvez capturer qu&apos;une seule photo par événement, alors choisissez bien !
                    </Text>
                    <Text medium style={styles.infoText}>
                        Les photos seront visibles par les autres utilisateurs de l&apos;application
                    </Text>
                    <Text style={[styles.infoText, styles.infoTextCenter]}>
                        Prêt à capturer des moments inoubliables ?
                    </Text>
                </View>
                <TouchableOpacity style={[styles.mainButton]} onPress={nextPage}>
                    <ChevronRightIcon size={25} color={"white"}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}
