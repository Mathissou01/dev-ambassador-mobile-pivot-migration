import React, {useContext} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {BlurView} from "expo-blur";
import {ThemeContext} from "@/hooks/useColorScheme";
import {PauseIcon, PlayIcon} from "../IconComponent";
import Vinyle from "./Vinyle";
import WaveForm from "./WaveForm";
import {colors} from "@/config/styles/01-settings/_colors";
import styles from "./MusicCardStyle";
import {useAppSelector} from "@/hooks/store";
import {User, UserType} from "@/hooks/API/ObjectTypes/User";
import {selectUserInfos} from "@/redux/UserInfos/UserInfosSlice";

export default function MusicCard({
                                      title,
                                      tag,
                                      onPress,
                                      isToggleAnimating,
                                      isPlaying,
                                  }: {
    title: string;
    tag: string;
    onPress: () => void;
    isToggleAnimating: boolean;
    isPlaying: boolean;
}): React.JSX.Element {
    const colorTheme = useContext(ThemeContext);
    const accessToken = useAppSelector((state) => state.userInfos.accessToken);
    const avatarImage = new User(
        useAppSelector(selectUserInfos) as unknown as UserType
    ).avatarUri;

    return (
        <TouchableOpacity style={styles.container} onPress={onPress} disabled={isToggleAnimating}>
            <BlurView
                style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 15,
                    backgroundColor: "rgba(239, 239, 240, 0.4)",
                }}
                intensity={80}
                tint={colorTheme?.isDark ?? false ? "dark" : "light"}
            >
                <View style={styles.containerLeft}>
                    <View style={styles.vynileContainer}>
                        <Vinyle dimension={50} centerImage={{
                            uri: avatarImage!,
                            headers: {
                                Authorization: `Ambassador ${accessToken}`,
                            },
                        }}/>
                    </View>
                    <View>
                        <Text style={styles.musicTitle}>{title}</Text>
                        <Text style={styles.musicInfo}>{tag}</Text>
                    </View>
                </View>
                <View style={styles.infoPlaying}>
                    {isPlaying && <WaveForm/>}
                    <View style={styles.playBtn}>
                        {isPlaying ? (
                            <PauseIcon
                                size={15}
                                color={colorTheme?.isDark === true ? colors.gray300 : colors.black}
                            />
                        ) : (
                            <PlayIcon
                                size={15}
                                color={colorTheme?.isDark === true ? colors.gray300 : colors.black}
                            />
                        )}
                    </View>
                </View>
            </BlurView>
        </TouchableOpacity>
    );
}
