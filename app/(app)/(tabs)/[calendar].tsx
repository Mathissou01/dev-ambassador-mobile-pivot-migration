import React, {ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {Platform, RefreshControl} from "react-native";
import {AgendaList, CalendarProvider, ExpandableCalendar} from "react-native-calendars";
import testIDs from "@/components/CalendarBlock/CalendarLib/testIDs";
import {getAndExportTest, getMarkedDates,} from "@/components/CalendarBlock/CalendarLib/agendaItems";
import AgendaItem from "@/components/CalendarBlock/CalendarLib/AgendaItem";
// import TooltipWrapper from "@/components/WalkthroughtBlocks/TooltipWrapper";
import {getTheme} from "@/components/CalendarBlock/CalendarLib/theme";
import setFrenchConfig from "@/components/CalendarBlock/CalendarLib/LocaleConfig";
import leftArrowIcon from "@/components/CalendarBlock/CalendarLib/previous.png";
import rightArrowIcon from "@/components/CalendarBlock/CalendarLib/next.png";
import {Text, View} from "@/components/Themed";
import LoaderApi from "@/components/LoaderApi";
import {ThemeContext} from "@/hooks/useColorScheme";
import {useAppSelector} from "@/hooks/store";
import {hexToRgbA} from "@/utils/hexToRgbA";
import {type UserState} from "@/types";
import {colors} from "@/config/styles/01-settings/_colors";
import {useLocalSearchParams} from "expo-router";

setFrenchConfig();

interface EventItem {
    [x: string]: any;

    id: number;
    title: string;
    date: Date;
}

/* Local data */
const toolTipsLabel = {
    nextEventLabel:
        "Ici, tu trouveras les événements disponibles pour ton inscription. Si tu es déjà inscrit à un événement, les détails du prochain événement auquel tu participeras s'afficheront également.",
    AmbassadorStatsLabel: "Test2",
};

const ExpandableCalendarScreen = (): ReactNode => {
    const {calendar: notificationEventId} = useLocalSearchParams<{ calendar: string }>();

    // Mock
    const userInfos: UserState = useAppSelector((state) => state.userInfos);

    const themeColor = useContext(ThemeContext);

    const [eventMockItems, setEventMockItems] = useState<Array<{ title: string; data: any }>>([]);

    const [markedDates, setMarkedDates] = useState({current: {}});
    const [refreshing, setRefreshing] = useState(true);

    // DATE TODAY
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);

    const onRefresh = useCallback(() => {
        getEventsForCalendar();
    }, []);

    const todayBtnTheme = useRef({
        todayButtonTextColor: themeColor?.colors.primaryExtraDark,
        todayButtonFontFamily: "Raleway-Regular",
    });

    // prettier-ignore
    const colorsToDisplay = {
        "WebTech Institute": {
            color:
                themeColor?.isDark === true
                    ? themeColor?.colors.secondaryDark
                    : themeColor?.colors.secondaryExtraDark,
            backgroundColor:
                themeColor?.isDark === true
                    ? themeColor?.colors.primaryLight
                    : themeColor?.colors.primaryExtraLight,
        },
        "ATLAS Institute": {
            color:
                themeColor?.isDark === true
                    ? themeColor?.colors.primaryExtraDark
                    : themeColor?.colors.secondaryExtraLight,
            backgroundColor:
                themeColor?.isDark === true
                    ? themeColor?.colors.secondaryExtraLight
                    : themeColor?.colors.primary,
        },
        "Magnum Institute": {
            color:
                themeColor?.isDark === true
                    ? themeColor?.colors.primaryExtraDark
                    : themeColor?.colors.secondaryExtraDark,
            backgroundColor:
                themeColor?.isDark === true
                    ? themeColor?.colors.secondaryExtraLight
                    : themeColor?.colors.primaryLight,
        },
        "Bachelor Institute": {
            color:
                themeColor?.isDark === true
                    ? themeColor?.colors.primaryExtraDark
                    : themeColor?.colors.secondaryExtraDark,
            backgroundColor:
                themeColor?.isDark === true
                    ? themeColor?.colors.secondaryExtraLight
                    : themeColor?.colors.primaryExtraLight,
        },
        "ESCEN": {
            color:
                themeColor?.isDark === true
                    ? themeColor?.colors.primaryExtraDark
                    : themeColor?.colors.secondaryExtraLight,
            backgroundColor:
                themeColor?.isDark === true
                    ? themeColor?.colors.secondaryExtraLight
                    : themeColor?.colors.primary,
        },
        "NEXT-U": {
            color:
                themeColor?.isDark === true
                    ? themeColor?.colors.secondaryDark
                    : themeColor?.colors.secondary,
            backgroundColor:
                themeColor?.isDark === true
                    ? themeColor?.colors.primaryExtraLight
                    : themeColor?.colors.primary,
        },
    };

    // prettier-ignore
    const colorsDayToDisplay = {
        "WebTech Institute":
            themeColor?.isDark === true
                ? themeColor?.colors.primaryExtraLight
                : themeColor?.colors.primary,
        "ATLAS Institute":
            themeColor?.isDark === true
                ? themeColor?.colors.secondaryExtraLight
                : themeColor?.colors.secondary,
        "Magnum Institute":
            themeColor?.isDark === true
                ? themeColor?.colors.secondaryExtraLight
                : themeColor?.colors.secondaryLight,
        "Bachelor Institute":
            themeColor?.isDark === true
                ? themeColor?.colors.secondaryExtraLight
                : themeColor?.colors.secondary,
        "ESCEN":
            themeColor?.isDark === true
                ? themeColor?.colors.secondaryExtraLight
                : themeColor?.colors.secondary,
        "NEXT-U":
            themeColor?.isDark === true
                ? themeColor?.colors.primaryLight
                : themeColor?.colors.primary,
    };

    useEffect(() => {
        if (refreshing) {
            getEventsForCalendar();
        }
    }, [refreshing]);

    const renderItem = useCallback(
        ({item}: { item: EventItem }) => {
            const isLastItem =
                eventMockItems.findIndex(
                    (ev) => JSON.stringify(ev.data[ev.data.length - 1]) === JSON.stringify(item)
                ) ===
                eventMockItems.length - 1;

            return (
                <AgendaItem
                    isSelected={notificationEventId === item.event_id}
                    item={item}
                    isLast={isLastItem}
                    doRefresh={() => {
                        onRefresh();
                    }}
                />
            );
        },
        [eventMockItems, notificationEventId]
    );

    const memoizedValue = useMemo(() => renderItem, [renderItem, notificationEventId]);

    const getEventsForCalendar = (): void => {
        getAndExportTest()
            .then((test) => {
                setEventMockItems(test);
                setMarkedDates({current: getMarkedDates(test)});
                setCurrentDate(new Date().toISOString().split("T")[0]);
                setTimeout(() => {
                    setRefreshing(false);
                }, 1000);
            })
            .catch((err) => {
                console.error("ERROR", err);
                throw err;
            });
    };

    const styles = {
        section: {
            backgroundColor:
                themeColor?.isDark === true ? colors.backgroundDark : colors.backgroundDefault,
            color: "grey",
            fontFamily: "Raleway-Regular",
        },
        agendaList: {
            backgroundColor:
                themeColor?.isDark === true ? colors.backgroundDark : colors.backgroundDefault,
            fontFamily: "Raleway-Regular",
        },
        emptyItem: {
            height: 52,
            justifyContent: "center" as const,
        },
        emptyItemText: {
            color: colors.gray500,
            fontSize: 15,
            textAlign: "center" as const,
        },
    };

    const [{key, theme}, setTheme] = useState({key: "dark", theme: getTheme()});

    const [themeUpdating, setThemeUpdating] = useState(false);

    useEffect(() => {
        const disabledColor = "#818181";
        setTheme({
            key: "light",
            theme: {
                // arrows
                arrowColor: themeColor?.isDark === true ? colors.textDark : colors.textLight,
                arrowStyle: {padding: 0},
                // knob
                expandableKnobColor: themeColor?.colors.primarySemiLight,
                // month
                monthTextColor: themeColor?.isDark === true ? colors.textDark : colors.textLight,
                textMonthFontSize: 17,

                textMonthFontWeight: "bold" as const,
                // day names
                textSectionTitleColor: themeColor?.isDark === true ? colors.textDark : colors.textLight,
                textDayHeaderFontSize: 13,

                textDayHeaderFontWeight: "normal" as const,
                // dates
                dayTextColor: themeColor?.isDark === true ? colors.textDark : colors.textLight,
                todayTextColor: colorsDayToDisplay[userInfos?.school?.name ?? "NEXT-U"],
                textDayFontSize: 19,

                textDayFontWeight: "500" as const,
                textDayStyle: {marginTop: Platform.OS === "android" ? 2 : 4},
                // selected date
                selectedDayBackgroundColor: colorsToDisplay[userInfos?.school?.name ?? "NEXT-U"].backgroundColor,
                selectedDayTextColor: colorsToDisplay[userInfos?.school?.name ?? "NEXT-U"].color!,
                // disabled date
                textDisabledColor: disabledColor,
                // dot (marked date)
                dotColor: themeColor?.colors.primaryDark,
                selectedDotColor: themeColor?.isDark === true ? colors.textDark : colors.textLight,
                disabledDotColor: disabledColor,
                dotStyle: {marginTop: -2},
                backgroundColor: themeColor?.isDark === true ? hexToRgbA(colors.white, 0.22) : colors.white,
                calendarBackground: themeColor?.isDark === true ? colors.backgroundDark : colors.white,
                textDayFontFamily: "",
                textMonthFontFamily: "",
                textDayHeaderFontFamily: "",
                textTodayFontFamily: ""
            },
        });

        setThemeUpdating(true);
        setTimeout(() => setThemeUpdating(false), 10);
    }, [themeColor]);

    return (
        <View style={{flex: 1}}>
            <LoaderApi visible={refreshing}/>
            {!refreshing && !themeUpdating && (
                <CalendarProvider
                    date={currentDate}
                    showTodayButton
                    theme={todayBtnTheme.current}
                    todayBottomMargin={100}
                    key={key + "-cal"}
                >
                    <ExpandableCalendar
                        key={key}
                        testID={testIDs.expandableCalendar.CONTAINER}
                        theme={theme}
                        firstDay={1}
                        markedDates={markedDates.current}
                        leftArrowImageSource={leftArrowIcon}
                        rightArrowImageSource={rightArrowIcon}
                        animateScroll
                        allowShadow={true}
                    />
                    {(eventMockItems?.length ?? 0) === 0 && (
                        <View style={styles.emptyItem}>
                            <Text style={styles.emptyItemText}>Aucun évènement disponible</Text>
                        </View>
                    )}
                    {/*<TooltipWrapper*/}
                    {/*    tooltipContent={toolTipsLabel.AmbassadorStatsLabel}*/}
                    {/*    showChildInTooltip={true}*/}
                    {/*    placement={"center"}*/}
                    {/*>*/}
                    <AgendaList
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                        sections={eventMockItems}
                        renderItem={memoizedValue}
                        sectionStyle={styles.section}
                        style={{opacity: refreshing ? 0.7 : 1}}
                    />
                    {/*</TooltipWrapper>*/}
                </CalendarProvider>
            )}
        </View>
    );
};
export default ExpandableCalendarScreen;
