import React, { useContext, useEffect, useState } from "react";
import { Animated } from "react-native";
import { type AmbassadorStatsBlockData, type Category } from "@/types";
import useColorScheme, { ThemeContext } from "@/hooks/useColorScheme";
import { Text, View } from "@/components/Themed";
import { DraggableGrid } from "../DraggableGridBlock/Draggable-grid";
import { colors } from "@/config/styles/01-settings/_colors";
import styles from "./AmbassadorStatsBlockStyle";

const randomGeneration = (): string => {
  const string = "0123456789";
  return Array.from({ length: 3 }, () =>
    string.charAt(Math.floor(Math.random() * string.length))
  ).join("");
};

const RandomDisplay = ({ initialValue }: { initialValue: string }): React.JSX.Element => {
  const [randomValue, setRandomValue] = useState(true);
  const [randomNumber, setRandomNumber] = useState(initialValue);

  useEffect(() => {
    const stringInterval = setInterval(() => {
      setRandomNumber(randomGeneration());
    }, 50);

    const timer = setTimeout(() => {
      setRandomValue(false);
      clearInterval(stringInterval);
    }, 1500);

    return () => {
      clearInterval(stringInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Text bold style={styles.container_point_impair}>
      {randomValue ? randomNumber : initialValue.toString().substring(0, 3)}
    </Text>
  );
};

export default function AmbassadorStatsBlock({
  nextEvent,
  eventDone,
  formSend,
  level,
}: AmbassadorStatsBlockData): React.JSX.Element {
  const themeContext = useContext(ThemeContext);

  const pluralFunction = (value: number, name: string): string => (value > 1 ? `${name}s` : name);

  const blocEventDone = {
    key: 1,
    name: `${pluralFunction(eventDone || 0, "Evènement")}${pluralFunction(
      eventDone || 0,
      "\nréalisé"
    )}`,
    number: eventDone || 0,
    background: themeContext?.colors?.primary,
  };

  const blocNextEvent = {
    key: 2,
    name: `${pluralFunction(nextEvent || 0, "Evènement")}\nà venir`,
    number: nextEvent || 0,
    background: themeContext?.colors?.secondary,
  };

  const blocFormSend = {
    key: 3,
    name: `${pluralFunction(formSend || 0, "Formulaire")}${pluralFunction(
      formSend || 0,
      "\nenvoyé"
    )}`,
    number: formSend || 0,

    background: themeContext?.colors?.secondary,
  };

  const blocLevel = {
    key: 4,
    name: `${pluralFunction(level || 0, "Niveau\nAmbassador")}`,
    number: level || 0,
    background: themeContext?.colors?.primary,
  };

  const [data, setData] = useState<Category[]>([
    blocEventDone,
    blocNextEvent,
    blocFormSend,
    blocLevel,
  ]);

  useEffect(() => {
    const assocTable = [blocEventDone, blocNextEvent, blocFormSend, blocLevel];
    const updatedList = new Array(4).fill(null);
    assocTable.forEach((bloc) => {
      const toModify = data.find((d) => d.key === bloc.key);
      if (toModify != null) {
        const indexToModify = data.indexOf(toModify);
        updatedList[indexToModify] = bloc;
      }
    });
    setData(updatedList);
  }, [nextEvent, formSend, eventDone, level]);

  // THEME HANDLE
  const isDark = useColorScheme() === "dark";

  const renderItem = (item): React.JSX.Element => {
    return (
      <View
        style={[
          styles.container_impair,
          styles.shadowProp,
          { backgroundColor: item.background, shadowColor: isDark ? colors.white : colors.black },
        ]}
        key={item.key}
      >
        <RandomDisplay initialValue={item.number.toString()} />
        <Text bold style={styles.container_text_impair}>
          {item.name}
        </Text>
      </View>
    );
  };

  const onDragRelease = (draggedData: React.SetStateAction<Category[]>): void => {
    setData(draggedData);
  };

  const animatedValue = new Animated.Value(1); // Initialize animatedValue

  const onDragStart = () => {
    animatedValue.setValue(1);
    Animated.timing(animatedValue, {
      toValue: 1.2,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container_ambassador_info}>
      <DraggableGrid
        numColumns={2}
        renderItem={renderItem}
        data={data}
        onDragRelease={onDragRelease}
        onDragStart={onDragStart}
        dragStartAnimation={{
          transform: [{ scale: animatedValue }],
        }}
      />
    </View>
  );
}
