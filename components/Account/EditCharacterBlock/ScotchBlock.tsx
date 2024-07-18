import React, {useEffect, useState} from "react";
import {Image, View} from "react-native";
import {Text} from "@/components/Themed";
import {useAppSelector} from "@/hooks/store";
import {type RootState} from "@/redux";
import {type UserState} from "@/types";
import styles from "./ScotchBlockStyle";

const App = (): React.JSX.Element => {
    const [rotationAngle, setRotationAngle] = useState(0);
    const userInfos: UserState = useAppSelector((state: RootState) => state.userInfos);

    // Génère un angle de rotation aléatoire entre -5 et 5 degrés
    const generateRandomRotation = (): void => {
        const randomRotation = Math.floor(Math.random() * 11) - 25;
        setRotationAngle(randomRotation);
    };

    useEffect(() => {
        generateRandomRotation();
    }, []);
    const scotchImage = require("../../../assets/images/scotch/scotch1.png");

    return (
        <View style={styles.container}>
            <View style={[styles.centeredContent, {transform: [{rotate: `${rotationAngle}deg`}]}]}>
                <View style={[styles.svgContainer, {transform: [{rotate: `${-rotationAngle}deg`}]}]}>
                    <View style={[styles.svg, {transform: [{rotate: `${rotationAngle}deg`}]}]}>
                        <Image
                            style={[
                                styles.svgimg,
                                {
                                    transform: [{rotate: `${-rotationAngle}deg`}],
                                    width: (userInfos.firstname?.length ?? 1) * 13 + 15,
                                },
                            ]}
                            source={scotchImage}
                        />
                    </View>
                </View>
                <Text style={[styles.text, {transform: [{rotate: `${-rotationAngle}deg`}]}]} bold>
                    {userInfos.firstname ?? "X"}
                </Text>
            </View>
        </View>
    );
};

export default App;
