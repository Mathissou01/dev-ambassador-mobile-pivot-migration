import React, {useEffect, useState} from "react";
import {RefreshControl, SafeAreaView} from "react-native";
import {ScrollView, Text, View} from "@/components/Themed";
import NextEventBlock from "@/components/Home/HomeScreenBlock/NextEventBlock";
import AmbassadorStatsBlock from "@/components/Home/HomeScreenBlock/AmbassadorStatsBlock";
import {useAppSelector} from "@/hooks/store";
import {Events} from "@/hooks/API/Repositories/Events";
import {colors} from "@/config/styles/01-settings/_colors";
import styles from "@/styles/tabs/HomeStyle";

/* Local data */
const eventRepo = new Events();
const toolTipsLabel = {
    nextEventLabel:
        "Ici, tu trouveras les événements disponibles pour ton inscription. Si tu es déjà inscrit à un événement, les détails du prochain événement auquel tu participeras s'afficheront également.",
    AmbassadorStatsLabel: "Test2",
};

export default function HomeScreen(): React.JSX.Element {
    // SMALL SCREEN
    const [nbFuturEvent, setNbFuturEvent] = useState(0);
    const [myNextEvent, setMyNextEvent] = useState(false);
    const [nbNextEvents, setNbNextEvents] = useState<number>(0);
    const [refreshing, setRefreshing] = useState(false);

    const userInfos = useAppSelector((state) => state.userInfos);

    const loadData = async (): Promise<void> => {
        await eventRepo.getWithParams("between", [new Date().toISOString()]).then((resp) => {
            setNbFuturEvent(resp.length);
        });

        await eventRepo.getWithParams("next_user_event", [`${userInfos._id}`]).then((resp) => {
            if (resp[0]) {
                setNbNextEvents(resp.length);
                setMyNextEvent(resp[0]);
            }
        });
    };

    useEffect(() => {
        void loadData();
    }, []);

    const onRefresh = (): void => {
        setRefreshing(true);
        void loadData().then(() => {
            setRefreshing(false);
        });
    };

    return (
        // <SafeAreaView>
            <ScrollView
                style={[styles.globalContainerScroll]}
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            >
                {/* <HomeWalkthrought /> */}
                <View style={styles.globalContainer}>
                    {/* Bloc contenant le bonjour avec l'username */}
                    <View style={styles.titleView}>
                        <Text style={styles.title}>
                            <Text
                                style={{backgroundColor: "transparent"}}
                                lightColor={colors.black}
                                darkColor={colors.white}
                            >
                                Bonjour
                            </Text>
                            {/* Nom de l'Ambassador */}
                            <Text
                                bold
                                style={{backgroundColor: "transparent"}}
                                lightColor={colors.black}
                                darkColor={colors.white}
                            >
                                {userInfos?.firstname != null ? " " + userInfos?.firstname : " X"}
                            </Text>
                        </Text>
                    </View>
                    <NextEventBlock nbFuturEvent={nbFuturEvent} eventInfo={myNextEvent}/>
                    <AmbassadorStatsBlock
                        nextEvent={nbNextEvents ?? 0}
                        eventDone={userInfos?.stats?.nb_events ?? 0}
                        formSend={userInfos?.stats?.nb_forms ?? 0}
                        level={userInfos?.stats?.level ?? 0}
                    />
                </View>
            </ScrollView>
        // </SafeAreaView>
    );
}
