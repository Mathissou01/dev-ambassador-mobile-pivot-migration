import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import {Platform} from "react-native";

export async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            alert("Échec de l'obtention du jeton de notification push !");
            return;
        }
        try {
            const deviceToken = await Notifications.getDevicePushTokenAsync();
            token = {type: deviceToken?.type ?? "", data: deviceToken?.data ?? ""};
        } catch (err) {
            console.error(err);
        }
    } else {
        alert("L'utilisation d'un dispositif physique est nécessaire pour les notifications push.");
    }

    if (Platform.OS === "android") {
        void Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [250, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }
    return token;
}
