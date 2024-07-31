import {SchoolIconColors} from "@/types";
import {Dimensions} from "react-native";

const {width} = Dimensions.get("window");

const iconColor = {
    webtech: {
        primaryColor: "#D11F40",
        secondaryColor: "#AD0020",
    },
    atlas: {
        primaryColor: "#382f2b",
        secondaryColor: "#271e20",
    },
    escen: {
        primaryColor: "#a00258",
        secondaryColor: "#700159",
    },
    bachelor: {
        primaryColor: "#f29100",
        secondaryColor: "##f28100",
    },
    magnum: {
        primaryColor: "#800080",
        secondaryColor: "#800060",
    },
};


export const getIconColorsForSchool = (schoolName: string): SchoolIconColors => {
    switch (schoolName) {
        case "WebTech Institute":
            return iconColor.webtech;
        case "ATLAS Institute":
            return iconColor.atlas;
        case "Magnum Institute":
            return iconColor.magnum;
        case "Bachelor Institute":
            return iconColor.bachelor;
        case "ESCEN":
            return iconColor.escen;
        default:
            // Default colors if the school name is not recognized
            return {
                primaryColor: "#D11F40",
                secondaryColor: "#AD0020",
            };
    }
};

export const TabsDetails = [
    {
        route: "Accueil",
        label: "Accueil",
        icon: require("@/assets/json/bottom-bar/home.json"),
        iconHeight: width <= 380 ? 65 : 70,
        iconWidth: width <= 380 ? 65 : 70,
    },
    {
        route: "Formulaires",
        label: "Formulaires",
        icon: require("@/assets/json/bottom-bar/form.json"),
        iconHeight: width <= 380 ? 70 : 80,
        iconWidth: width <= 380 ? 70 : 80,
    },
    {
        route: "Archives",
        label: "Archives",
        icon: require("@/assets/json/bottom-bar/archive.json"),
        iconHeight: width <= 380 ? 62 : 72,
        iconWidth: width <= 380 ? 62 : 72,
    },
    {
        route: "Calendrier",
        label: "Calendrier",
        icon: require("@/assets/json/bottom-bar/calendar.json"),
        iconHeight: width <= 380 ? 60 : 70,
        iconWidth: width <= 380 ? 60 : 70,
    },
    {
        route: "Compte",
        label: "Compte",
        icon: require("@/assets/json/bottom-bar/user.json"),
        iconHeight: width <= 380 ? 65 : 75,
        iconWidth: width <= 380 ? 65 : 75,
    },
];
