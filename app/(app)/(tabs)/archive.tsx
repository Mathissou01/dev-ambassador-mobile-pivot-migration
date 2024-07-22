import React, {ReactNode, useContext, useEffect, useRef, useState} from "react";
import {Text, View} from "@/components/Themed";
import PastEventBlock from "@/components/CommonArchives/PastEventBlock";
import ActualEventBlock from "@/components/CommonArchives/ActualEventBlock";
import {Animated, ScrollView, useWindowDimensions} from "react-native";
import {ThemeContext} from "@/hooks/useColorScheme";
import {getColorForEvent} from "@/utils/colorsByEvent";
import {type Archive} from "@/hooks/API/ObjectTypes/Archive";
import {StoryButton} from "@/components/CommonArchives/StoriesViewerModule/HomeScreen/StoryButton/StoryButton";
import {useHomeScreen} from "@/components/CommonArchives/StoriesViewerModule/HomeScreen/useHomeScreen";
import {AddStoryButton} from "@/components/CommonArchives/StoriesViewerModule/HomeScreen/AddStoryButton/AddStoryButton";
import LiquidPaginationDot from "@/components/CommonArchives/StoriesViewerModule/LiquidPaginationDot";
import {type NavigationProp, useFocusEffect, useNavigation} from "@react-navigation/native";
import {useGetArchivesQuery} from "@/services/archives";
import {dateDiffInHoursAndMinutes} from "@/components/CommonArchives/utils/DateDiff";
import {selectUserInfos} from "@/redux/UserInfos/UserInfosSlice";
import {useAppSelector} from "@/hooks/store";
import {User} from "@/hooks/API/ObjectTypes/User";
// import {Camera} from "react-native-vision-camera";
import styles from "@/styles/tabs/ArchiveStyle";

const EVENEMENTS_ACTUELS_LABEL = "Événements actuels";
const EVENEMENTS_PASSES_LABEL = "Événements passés";

export default function ArchiveScreen(): ReactNode {
    // État pour stocker la liste d'événements
    const {data: archives, refetch} = useGetArchivesQuery();
    const [events, setEvents] = useState<Archive[]>([]);
    const [currentArchive, setCurrentArchive] = useState<Archive | null>(null);
    const [userCanPublish, setUserCanPublish] = useState(false);
    // FlatList scroll with Dots
    const {width} = useWindowDimensions();
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollOffset = useRef(new Animated.Value(0)).current;
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);
    const onViewRef = useRef(({viewableItems}: any) => {
        setActiveIndex(viewableItems[0].index);
    });
    const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
    // Story Mock
    const {openStory, setStories} = useHomeScreen();
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
                setStories(
                    archive.archive_posts.sort((a, b) => {
                        // Sort by user story first and then creation date
                        if (a?.user?._id === userInfos._id) return -1;
                        if (a.createdAt > b.createdAt) {
                            return 1;
                        }
                        return 1;
                    })
                );
                setCurrentArchive(archive);

                // Enable / Disable possibility to add stories
                setUserCanPublish(
                    archive.archive_posts.filter((p) => p?.user?._id === userInfos._id).length === 0
                );
            } else {
                passedEvent.push(archive);
            }
        });

        // ORDER BY END DATE DESC
        setEvents(passedEvent.sort((a, b) => (a.evenement?.end_date! < b.evenement?.end_date! ? 1 : -1)));
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

    const navigation = useNavigation<NavigationProp<any>>();

    // ===== CAMERA PERMISSION ===== //
    // const cameraPermission = Camera.getCameraPermissionStatus();
    // const showPermissionsPage = cameraPermission !== "granted";

    const addStory = (): void => {
        if (showPermissionsPage) {
            navigation.navigate("PermissionPage");
            // Rediriger vers la page de permission si la permission n'est pas accordée
        } else {
            // Sinon, accédez à la page de création d'histoire
            navigation.navigate("InfoArchiveScreen");
        }
    };

    const formatted = (): Archive[][] => {
        const tmp: Archive[][] = [];
        let currentPage = 0;
        [...events, ...events].map((evt): void => {
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
    };

    console.log(currentArchive);

    return (
        <View style={styles.inScrollContainer}>
            {/* DailyStories View */}
            <View style={styles.storiesContainer}>
                <ScrollView horizontal style={styles.scrollView} showsHorizontalScrollIndicator={false}>
                    {/* Add a picture to an event - Only available when no story already published */}
                    {userCanPublish && (
                        <AddStoryButton
                            canPublish={userCanPublish}
                            addStory={addStory}
                            user={new User(userInfos)}
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
            {currentArchive !== null && currentArchive?.evenement !== null && (
                <>
                    <Text bold style={styles.infoLabel}>
                        {EVENEMENTS_ACTUELS_LABEL}
                    </Text>
                    <ActualEventBlock
                        key={currentArchive?.evenement._id}
                        eventForms={(1).toString()}
                        eventName={currentArchive?.evenement?.name}
                        eventDate={currentArchive?.evenement?.start_date?.toLocaleDateString("fr-FR", {
                            dateStyle: "medium",
                        })}
                        eventTime={dateDiffInHoursAndMinutes(
                            currentArchive.evenement?.start_date!,
                            currentArchive.evenement?.end_date!
                        )}
                        creditWon={currentArchive.evenement.credits.toString()}
                        eventAmbassadors={currentArchive.users ?? []}
                    />
                </>
            )}
            <Text bold style={styles.infoLabel}>
                {EVENEMENTS_PASSES_LABEL}
            </Text>
            {/* Afficher les EventBlocks en grille */}
            <View style={styles.flatlistContainer}>
                <Animated.FlatList
                    ref={flatListRef}
                    onViewableItemsChanged={onViewRef.current}
                    viewabilityConfig={viewConfigRef.current}
                    data={formatted()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.flatListContentContainer}
                    decelerationRate={"normal"}
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    horizontal
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
                        useNativeDriver: false,
                    })}
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
                    data={formatted()}
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
        </View>
    );
}