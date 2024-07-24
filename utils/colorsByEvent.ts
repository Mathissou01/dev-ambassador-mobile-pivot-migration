// Need the name of the event, and the themeContext of the user
import { type ThemeContextType } from "@/hooks/useColorScheme";
import { colors } from "@/config/styles/01-settings/_colors";

export const getColorForEvent = (
  eventName: string,
  colorTheme?: ThemeContextType
): string => {
  const mainColor = colorTheme?.colors.primary;
  const secondColor = colorTheme?.colors.primarySemiLight;
  const thirdColor = colorTheme?.colors.secondary;
  const fourthColor = colorTheme?.colors.secondarySemiLight;

  if (eventName.toLowerCase().includes("porte ouverte")) {
    return mainColor ?? colors.secondaryColor;
  } else if (eventName.toLowerCase().includes("salon")) {
    return secondColor ?? colors.secondaryColor;
  } else if (eventName.toLowerCase().includes("forum")) {
    return thirdColor ?? colors.secondaryColor;
  } else if (eventName.toLowerCase().includes("soirée")) {
    return fourthColor ?? colors.secondaryColor;
  }
  // Par défaut, retournez le bleu NEXTU
  return colors.secondaryColor;
};
