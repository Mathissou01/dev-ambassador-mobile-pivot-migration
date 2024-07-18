import React, { useContext } from "react";
import { Text, View } from "@/components/Themed";
import { type User } from "@/hooks/API/ObjectTypes/User";
import { ThemeContext } from "@/hooks/useColorScheme";
import { colors } from "@/config/styles/01-settings/_colors";
import { ClipboardIcon, ClockIcon, RibbonAwardIcon } from "@/components/IconComponent";
import Sofa from "@/components/SvgIllustration/Sofa";
import Door from "@/components/SvgIllustration/Door";
import Party from "@/components/SvgIllustration/Party";
import Forum from "@/components/SvgIllustration/Forum";
import Event from "@/components/SvgIllustration/Event";
import AvatarEventLister from "@/components/CommonArchives/AvatarListRenderer/AvatarEventLister";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./ActualEventBlockStyle";

interface ActualEventBlockProps {
  eventForms?: string;
  eventName?: string;
  color?: string;
  eventDate?: string;
  eventTime?: string;
  creditWon?: string;
  eventAmbassadors: User[];
  onPress?: (url: string, index: number, event: any) => void;
}

const ActualEventBlock: React.FC<ActualEventBlockProps> = ({
  eventForms,
  eventName,
  eventDate,
  eventAmbassadors,
  eventTime,
  creditWon,
}) => {
  const themeColor = useContext(ThemeContext);
  // Fonction pour choisir l'icône en fonction du type d'événement
  const chooseIcon = (eventName: string | undefined) => {
    if (eventName?.toLowerCase().includes("salon")) {
      return <Sofa color={themeColor?.isDark === false ? "#585858" : "#ffff"} />;
    } else if (eventName?.toLowerCase().includes("porte")) {
      return <Door color={themeColor?.isDark === false ? "#585858" : "#ffff"} />;
    } else if (eventName?.toLowerCase().includes("soirée")) {
      return <Party color={themeColor?.isDark === false ? "#585858" : "#ffff"} />;
    } else if (eventName?.toLowerCase().includes("forum")) {
      return <Forum color={themeColor?.isDark === false ? "#585858" : "#ffff"} />;
    } else {
      return <Event color={themeColor?.isDark === false ? "#585858" : "#ffff"} />;
    }
  };

  return (
    <>
      <LinearGradient
        colors={[themeColor?.colors?.primary ?? "#fff", themeColor?.colors?.secondary ?? "#D5D5D5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.linearGradient}
      >
        <View style={[styles.container]}>
          <View style={{ backgroundColor: "transparent" }}>
            <View
              style={[
                styles.topRightCircle,
                {
                  backgroundColor:
                    themeColor?.isDark === false
                      ? themeColor?.colors?.secondary
                      : themeColor?.colors?.secondary,
                },
              ]}
            />
          </View>
          <AvatarEventLister users={eventAmbassadors} />
          <View style={[styles.mainContainer]}>
            <View style={[styles.insideContainer]}>
              <View style={[styles.textContainer]}>
                <View style={styles.leftTextContainer}>
                  <Text bold style={[styles.eventNameText]}>
                    {eventName}
                  </Text>
                </View>
                <View style={styles.rightTextContainer}>
                  <Text light style={[styles.eventDateText]}>
                    {eventDate}
                  </Text>
                </View>
              </View>
              <View style={styles.line} />
              <View style={styles.eventInfoContainer}>
                <View style={styles.eventInfoWrapper}>
                  <ClipboardIcon
                    size={24}
                    color={themeColor?.isDark ?? false ? colors.gray0 : colors.backgroundDark}
                  />
                  <Text light style={[styles.eventInfoText]}>
                    {eventForms ?? 0}
                  </Text>
                </View>
                <View style={styles.eventInfoWrapper}>
                  <RibbonAwardIcon
                    size={24}
                    color={themeColor?.isDark ?? false ? colors.gray0 : colors.backgroundDark}
                  />
                  <Text light style={[styles.eventInfoText]}>
                    {creditWon ?? 0}
                  </Text>
                </View>
                <View style={styles.eventInfoWrapper}>
                  <ClockIcon
                    size={24}
                    color={themeColor?.isDark ?? false ? colors.gray0 : colors.backgroundDark}
                  />
                  <Text light style={[styles.eventInfoText]}>
                    {eventTime}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "transparent",
              position: "absolute",
              zIndex: -1,
              height: 250,
              width: 250,
              opacity: themeColor?.isDark === false ? 0.15 : 0.4,
              left: "50%",
              transform: [{ translateX: -120 }, { translateY: 22 }, { rotate: "8deg" }],
            }}
          >
            {chooseIcon(eventName)}
          </View>
        </View>
      </LinearGradient>
    </>
  );
};
export default ActualEventBlock;
