import React, {ReactNode, useEffect} from "react";
import LottieView from "lottie-react-native";
import {Text, View} from "@/components/Themed";
import {useAppDispatch} from "@/hooks/store";
import {colors} from "@/config/styles/01-settings/_colors";
import styles from "@/styles/auth/LogOutStyle";
import {logoutUser} from "@/redux/UserInfos/UserInfosSlice";
import {router} from "expo-router";

export default function LogOutScreen(): ReactNode {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            // This code will execute after 5 seconds
            goToLogin();
        }, 5000);

        return () => {
            // Clear the timer if the component unmounts before 5 seconds
            clearTimeout(timer);
        };
    }, []);

    const goToLogin = (): void => {
        dispatch(logoutUser());
        router.replace("/(auth)/login");
    };

    return (
        <View
            style={styles.container}
            lightColor={colors.backgroundDefault}
            darkColor={colors.backgroundDark}
        >
            <View style={styles.container_text}>
                <Text bold style={[styles.title, styles.textColor]}>
                    &#192; bientôt !
                </Text>
                <View style={styles.separator}/>
                <Text darkColor={colors.gray300} lightColor={colors.black}>
                    Tu es déconnecté !
                </Text>
            </View>
            <View style={styles.container_image}>
                <LottieView
                    style={{
                        height: 250,
                        width: 250,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    source={require("@/assets/json/acces-robot/bye.json")}
                    loop
                    autoPlay
                />
                <View
                    style={[styles.ellispe]}
                    lightColor={"rgba(0,0,0,0.5)"}
                    darkColor={"rgba(255,255,255,0.5)"}
                ></View>
            </View>
        </View>
    );
}
