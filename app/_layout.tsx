import {useFonts} from "expo-font";
import {Navigator} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {useEffect, useState} from "react";
import "react-native-reanimated";

import SplashScreenComponent from "@/components/SplashScreenVideo/SplashScreen";
import {ThemeContext} from "@/hooks/useColorScheme";
import * as Notifications from "expo-notifications";
import EStyleSheet from "react-native-extended-stylesheet";
import {Appearance, Dimensions, StatusBar} from "react-native";
import useCachedResources from "@/hooks/useCachedResources";
import {registerForPushNotificationsAsync} from "@/utils/registerForPushNotificationsAsync";
import {store} from "@/redux";
import {updatePushToken} from "@/redux/PushToken/PushTokenSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {autoAuth} from "@/hooks/useDatabase";
import {generateColors} from "@/utils/generateColors";
import {Provider} from "react-redux";
import {SafeAreaProvider,} from "react-native-safe-area-context";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Slot = Navigator.Slot;

// ===== NOTIFICATION PARAMETERS ===== //
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
void SplashScreen.preventAutoHideAsync();

const {height, width} = Dimensions.get("window");

EStyleSheet.build({
    $contentWidth: width,
    $contentHeight: height,
});

export const unstable_settings = {
    initialRouteName: "(auth)/login",
};

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        //! Main
        SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
        "Raleway-Regular": require("@/assets/fonts/Raleway-Regular.ttf"),
        "Raleway-Medium": require("@/assets/fonts/Raleway-Medium.ttf"),
        "Raleway-SemiBold": require("@/assets/fonts/Raleway-SemiBold.ttf"),
        "Raleway-Bold": require("@/assets/fonts/Raleway-Bold.ttf"),
        "Raleway-ExtraBold": require("@/assets/fonts/Raleway-ExtraBold.ttf"),
        "Raleway-Light": require("@/assets/fonts/Raleway-Light.ttf"),
        "Raleway-ExtraLight": require("@/assets/fonts/Raleway-ExtraLight.ttf"),
        "Raleway-Thin": require("@/assets/fonts/Raleway-Thin.ttf"),
        //* Extra
        "Blackway-Brush": require("@/assets/fonts/Blackway-Brush.ttf"),
    });

    // ===== DYNAMIC DATA ===== //
    const defaultPrimary = "#0086cd";
    const defaultSecondary = "#314dcb";
    const [schoolColorsDynamic, setSchoolColorsDynamic] = useState(
        generateColors(defaultPrimary, defaultSecondary)
    );

    // Static loading properties
    const [splashComplete, setSplashComplete] = useState<boolean>(false);
    const isLoadingComplete = useCachedResources();

    const [isAuth, setIsAuth] = useState<null | boolean>(null);
    const [isUserValid, setIsUserValid] = useState<boolean>(false);

    const [isStorageLoaded, setIsStorageLoaded] = useState(false);

    // Notifications
    useEffect(() => {
        if (isAuth === true) {
            void registerForPushNotificationsAsync()
                .then(
                    (token?: {
                        type: "ios" | "android" | "web" | "windows" | "macos";
                        data: string;
                    }) => {
                        store.dispatch(updatePushToken(token ?? {data: "", type: ""}));
                    }
                )
                .catch(console.error);

            // Remove badge notification when open app
            void Notifications.dismissAllNotificationsAsync();
        }
    }, [isAuth]);

    // Local data from API
    const getData = async (): Promise<any> => {
        try {
            const jsonValue = await AsyncStorage.getItem("userinfos");
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error("error get data from storage", e);
            return null;
        }
    };

    // ==== AUTO AUTHENTICATION ==== //
    useEffect(() => {
        void getData().then((storedData) => {
            setIsStorageLoaded(true);
            if (storedData !== null) {
                if (storedData.permanentToken && storedData._id) {
                    void autoAuth(storedData.permanentToken, storedData._id).then(
                        (resp) => {
                            setIsUserValid(resp.currentUser?.isValid ?? false);
                            setIsAuth(resp.isAuth);
                        }
                    );
                } else setIsAuth(false);
            } else setIsAuth(false);
        });
    }, []);

    // ==== UPDATING THEME WHEN SCHOOL CHANGES ==== //
    useEffect(() => {
        store.subscribe(() => {
            const school = store.getState().userInfos.school;
            setSchoolColorsDynamic(
                generateColors(
                    school?.colors?.primary ?? defaultPrimary,
                    school?.colors?.secondary ?? defaultSecondary
                )
            );
        });
    }, []);

    const [theme, setTheme] = useState<boolean>(
        Appearance.getColorScheme() === "dark"
    );

    useEffect(() => {
        Appearance.addChangeListener(({colorScheme}) => {
            setTheme(colorScheme === "dark");
        });
    }, []);

    return (
        <Navigator>
            <GestureHandlerRootView style={{flex: 1}}>
                <Provider store={store}>
                    <SafeAreaProvider>
                        <SplashScreenComponent onComplete={setSplashComplete}/>
                        {/* Splashscreen avant le login */}
                        {isAuth === null ||
                        !isStorageLoaded ||
                        (!isLoadingComplete && !fontsLoaded) ? (
                            <SplashScreenComponent onComplete={setSplashComplete}/>
                        ) : splashComplete ? (
                            <>
                                <ThemeContext.Provider
                                    value={{
                                        colors: schoolColorsDynamic,
                                        setColors: setSchoolColorsDynamic,
                                        isDark: theme,
                                        setIsDark: setTheme,
                                    }}
                                >
                                    <Slot/>
                                    <StatusBar
                                        animated={true}
                                        hidden={false}
                                        networkActivityIndicatorVisible={false}
                                        backgroundColor={
                                            schoolColorsDynamic.primaryLight ?? "#21a5ff"
                                        }
                                        translucent={true}
                                    />
                                </ThemeContext.Provider>
                            </>
                        ) : (
                            <SplashScreenComponent onComplete={setSplashComplete}/>
                        )}
                    </SafeAreaProvider>
                </Provider>
            </GestureHandlerRootView>
        </Navigator>
    );
}
