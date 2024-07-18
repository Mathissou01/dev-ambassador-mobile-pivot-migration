import React, { useContext } from "react";
import { View } from "@components/Themed";
import { ThemeContext } from "@hooks/useColorScheme";
import styles from "./ProgressBarStyle";

type ProgressBarProps = { userStories: Story[]; progresses: number[] | null };

export const ProgressBar: React.FC<ProgressBarProps> = ({ userStories, progresses }) => {
  const themeContext = useContext(ThemeContext);
  return (
    <View style={styles.progressContainer}>
      {userStories.map((_, index) => (
        <View
          key={index}
          style={[
            styles.progressBarContainer,
            {
              width:
                (userStories.length > 0 ? (userStories.length - 1) / userStories.length : 1) * 100 +
                "%",
            },
          ]}
        >
          <View
            style={[
              styles.progressBar,
              {
                width: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: 5,
              },
            ]}
          >
            <View
              style={{
                width: `${progresses != null ? progresses[index] * 100 : 0}%`,
                height: "100%",
                backgroundColor: `${themeContext?.colors?.primaryLight}`,
                borderRadius: 5,
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
};
