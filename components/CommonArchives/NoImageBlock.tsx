import { Text, View } from "../Themed";
import React from "react";
import styles from "./NoImageBlockStyle";

export default function NoImageBlock() {
  return (
    <View style={styles.noEventContainer}>
      <Text style={styles.noEventLabel}>
        Aucune image n&apos;a été envoyé lors de l&apos;évènement.
      </Text>
    </View>
  );
}
