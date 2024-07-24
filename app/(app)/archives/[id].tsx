import React, {useEffect, useState} from "react";
import {Text, View} from "@/components/Themed";
import ImageGrid from "@/components/CommonArchives/ImageGrid";
import StatsBlock, {type blockType} from "@/components/CommonArchives/StatsBlock";
import ImageView from "@/components/CommonArchives/ImageViewingModule/index";
import styles from "@/styles/archives/EventViewerStyle";
import {Archives} from "@/hooks/API/Repositories/Archives";
import {type Archive, type ArchiveViewer} from "@/hooks/API/ObjectTypes/Archive";
import {type Event as Evenement} from "@/hooks/API/ObjectTypes/Event";
import {useAppSelector} from "@/hooks/store";
import {dateDiffInHoursAndMinutes} from "@/components/CommonArchives/utils/DateDiff";
import NoImageBlock from "@/components/CommonArchives/NoImageBlock";
import {Redirect, useLocalSearchParams, useNavigation} from "expo-router";

const PHOTOS_LABEL = "Photos";
const STATISTIQUES_LABEL = "Statistiques";

export default function EventViewer(): React.JSX.Element {
    const navigation = useNavigation();
    const {id: ARCHIVE} = useLocalSearchParams<{id: string}>();

    if (ARCHIVE === undefined){
        // Back to index if error in id
        return <Redirect href={`/(app)/archives/index`} />
    }

    // SELECTED ARCHIVE
    const [archivePosts, setArchivePosts] = useState<ArchiveViewer[]>([]);
    const [archiveEvent, setArchiveEvent] = useState<Evenement>();
    const [dataBlocks, setDataBlocks] = useState<blockType[]>([]);

    // ACCESS TOKEN TO GET IMAGES
    const accessToken = useAppSelector((state) => state.userInfos.accessToken);

    const [isVisible, setIsVisible] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    // const [archive, setArchive] = useState<ArchiveType>();

    const onPress = (url: string, index: number, event?: any): void => {
        // console.log("index", index);
        // url and index of the image you have clicked along with onPress event.
        setIsVisible(true);
        setImageIndex(index);
    };

    const [userData, setUserData] = useState<ArchiveViewer>();

    const handleImageIndexChange = (index: number): void => {
        setUserData(archivePosts[index]);
    };

    // GET DATA
    useEffect(() => {
        // Get archive
        void new Archives().getById<Archive>(ARCHIVE).then((resp) => {
            const data = resp.transformer;
            setArchivePosts(data);
            setArchiveEvent(resp.evenement!);
            const durationEvent = dateDiffInHoursAndMinutes(
                resp.evenement?.start_date!,
                resp.evenement?.end_date!
            );
            setDataBlocks([
                {
                    label: "Temps passé" + (durationEvent !== 1 ? "s" : ""),
                    value: durationEvent,
                    icon: "ClockIcon",
                },
                {
                    label: "Crédit obtenu" + (resp.evenement?.credits > 1 ? "s" : ""),
                    value: (resp.evenement?.credits ?? 0).toString(),
                    icon: "RibbonAwardIcon",
                },
                {
                    label: "Formulaire" + (resp.forms !== 1 ? "s" : ""),
                    value: resp.forms,
                    icon: "ClipboardIcon",
                },
            ]);

            if (data[0] !== null) {
                setUserData(data[0]);
            }
        });
    }, []);

    useEffect(() => {
        // Set header title
        navigation.setOptions({
            title: archiveEvent?.name ?? "Archive"
        })
    }, [archiveEvent]);

    return (
        <View style={styles.inScrollContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.subHeaderContainer}>
                    <View style={styles.leftTextContainer}>
                        <Text adjustsFontSizeToFit={true} numberOfLines={2} bold style={styles.eventTitle}>
                            {archiveEvent?.name}
                        </Text>
                    </View>
                    <View style={styles.rightTextContainer}>
                        <Text style={styles.dateEventLabel}>
                            {/* {archiveEvent?.start_date?.toLocaleDateString("fr-FR", { dateStyle: "medium" })} */}
                            23 décembre 2024
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.imagesHeaderContainer}>
                <Text>{PHOTOS_LABEL}</Text>
            </View>
            <View
                style={[styles.imageGridContainer, archivePosts.length === 0 ? {height: "auto"} : {}]}
            >
                {archivePosts.length > 0 ? (
                    <>
                        <ImageGrid images={archivePosts.map((image) => image.uri)} onPress={onPress}/>
                        <ImageView
                            userName={userData?.userName}
                            userAvatar={userData?.userAvatar}
                            userImageTimeStampDate={userData?.imageTimestampDate}
                            userImageTimeStampTime={userData?.imageTimestampTime}
                            userImageShare={userData?.uri}
                            images={archivePosts.map((img) => ({
                                uri: img.uri,
                                headers: {
                                    Authorization: `Ambassador ${accessToken}`,
                                },
                            }))}
                            // images={archivePosts}
                            imageIndex={imageIndex}
                            onImageIndexChange={handleImageIndexChange}
                            visible={isVisible}
                            onRequestClose={() => {
                                setIsVisible(false);
                            }}
                        />
                    </>
                ) : (
                    <NoImageBlock/>
                )}
            </View>
            <Text style={styles.statisticTitle}>{STATISTIQUES_LABEL}</Text>
            <StatsBlock blocks={dataBlocks}/>
        </View>
    );
}
