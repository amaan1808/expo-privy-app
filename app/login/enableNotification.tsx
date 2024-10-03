import RabbitText from "@/components/RabbitText";
import { router, useNavigationContainerRef } from "expo-router";
import React, { useEffect } from "react";
import Rabbit from "@/assets/images/rabbit.png";
import { Image, View, YStack } from "tamagui";
import { Pressable } from "react-native";
import useColors from "@hooks/useColors";
import RabbitButton from "@components/RabbitButton";
import { StackActions } from "@react-navigation/native";
import {
  isNotCreated,
  useEmbeddedSolanaWallet,
  useEmbeddedWallet,
  usePrivy,
} from "@privy-io/expo";
import { privy } from "@app/_layout";

export default function EnableNotification() {
  const { colors } = useColors();
  const rootNavigation = useNavigationContainerRef();
  const wallet = useEmbeddedSolanaWallet();
  const walletEth = useEmbeddedWallet();
  const { isReady, logout } = usePrivy();

  const createWallets = async () => {
    if (isNotCreated(walletEth)) {
      try {
        await walletEth.create({ recoveryMethod: "privy" });
        await wallet?.create?.();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const callHere = async () => {
    const accessToken = await privy.getAccessToken();
    console.log(accessToken, "accessToken");
  };

  useEffect(() => {
    if (isReady) {
      createWallets();
    }
    callHere();
  }, [isReady]);

  return (
    <View
      flexDirection="column"
      height={"100%"}
      justifyContent="space-around"
      mx={"$5"}
    >
      <YStack mt={"$10"}>
        <RabbitText weight={"semibold"} fontSize={32} color={colors.white}>
          Don’t miss a beat
        </RabbitText>
        <RabbitText
          fontSize={16}
          color={colors.subText}
          lineHeight={"$5"}
          mt={"$2"}
        >
          Stay updated on spending, security, wealth, market trends, and
          exclusive deals
        </RabbitText>
      </YStack>
      <Image
        source={Rabbit}
        mt="$10"
        alignSelf="center"
        width={"$20"}
        height={"$20"}
      />
      <YStack width={"95%"} alignItems="center" alignSelf="center" mb={"$6"}>
        <RabbitButton
          mb="$4"
          onPress={() => {
            console.log("Enable Push Notifications called");
            rootNavigation.dispatch(StackActions.popToTop());
          }}
        >
          Enable Push Notifications
        </RabbitButton>
        <Pressable
          onPress={async () => {
            console.log("Logout called");
            await logout();
            router.replace("/login");
          }}
        >
          <RabbitText weight={"semibold"} fontSize={16} color={colors.white}>
            Logout
          </RabbitText>
        </Pressable>
      </YStack>
    </View>
  );
}
