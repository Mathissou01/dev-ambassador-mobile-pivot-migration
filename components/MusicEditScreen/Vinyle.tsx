import React, {ReactNode, useContext, useEffect, useState} from "react";
import {ImageSourcePropType, StyleSheet, View} from "react-native";
import Svg, {ClipPath, Defs, Image, LinearGradient, Path, RadialGradient, Stop, Use} from "react-native-svg";
import {ThemeContext} from "@/hooks/useColorScheme";

export default function Vinyle({
                                   centerImage,
                                   dimension,
                               }: {
    centerImage?: ImageSourcePropType;
    dimension: number;
}): ReactNode {
    const themeColor = useContext(ThemeContext);
    const [dataUrl, setDataUrl] = useState<string | null>(null);

    useEffect(() => {
        if (typeof centerImage === "object") {
            if ("uri" in centerImage && centerImage.uri && centerImage.headers && "Authorization" in centerImage.headers) {
                const token = centerImage.headers.Authorization;
                const url = centerImage.uri;

                const fetchAvatar = async () => {
                    try {
                        const response = await fetch(url, {
                            headers: {
                                Authorization: `${token}`, // Utilisation du token dans le header
                            }
                        });

                        if (!response.ok) {
                            throw new Error('Avatar not found');
                        }

                        const blob = await response.blob(); // Récupère l'image sous forme de Blob
                        const fileReaderInstance = new FileReader();
                        fileReaderInstance.readAsDataURL(blob);
                        fileReaderInstance.onload = () => {
                            if (typeof fileReaderInstance.result === "string")
                                setDataUrl(fileReaderInstance.result)
                        }
                    } catch (err) {
                        console.error("Error fetching avatar:", err);
                    }
                };

                void fetchAvatar();
            }
        }
    }, []);

    return (
        <View style={styles.container}>
            <Svg width={dimension} height={dimension} viewBox="0 0 400 400">
                <Defs>
                    <ClipPath id="clipPath">
                        <Path
                            d="M237.963 162.037c-20.953-20.952-54.973-20.952-75.926 0-20.952 20.953-20.952 54.973 0 75.926 20.953 20.952 54.973 20.952 75.926 0 20.952-20.953 20.952-54.973 0-75.926zm-34.295 34.295a5.186 5.186 0 010 7.336 5.186 5.186 0 01-7.336 0 5.186 5.186 0 010-7.336 5.186 5.186 0 017.336 0z"/>
                    </ClipPath>
                    <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <Stop offset="0%" stopColor={themeColor?.colors?.primaryLight || "#21a5ff"}/>
                        <Stop offset="100%" stopColor={themeColor?.colors?.secondaryDark || "#0072bf"}/>
                    </LinearGradient>
                    <LinearGradient id="c">
                        <Stop offset={0} stopColor="#6c6c6c"/>
                        <Stop offset={1} stopColor="#3e3e3e"/>
                    </LinearGradient>
                    <LinearGradient id="b">
                        <Stop offset={0} stopColor="#f7f7f7"/>
                        <Stop offset={1} stopColor="#e1e1e1"/>
                    </LinearGradient>
                    <LinearGradient id="a">
                        <Stop offset={0} stopColor="#fff"/>
                        <Stop offset={1} stopColor="#fff" stopOpacity={0}/>
                    </LinearGradient>
                    <RadialGradient
                        id="g"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="rotate(135 303.86 230.216) scale(1.22978 2.77397)"
                        cx={289.42923}
                        cy={209.66924}
                        fx={289.42923}
                        fy={209.66924}
                        r={92.5}
                    />
                    <RadialGradient
                        id="h"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="matrix(0 2.87286 -1 0 392.844 -372.507)"
                        cx={199.28125}
                        cy={192.84375}
                        fx={199.28125}
                        fy={192.84375}
                        r={53.6875}
                    />
                    <RadialGradient
                        id={"rad-grad"}
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="matrix(0 2.77821 -.82388 0 358.88 -353.646)"
                        cx={199.28125}
                        cy={192.84375}
                        fx={199.28125}
                        fy={192.84375}
                        r={68.84375}
                    />
                </Defs>

                <Path
                    id="d"
                    d="M200 15C97.88 15 15 97.88 15 200s82.88 185 185 185 185-82.88 185-185S302.12 15 200 15zm0 179.813a5.186 5.186 0 015.188 5.187 5.186 5.186 0 01-5.188 5.188 5.186 5.186 0 01-5.188-5.188 5.186 5.186 0 015.188-5.188z"
                />
                <Path
                    d="M200 132.656c-37.16 0-67.344 30.185-67.344 67.344 0 37.16 30.185 67.344 67.344 67.344 37.16 0 67.344-30.185 67.344-67.344 0-37.16-30.185-67.344-67.344-67.344zm0 62.906a4.433 4.433 0 014.438 4.438 4.433 4.433 0 01-4.438 4.438 4.433 4.433 0 01-4.438-4.438 4.433 4.433 0 014.438-4.438z"
                    fill="#333"
                />
                <Path
                    d="M200 16.781c101.156 0 183.219 82.063 183.219 183.219 0 101.156-82.063 183.219-183.219 183.219-101.156 0-183.219-82.063-183.219-183.219C16.781 98.844 98.844 16.781 200 16.781z"
                    fill="none"
                    stroke="#000"
                    strokeWidth={3.562}
                />
                <Use
                    height="100%"
                    width="100%"
                    transform="rotate(180 200 200)"
                    xlinkHref="#f"
                    y={0}
                    x={0}
                />
                <Path
                    id="f"
                    d="M106.438 200c0-51.651 41.91-93.594 93.562-93.594V18.562C99.851 18.563 18.562 99.853 18.562 200z"
                    fill="url(#g)"
                />
                <Path
                    d="M200 132.688c37.167 0 67.313 30.145 67.313 67.312S237.166 267.314 200 267.314 132.686 237.167 132.686 200c0-37.167 30.147-67.313 67.314-67.313z"
                    fill="none"
                    stroke="#000"
                    strokeWidth={3}
                />
                <Path
                    d="M237.963 162.037c-20.953-20.952-54.973-20.952-75.926 0-20.952 20.953-20.952 54.973 0 75.926 20.953 20.952 54.973 20.952 75.926 0 20.952-20.953 20.952-54.973 0-75.926zm-34.295 34.295a5.186 5.186 0 010 7.336 5.186 5.186 0 01-7.336 0 5.186 5.186 0 010-7.336 5.186 5.186 0 017.336 0z"
                    fill="url(#gradient)"
                />
                <Image
                    x="35%"
                    y="35%"
                    width="30%"
                    height="30%"
                    // href={centerImage}
                    href={dataUrl ?? ""}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#clipPath)"
                />
                <Path
                    d="M243.951 156.049a61.825 61.825 0 00-24.285-15.004l-1.237 3.712c8.315 2.765 16.125 7.463 22.738 14.076 8.056 8.056 13.256 17.884 15.6 28.24l3.823-.862a61.816 61.816 0 00-16.639-30.162zM142.614 190.255l-3.89-.663c-3.236 19.173 2.54 39.573 17.325 54.36 14.746 14.745 35.076 20.526 54.204 17.345l-.64-3.867c-17.926 2.984-36.963-2.446-50.78-16.263-13.852-13.852-19.253-32.947-16.22-50.912z"
                    opacity={0.7425743}
                    fill="#fff"
                />
                <Path
                    d="M-103.283 120.425c-10.452 23.771-29.559 42.877-53.335 53.329"
                    transform="translate(538.214 62.801) scale(1.7186)"
                    fill="none"
                    stroke="#fff"
                    opacity={0.65}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth=".3px"
                />
                <Path
                    d="M-103.283 120.425c-10.452 23.771-29.559 42.877-53.335 53.329"
                    transform="translate(-130 40) scale(1.7186) rotate(228)"
                    fill="none"
                    stroke="#fff"
                    opacity={0.65}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth=".3px"
                />
                <Path
                    d="M-30.458 220.359a49.737 49.737 0 01-19.152 20.142"
                    transform="translate(538.214 62.801) scale(1.7186) rotate(48 0 0)"
                    fill="none"
                    stroke="#fff"
                    opacity={0.65}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth=".3px"
                />
                <Path
                    d="M-30.458 220.359a49.737 49.737 0 01-19.152 20.142"
                    transform="translate(530 300) scale(1.7186) rotate(80)"
                    fill="none"
                    stroke="#fff"
                    opacity={0.65}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth=".3px"
                />
                <Path
                    d="M-30.458 220.359a49.737 49.737 0 01-19.152 20.142"
                    transform="translate(-20 480) scale(1.7186) rotate(195)"
                    fill="none"
                    stroke="#fff"
                    opacity={0.65}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth=".3px"
                />
                <Path
                    d="M-30.458 220.359a49.737 49.737 0 01-19.152 20.142"
                    transform="translate(-80 10) scale(1.7186) rotate(276)"
                    fill="none"
                    stroke="#fff"
                    opacity={0.65}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth=".3px"
                />
                <Path
                    d="M-130.145 100.686c-6.082 15.844-17.219 29.175-31.428 38.03"
                    transform="translate(538.214 62.801) scale(1.7186)"
                    fill="none"
                    stroke="#fff"
                    opacity={0.65}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth=".3px"
                />
                <Path
                    d="M-130.145 100.686c-6.082 15.844-17.219 29.175-31.428 38.03"
                    transform="translate(-20.214 500.801) scale(1.7186) rotate(144)"
                    fill="none"
                    stroke="#fff"
                    opacity={0.65}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth=".3px"
                />
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
});
