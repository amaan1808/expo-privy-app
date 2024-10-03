import { ResizeMode, Video } from "expo-av";
import React, { useRef } from "react";
import { Dimensions } from "react-native";
import { Button, ScrollView, XStack, YStack } from "tamagui";
import { Cross, WarningTriangle, ProfileFilled } from "@assets/svg";
import { router } from "expo-router";
import RabbitText from "@components/RabbitText";
import useColors from "@hooks/useColors";
import RabbitButton from "@components/RabbitButton";

export default function Acknowledge() {
  const video = useRef(null);
  const { colors } = useColors();
  return (
    <ScrollView>
      <YStack mt={"$10"} mx={"$4"}>
        <Button
          unstyled
          onPress={() => {
            router.back();
          }}
        >
          <Cross />
        </Button>

        <YStack>
          <Video
            ref={video}
            style={{
              width: "100%",
              height: Dimensions.get("screen").height / 3,
            }}
            source={require("@assets/videos/acknowledge.mp4")}
            useNativeControls={false} // Hide native controls
            resizeMode={ResizeMode.CONTAIN} // Adjust as needed (cover, contain, etc.)
            isLooping // Loop the video
            shouldPlay // Auto-play the video
          />
          <RabbitText fontSize={32} weight="semibold">
            Protect your crypto from scammers
          </RabbitText>

          <XStack alignItems="center" mt={"$4"}>
            <WarningTriangle />
            <YStack ml={"$4"}>
              <RabbitText>We’ll never ask you to transfer crypto.</RabbitText>
              <RabbitText color={colors.subText} mt={"$2"}>
                Rabbit will never request crypto transfers
              </RabbitText>
            </YStack>
          </XStack>
          <XStack alignItems="center" mt={"$4"}>
            <WarningTriangle />
            <YStack ml={"$4"}>
              <RabbitText>Transfers are final.</RabbitText>
              <RabbitText color={colors.subText} mt={"$2"}>
                We can't reverse or reimburse authorized transfers.
              </RabbitText>
            </YStack>
          </XStack>
          <XStack alignItems="center" mt={"$4"}>
            <ProfileFilled />
            <YStack ml={"$4"}>
              <RabbitText>Crypto scams are common</RabbitText>
              <RabbitText color={colors.subText} mt={"$2"}>
                Only send crypto to trusted people. Scams are frequent.
              </RabbitText>
            </YStack>
          </XStack>
          <RabbitText fontSize={10} textAlign="center" mx={"$4"} mt={"$10"}>
            If someone you don't fully trust asks you to transfer crypto, it's
            best not to proceed.
          </RabbitText>
          <RabbitButton mt={"$2"}>I acknowledge</RabbitButton>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
//
