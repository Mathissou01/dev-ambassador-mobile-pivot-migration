import { View } from "@/components/Themed";
import React from "react";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { type User } from "@/hooks/API/ObjectTypes/User";
import AvatarCard from "./AvatarCard";

const SPACING_BETWEEN_CARD = 5.5;
const CARD_WIDTH = 100;

const generateSnapOffsets = (dataSize: number): number[] => {
  return new Array(dataSize - 1).fill("a").map((_, index) => computePosition(index));
};

const computePosition = (index: number): number => {
  return CARD_WIDTH * index + SPACING_BETWEEN_CARD * index;
};

const CountryListRenderer = ({ users }: { users: User[] }): React.JSX.Element => {
  const scrollXOffsetSharedValue = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((e) => {
    scrollXOffsetSharedValue.value = e.contentOffset.x;
  });

  if (users?.length !== 0)
    return (
      <Animated.FlatList
        data={users}
        style={{}}
        keyExtractor={(ambassador) =>
          ambassador.firstname + "-" + ambassador.lastname + "-" + "avatar"
        }
        decelerationRate={0.85}
        onScroll={scrollHandler}
        snapToOffsets={generateSnapOffsets(users?.length ?? 1)}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => {
          return (
            <View
              style={{
                width: 10,
              }}
            ></View>
          );
        }}
        renderItem={({ item, index }) => {
          return (
            <AvatarCard
              index={index}
              key={"avatar" + index}
              inputRange={[
                computePosition(index - 1),
                computePosition(index),
                computePosition(index + 1),
              ]}
              user={item}
              scrollXOffsetSharedValue={scrollXOffsetSharedValue}
            />
          );
        }}
      />
    );
  return <></>;
};

export default CountryListRenderer;
