import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const CONTENT_SPACING = 15;

export const SafeAreaPadding = () => {
  const insets = useSafeAreaInsets();

  return {
    paddingLeft: insets.left + CONTENT_SPACING,
    paddingTop: insets.top + CONTENT_SPACING,
    paddingRight: insets.right + CONTENT_SPACING,
    paddingBottom: insets.bottom + CONTENT_SPACING,
  };
};

// The maximum zoom _factor_ you should be able to zoom in
export const MAX_ZOOM_FACTOR = 10;

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;

// Capture Button
export const CAPTURE_BUTTON_SIZE = 78;

// Control Button like Flash
export const CONTROL_BUTTON_SIZE = 40;

// Example usage:q
// const styles = StyleSheet.create({
//   container: {
//     ...SafeAreaPadding(),
//   },
// });
