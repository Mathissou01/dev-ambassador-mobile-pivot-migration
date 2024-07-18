import React from "react";
import { Image, type ImageProps, type ImageSourcePropType } from "react-native";
import { useAppSelector } from "@/hooks/store";

interface AuthorizedImagesProps extends ImageProps {
  source: {
    uri: string;
    headers?: Record<string, string>;
  } & ImageSourcePropType;
}

export function AuthorizedImages({ source, ...props }: AuthorizedImagesProps): React.JSX.Element {
  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

  const accessToken = useAppSelector((state) => state.userInfos.accessToken);

  const customSource: ImageSourcePropType = { ...(source as object) };

  if (source?.uri?.includes(BASE_URL)) {
    customSource.headers = {
      Authorization: `Ambassador ${accessToken}`,
    };
  }

  if (accessToken != null)
    return (
      <Image
        source={customSource}
        {...props}
      ></Image>
    );
}
