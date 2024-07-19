import React, {useMemo} from "react";
import {FlatList, TouchableOpacity} from "react-native";
import {Text, View} from "@/components/Themed";
import {type NavigationProp, useNavigation} from "@react-navigation/native";
import {Archive} from "@/hooks/API/ObjectTypes/Archive";
import {LinearGradient} from "expo-linear-gradient";
import styles from "./PastEventBlockStyle";

interface PastEventBlockProps {
    archive: Archive[];
    color: string;
    width: number;
}

const PastEventBlock: React.FC<PastEventBlockProps> = ({
                                                           archive,
                                                           color,
                                                           width,
                                                       }: PastEventBlockProps) => {
    const navigation = useNavigation<NavigationProp<any>>();

    const handlePress = (id: string): void => {
        navigation.navigate("EventViewer", {archiveId: id});
    };

    const [x1, x2, y1, y2] = useMemo(() => {
        return [Math.random(), Math.random(), Math.random(), Math.random()];
    }, []);

    const renderItem = ({item}: { item: Archive }) =>
        item != null ? (
            <TouchableOpacity
                key={item._id}
                style={[styles.button]}
                onPress={() => {
                    handlePress(item._id ?? "");
                }}
            >
                <LinearGradient
                    style={styles.rectangle}
                    colors={[color, color + "A0"]}
                    start={{x: x1, y: y1}}
                    end={{x: x2, y: y2}}
                >
                    <View style={[styles.textContainer]}>
                        <Text bold style={[styles.eventNameText]}>
                            {item.evenement?.name}
                        </Text>
                        <Text light style={[styles.eventDateText]}>
                            {item.evenement?.start_date?.toLocaleDateString()}
                        </Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        ) : null;

    return (
        <FlatList
            style={[{width, height: 220}]}
            contentContainerStyle={{paddingHorizontal: 10, gap: 20}}
            columnWrapperStyle={{gap: 20}}
            data={archive}
            renderItem={renderItem}
            numColumns={2}
            scrollEnabled={false}
        />
    );
};

export default PastEventBlock;
