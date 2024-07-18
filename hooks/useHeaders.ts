import { useAppSelector } from "./store";

export function useHeaders() {
  const accessToken = useAppSelector((state) => state.userInfos.accessToken);

  return {
    Authorization: `Ambassador ${accessToken}`,
  };
}
