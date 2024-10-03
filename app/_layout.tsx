import React, { useEffect } from "react";
import { SplashScreen, Stack, useNavigationContainerRef } from "expo-router";

import { createTamagui, TamaguiProvider } from "tamagui";
import { config } from "@tamagui/config/v3";

import * as Sentry from "@sentry/react-native";
import { isRunningInExpoGo } from "expo";

import { createPrivyClient, PrivyProvider, usePrivy } from "@privy-io/expo";
import NetInfo from "@react-native-community/netinfo";

import { useFonts } from "expo-font";

import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

import useColors from "@hooks/useColors";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { base, baseSepolia, mainnet } from "viem/chains";
global.Buffer = require("buffer").Buffer;

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const tamaguiConfig = createTamagui({
  ...config,
});

// TypeScript types across all Tamagui APIs
type Conf = typeof tamaguiConfig;
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

export const privy = createPrivyClient({
  appId: "cm1f11s7a031z11l7x40nhoxl",
  clientId: "client-WY5bpZWgieM1voADY1J88o4jTzhwp8ipspAA3GXL3nb3t",
  supportedChains: [base, mainnet, baseSepolia],
});

Sentry.init({
  dsn: "https://25585cdb65b40ee07736cb4d15d37476@o4507691013570560.ingest.us.sentry.io/4507843385556992",
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  integrations: [
    new Sentry.ReactNativeTracing({
      // Pass instrumentation to be used as `routingInstrumentation`
      routingInstrumentation,
      enableNativeFramesTracking: !isRunningInExpoGo(),
      // ...
    }),
  ],
});

function RootLayout() {
  // Capture the NavigationContainer ref and register it with the instrumentation.
  const ref = useNavigationContainerRef();
  const { colors } = useColors();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        Toast.show({
          type: "error",
          text1: "No Internet Connection",
          text2: "You are offline!",
        });
      }
      // else {
      //   Toast.show({
      //     type: "success",
      //     text1: "Back Online",
      //     text2: "You are now connected to the internet.",
      //   });
      // }
    });

    return () => unsubscribe();
  }, []);

  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props: any) => <BaseToast {...props} />,
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props: any) => (
      <ErrorToast
        {...props}
        text1Style={{
          color: colors.white,
        }}
        text2Style={{
          color: colors.white,
        }}
        style={{
          backgroundColor: colors.black,
          borderLeftColor: colors.sell,
        }}
      />
    ),
  };

  useFonts({
    "Sora-regular": require("@/assets/fonts/Sora-Regular.ttf"),
    "Sora-bold": require("@/assets/fonts/Sora-Bold.ttf"),
    "Sora-semibold": require("@/assets/fonts/Sora-SemiBold.ttf"),
    "Sora-light": require("@/assets/fonts/Sora-Light.ttf"),
    "Sora-medium": require("@/assets/fonts/Sora-Medium.ttf"),
    "Sora-extraBold": require("@/assets/fonts/Sora-ExtraBold.ttf"),
  });

  useEffect(() => {
    // console.log(isReady, "isReady");

    SplashScreen.hideAsync();
  }, []);

  React.useEffect(() => {
    if (ref) {
      routingInstrumentation.registerNavigationContainer(ref);
    }
  }, [ref]);

  return (
    <PrivyProvider
      appId={"cm1f11s7a031z11l7x40nhoxl"}
      clientId={"client-WY5bpZWgieM1voADY1J88o4jTzhwp8ipspAA3GXL3nb3t"}
      supportedChains={[base, mainnet, baseSepolia]}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
          <Stack
            screenOptions={{
              headerShown: false,
              headerTitle: "",
              headerStyle: {
                backgroundColor: colors.black,
              },

              contentStyle: {
                backgroundColor: colors.black,
              },
            }}
          >
            <Stack.Screen name="index" />

            <Stack.Screen
              name="login/index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="login/email" />
            <Stack.Screen name="login/otp/[email]" />
            <Stack.Screen name="login/enableNotification" />
          </Stack>

          <Toast config={toastConfig} />
        </TamaguiProvider>
      </GestureHandlerRootView>
    </PrivyProvider>
  );
}

// Wrap the Root Layout route component with `Sentry.wrap` to capture gesture info and profiling data.
export default Sentry.wrap(RootLayout);
