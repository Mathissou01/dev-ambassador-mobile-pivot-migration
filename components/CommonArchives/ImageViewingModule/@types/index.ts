import { type ImageURISource, type ImageRequireSource } from "react-native";

export interface Dimensions {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export type ImageSource = ImageURISource | ImageRequireSource;
