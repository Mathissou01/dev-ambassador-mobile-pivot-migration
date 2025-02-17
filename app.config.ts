/* eslint-disable */
import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Dev-Ambassador-V2",
  description: "Sois un vrai Ambassador",
  slug: "next-u-form",
  owner: "mathissou",
  version: "0.0.2",
  orientation: "portrait",
  icon: "./assets/images/applestore-icon.png", // Default app icon
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
    image: "./assets/images/light_splash.png", // Splash screen image
    resizeMode: "contain",
    backgroundColor: "#FEF5EA",
    dark: {
      image: "./assets/images/dark_splash.png", // Dark mode splash screen image
      resizeMode: "contain",
      backgroundColor: "#0b1623",
    },
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: "ambassador.nextu.next-u-form",
    icon: "./assets/images/applestore-icon.png", // iOS app icon
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/light_splash.png", // iOS splash screen image
      resizeMode: "contain",
      backgroundColor: "#FEF5EA",
      dark: {
        image: "./assets/images/dark_splash.png", // iOS dark mode splash screen image
        resizeMode: "contain",
        backgroundColor: "#0b1623",
      },
    },
  },
  android: {
    icon: "./assets/images/playstore-icon.png", // Android app icon
    adaptiveIcon: {
      foregroundImage: "./assets/images/playstore-icon.png", // Android adaptive icon
      backgroundColor: "#ffffff",
    },
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    package: "ambassador.nextu.app",
    versionCode: 1,
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/light_splash.png", // Android splash screen image
      resizeMode: "contain",
      backgroundColor: "#FEF5EA",
      dark: {
        image: "./assets/images/dark_splash.png", // Android dark mode splash screen image
        resizeMode: "contain",
        backgroundColor: "#0b1623",
      },
    },
  },
  plugins: [
    [
      "expo-notifications",
      {
        icon: "./assets/images/App_Logo_Android.png", // Notification icon
        color: "#ffffff",
      },
    ],
    "expo-router",
    [
      "expo-camera",
      {
        cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
        microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone",
        recordAudioAndroid: true,
      },
    ],
  ],
  extra: {
    eas: {
      projectId: "ed54e3bf-bdf1-4417-a774-63420452c2b2",
    },
  },
  experiments: {
    typedRoutes: true,
  },
});
