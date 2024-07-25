/* eslint-disable */
import {ConfigContext, ExpoConfig} from "expo/config";

export default ({config}: ConfigContext): ExpoConfig => ({
    ...config,
    name: "Dev-Ambassador-V2",
    description: "Sois un vrai Ambassador",
    slug: "next-u-form",
    owner: "mathissou",
    version: "0.0.2",
    orientation: "portrait",
    icon: "./assets/images/App_Logo_Ios.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    updates: {
        url: "https://u.expo.dev/85228530-ee9c-4abb-bea8-6f7ed31f4a2d",
        fallbackToCacheTimeout: 0,
    },
    runtimeVersion: {
        policy: "appVersion",
    },
    splash: {
        image: "./assets/images/light_splash.png",
        resizeMode: "contain",
        backgroundColor: "#FFFFFF",
        dark: {
            image: "./assets/images/dark_splash.png",
            resizeMode: "contain",
            backgroundColor: "#000000",
        },
    },
    ios: {
        supportsTablet: false,
        bundleIdentifier: "ambassador.nextu.next-u-form",
        icon: "./assets/images/App_Logo_Ios.png",
        userInterfaceStyle: "automatic",
    },
    android: {
        icon: "./assets/images/App_Logo_Android.png",
        adaptiveIcon: {
            foregroundImage: "./assets/images/App_Logo_Android.png",
            backgroundColor: "#ffffff",
        },
        googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
        package: "ambassador.nextu.app",
        versionCode: 1,
        userInterfaceStyle: "automatic",
    },
    web: {
        favicon: "./assets/images/App_Logo_Ios.png",
        bundler: "metro",
    },
    plugins: [
        [
            "expo-notifications",
            {
                icon: "./assets/images/App_Logo_Android.png",
                color: "#ffffff",
            },
        ],
        "expo-router",
        // [
        //     "expo-calendar",
        //     {
        //         "calendarPermission": "The app needs to access your calendar."
        //     }
        // ]
        [
            "expo-camera",
            {
                "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera",
                "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone",
                "recordAudioAndroid": true
            }
        ]
    ],
    extra: {
        eas: {
            projectId: "ed54e3bf-bdf1-4417-a774-63420452c2b2",
        },
    },
    experiments: {
        "typedRoutes": true
    }
});
