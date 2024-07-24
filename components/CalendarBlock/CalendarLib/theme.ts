import {useContext} from "react";
import {Platform} from "react-native";
import {colors} from "@/config/styles/01-settings/_colors";
import {hexToRgbA} from "../../../utils/hexToRgbA";
import {ThemeContext} from "../../../hooks/useColorScheme";

export function getTheme() {
    const themeColor = useContext(ThemeContext);
    const disabledColor = "#818181";

    return {
        // arrows
        arrowColor: themeColor?.isDark ? colors.textDark : colors.textLight,
        arrowStyle: {padding: 0},
        // knob
        expandableKnobColor: themeColor?.colors.primarySemiLight,
        // month
        monthTextColor: themeColor?.isDark ? colors.textDark : colors.textLight,
        textMonthFontSize: 16,

        textMonthFontWeight: "bold" as const,
        // day names
        textSectionTitleColor: themeColor?.isDark ? colors.textDark : colors.textLight,
        textDayHeaderFontSize: 12,

        textDayHeaderFontWeight: "normal" as const,
        // dates
        dayTextColor: themeColor?.isDark ? colors.textDark : colors.textLight,
        todayTextColor: themeColor?.colors.secondaryLight,
        textDayFontSize: 18,

        textDayFontWeight: "500" as const,
        textDayStyle: {marginTop: Platform.OS === "android" ? 2 : 4},
        // selected date
        selectedDayBackgroundColor: themeColor?.isDark ? themeColor?.colors.secondaryExtraLight : themeColor?.colors.primaryExtraLight,
        selectedDayTextColor: themeColor?.isDark ? colors.textDark : colors.textLight,
        // disabled date
        textDisabledColor: disabledColor,
        // dot (marked date)
        dotColor: themeColor?.colors.primaryDark,
        selectedDotColor: themeColor?.isDark ? colors.textDark : colors.textLight,
        disabledDotColor: disabledColor,
        dotStyle: {marginTop: -2},
        backgroundColor: themeColor?.isDark ? hexToRgbA(colors.white, 0.22) : colors.white,
        calendarBackground: themeColor?.isDark ? colors.backgroundDark : colors.white,
        // Font familly
        textDayFontFamily: "Raleway-Regular",
        textMonthFontFamily: "Raleway-Regular",
        textDayHeaderFontFamily: "Raleway-Regular",
        textTodayFontFamily: "Raleway-Regular",
    };
}
