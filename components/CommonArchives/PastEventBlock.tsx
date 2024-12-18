import React from "react";
import {FlatList, TouchableOpacity} from "react-native";
import {Text, View} from "@/components/Themed";
import {Archive} from "@/hooks/API/ObjectTypes/Archive";
import {LinearGradient} from "expo-linear-gradient";
import styles from "./PastEventBlockStyle";
import {router} from "expo-router";

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
    const handlePress = (id: string): void => {
        router.navigate(`/(app)/archives/${id}`);
    };

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
                    colors={[color, color + "B0"]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                >
                    <View style={[styles.textContainer]}>
                        <Text
                            bold
                            style={[styles.eventNameText]}
                            numberOfLines={3}
                            ellipsizeMode="tail"
                        >
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
