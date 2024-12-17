import React, {ReactNode, useContext, useEffect, useMemo, useRef, useState,} from "react";
import {ScrollView, Text, View} from "@/components/Themed";
import PastEventBlock from "@/components/CommonArchives/PastEventBlock";
import ActualEventBlock from "@/components/CommonArchives/ActualEventBlock";
import {Animated, useWindowDimensions} from "react-native";
import {ThemeContext} from "@/hooks/useColorScheme";
import {getColorForEvent} from "@/utils/colorsByEvent";
import {type Archive} from "@/hooks/API/ObjectTypes/Archive";
import {StoryButton} from "@/components/CommonArchives/StoriesViewerModule/HomeScreen/StoryButton/StoryButton";
import {useHomeScreen} from "@/components/CommonArchives/StoriesViewerModule/HomeScreen/useHomeScreen";
import {AddStoryButton} from "@/components/CommonArchives/StoriesViewerModule/HomeScreen/AddStoryButton/AddStoryButton";
import LiquidPaginationDot from "@/components/CommonArchives/StoriesViewerModule/LiquidPaginationDot";
import {useFocusEffect} from "@react-navigation/native";
import {useGetArchivesByUserQuery} from "@/services/archives";
import {dateDiffInHoursAndMinutes} from "@/components/CommonArchives/utils/DateDiff";
import {selectUserInfos} from "@/redux/UserInfos/UserInfosSlice";
import {useAppDispatch, useAppSelector} from "@/hooks/store";
import {User, UserType} from "@/hooks/API/ObjectTypes/User";
import {useCameraPermissions} from "expo-camera";
import styles from "@/styles/tabs/ArchiveStyle";
import {router} from "expo-router";
import {setStories} from "@/redux/Archive/ArchiveSlice";
import LottieView from "lottie-react-native";

const EVENEMENTS_NO_ACTUELS_LABEL = "Vous ne participez à aucun évènement \n à l'heure actuelle.";
const EVENEMENTS_ACTUELS_LABEL = "Événement actuel";
const EVENEMENTS_PASSES_LABEL = "Événements passés";

export default function ArchiveScreen(): ReactNode {
    const dispatch = useAppDispatch();

    // Camera things
    const [permission] = useCameraPermissions();

    // État pour stocker la liste d'événements
    const {data: archives, refetch} = useGetArchivesByUserQuery("");
    const [events, setEvents] = useState<Archive[]>([]);
    const [currentArchive, setCurrentArchive] = useState<Archive | null>(null);
    const [userCanPublish, setUserCanPublish] = useState(false);

    // FlatList scroll with Dots
    const {width} = useWindowDimensions();
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollOffset = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);
    const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
    // Story Mock
    const {openStory} = useHomeScreen();
    // Story Mock
    const colorTheme = useContext(ThemeContext);

    const userInfos = useAppSelector(selectUserInfos);

    useFocusEffect(
        React.useCallback(() => {
            void refetch();
        }, [])
    );

    useEffect(() => {
        const passedEvent: Archive[] = [];

        archives?.forEach((archive) => {
            // CURRENT EVENT
            if (
                archive.evenement?.start_date! < new Date() &&
                archive.evenement?.end_date! > new Date()
            ) {
                dispatch(
                    setStories(
                        archive.archive_posts.sort((a, b) => {
                            // Sort by user story first and then creation date
                            if (a?.user?._id === userInfos._id) return -1;
                            if (a.createdAt > b.createdAt) {
                                return 1;
                            }
                            return 1;
                        })
                    )
                );
                setCurrentArchive(archive);

                // Enable / Disable possibility to add stories
                setUserCanPublish(
                    archive.archive_posts.filter((p) => p?.user?._id === userInfos._id)
                        .length === 0
                );
            } else {
                passedEvent.push(archive);
            }
        });

        // ORDER BY END DATE DESC
        setEvents(
            passedEvent.sort((a, b) =>
                a.evenement?.end_date! < b.evenement?.end_date! ? 1 : -1
            )
        );
    }, [archives]);

    const renderItem = ({item}: { item: Archive[] }): React.JSX.Element => {
        return (
            <PastEventBlock
                width={width}
                key={item.map((p) => p._id).join("_")}
                archive={item}
                color={getColorForEvent("", colorTheme!)}
            />
        );
    };

    // ===== CAMERA PERMISSION ===== //
    const addStory = (): void => {
        if (!permission?.granted) {
            // Rediriger vers la page de permission si la permission n'est pas accordée
            router.navigate("/(app)/archives/permission");
        } else {
            // Sinon, accédez à la page de création d'histoire
            router.push("/(app)/archives/story/info-archive");
        }
    };

    const formatted = useMemo((): Archive[][] => {
        const tmp: Archive[][] = [];
        let currentPage = 0;
        events.map((evt): void => {
            if (!tmp[currentPage]) {
                tmp[currentPage] = [evt];
            } else {
                if (tmp[currentPage].length > 3) {
                    currentPage += 1;
                    tmp[currentPage] = [evt];
                } else {
                    tmp[currentPage].push(evt);
                }
            }
        });

        return tmp;
    }, [events]);

    return (
        <ScrollView alwaysBounceVertical={false}>
            <View style={styles.inScrollContainer}>
                {/* DailyStories View */}
                <View style={styles.storiesContainer}>
                    <ScrollView
                        horizontal
                        style={styles.scrollView}
                        showsHorizontalScrollIndicator={false}
                    >
                        {/* Add a picture to an event - Only available when no story already published */}
                        {userCanPublish && (
                            <AddStoryButton
                                canPublish={userCanPublish}
                                addStory={addStory}
                                user={new User(userInfos as unknown as UserType)}
                                userIndex={0}
                            />
                        )}
                        {/* View the picture of an event */}
                        {currentArchive?.archive_posts?.map((story, userIndex) => (
                            <StoryButton
                                key={story._id}
                                story={story}
                                userIndex={userIndex}
                                openStory={openStory}
                            />
                        ))}
                    </ScrollView>
                </View>
                {currentArchive !== null && currentArchive?.evenement !== null ? (
                    <>
                        <Text bold style={styles.infoLabel}>
                            {EVENEMENTS_ACTUELS_LABEL}
                        </Text>
                        <Text>
                            {/*{currentArchive.evenement.credits}*/}
                        </Text>
                        <ActualEventBlock
                            key={currentArchive?.evenement._id}
                            eventForms={(1).toString()}
                            eventName={currentArchive?.evenement?.name}
                            eventDate={currentArchive?.evenement?.start_date?.toLocaleDateString(
                                "fr-FR",
                                {
                                    dateStyle: "medium",
                                }
                            )}
                            eventTime={dateDiffInHoursAndMinutes(
                                currentArchive.evenement?.start_date!,
                                currentArchive.evenement?.end_date!
                            )}
                            creditWon={currentArchive.evenement.credits.toString()}
                            eventAmbassadors={currentArchive.users ?? []}
                        />
                    </>
                ) : (
                    <View style={styles.noEventContainer}>
                        <Text bold style={styles.noEventText}>
                            {EVENEMENTS_NO_ACTUELS_LABEL}
                        </Text>
                        <LottieView
                            source={require("@/assets/json/acces-robot/noEventArchive.json")}
                            autoPlay
                            loop
                            style={styles.lottieImage}
                        />
                    </View>
                )}
                {formatted.length > 0 && (<>
                    <Text bold style={styles.infoLabel}>
                        {EVENEMENTS_PASSES_LABEL}
                    </Text>
                    {/* Afficher les EventBlocks en grille */}
                    <View style={styles.flatlistContainer}>
                        <Animated.FlatList
                            ref={flatListRef}
                            viewabilityConfig={viewConfigRef.current}
                            data={formatted}
                            renderItem={renderItem}
                            contentContainerStyle={styles.flatListContentContainer}
                            decelerationRate={"normal"}
                            scrollEventThrottle={16}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            horizontal
                            onScroll={Animated.event(
                                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                                {
                                    useNativeDriver: false,
                                }
                            )}
                            onMomentumScrollEnd={Animated.event(
                                [{nativeEvent: {contentOffset: {x: scrollOffset}}}],
                                {
                                    useNativeDriver: false,
                                }
                            )}
                        />
                    </View>
                    {/* Génener une pagination pour naviguer entre les grilles */}
                    <View style={styles.paginationContainer}>
                        <LiquidPaginationDot
                            data={formatted}
                            scrollX={scrollX}
                            scrollOffset={scrollOffset}
                            strokeWidth={10}
                            dotSize={16}
                            marginHorizontal={8}
                            activeDotColor={"#fff"}
                            containerStyle={styles.containerStyles}
                            bigHead={true}
                            bigHeadScale={1.2}
                            inActiveDotOpacity={0.3}
                        />
                    </View>
                </>)}
            </View>
        </ScrollView>
    );
}
