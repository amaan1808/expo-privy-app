import { router, useRootNavigationState } from "expo-router";

import React, { useEffect } from "react";
import { usePersistentStore } from "@store";
import * as Linking from "expo-linking";
import { usePrivy } from "@privy-io/expo";
import { privy } from "./_layout";

export default function Index() {
  const url = Linking.useURL();
  const { isReady } = usePrivy();
  const rootNavigationState = useRootNavigationState();
  const { accessToken, setAccessToken } = usePersistentStore();
  const checkRoute = async () => {
    const accessTokenPrivy = await privy.getAccessToken();
    console.log(accessTokenPrivy, "accessTokenPrivy");
    if (isReady && accessTokenPrivy) {
      setAccessToken(accessTokenPrivy || "");
      console.log("User logged in");
      router.replace("/login/enableNotification");
    } else {
      router.replace("/login");
      // router.replace("/(tabs)/home");
    }
  };

  useEffect(() => {
    if (rootNavigationState?.key && isReady) {
      checkRoute();
    }
  }, [accessToken, rootNavigationState?.key, isReady]);

  return <></>;
}
