import RabbitText from "@/components/RabbitText";
import RabbitButton from "@components/RabbitButton";
import useColors from "@hooks/useColors";
import { router } from "expo-router";
import React, { useRef } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { Button, View, YStack } from "tamagui";
import { Dimensions, ImageBackground, StyleSheet } from "react-native";
import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";

import IntroBg from "@/assets/images/intro-bg.jpg";

export default function Login() {
  const { colors } = useColors();
  const sliderRef = useRef<AppIntroSlider>(null);
  const video = React.useRef(null);
  const windowHeight = Dimensions.get("window").height;

  const slides = [
    {
      key: 1,
      title: "Crypto for everyone",
      text: "",
    },
    {
      key: 2,
      title: "Buy, trade crypto from $1",
      text: "Buy, trade, hold over 10,000 crypto / meme coins with as little as $1",
    },
    {
      key: 3,
      title: "Instant deposit & withdrawal",
      text: "Instant money made available upto $10,000",
    },
    {
      key: 4,
      title: "Make new friends",
      text: "When you buy a coin you have ability to talk with all holders of the coin",
    },
  ];
  const renderItem = ({
    item,
  }: {
    item: {
      key: number;
      title: string;
      text: string;
    };
  }) => {
    switch (item.key) {
      case 1:
        return (
          <ImageBackground
            source={IntroBg}
            resizeMode="stretch"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <YStack mt={"$18"} h="100%">
              <RabbitText
                w="80%"
                mx="auto"
                fontSize={40}
                color="white"
                textAlign="center"
              >
                {item?.title}
              </RabbitText>
            </YStack>
          </ImageBackground>
        );
      case 2:
        return (
          <View h={"90%"} justifyContent="flex-end">
            <YStack mx={"$6"} mb={"$16"}>
              <Video
                ref={video}
                style={{
                  width: "100%",
                  height: windowHeight / 2,
                }}
                source={require("@assets/videos/coins.mp4")}
                useNativeControls={false} // Hide native controls
                resizeMode={ResizeMode.CONTAIN} // Adjust as needed (cover, contain, etc.)
                isLooping // Loop the video
                shouldPlay // Auto-play the video
              />
              <RabbitText fontSize={40} mb={"$4"}>
                {item.title}
              </RabbitText>
              <RabbitText fontSize={18} color={colors.subText}>
                {item.text}
              </RabbitText>
            </YStack>
          </View>
        );
      case 3:
        return (
          <View justifyContent="flex-end" h={"90%"}>
            <YStack mx={"$6"} mb={"$16"}>
              <Video
                ref={video}
                style={{
                  width: "100%",
                  height: windowHeight / 2,
                }}
                source={require("@assets/videos/atomic-loop.mp4")}
                useNativeControls={false} // Hide native controls
                resizeMode={ResizeMode.CONTAIN} // Adjust as needed (cover, contain, etc.)
                isLooping // Loop the video
                shouldPlay // Auto-play the video
              />
              <RabbitText fontSize={40} mb={"$4"}>
                {item.title}
              </RabbitText>
              <RabbitText fontSize={18} color={colors.subText}>
                {item.text}
              </RabbitText>
            </YStack>
          </View>
        );
      case 4:
        return (
          <View justifyContent="flex-end" h={"90%"}>
            <Video
              ref={video}
              style={{
                width: "100%",
                height: windowHeight / 2,
              }}
              source={require("@assets/videos/spiral.mp4")}
              useNativeControls={false} // Hide native controls
              resizeMode={ResizeMode.CONTAIN} // Adjust as needed (cover, contain, etc.)
              isLooping // Loop the video
              shouldPlay // Auto-play the video
            />
            <YStack mx={"$6"} mb={"$16"}>
              <RabbitText fontSize={40} mb={"$4"}>
                {item.title}
              </RabbitText>
              <RabbitText fontSize={18} color={colors.subText}>
                {item.text}
              </RabbitText>
            </YStack>
          </View>
        );
    }
    return (
      <View justifyContent="flex-end" h={"90%"} mb={"$10"}>
        <YStack mx={"$4"} mb={"$14"}>
          <RabbitText fontSize={40} mb={"$4"}>
            {item.title}
          </RabbitText>
          <RabbitText fontSize={18} color={colors.subText}>
            {item.text}
          </RabbitText>
        </YStack>
      </View>
    );
  };

  const onDone = () => {
    router.navigate("/login/email");
  };
  const onNext = () => {
    sliderRef.current?.goToSlide(
      (sliderRef.current?.state.activeIndex ?? 0) + 1
    );
  };

  return (
    // <ImageBackground
    //   source={IntroBg}
    //   resizeMode="stretch"
    //   style={{
    //     width: "100%",
    //   }}
    // >
    <AppIntroSlider
      ref={sliderRef}
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
      dotStyle={{ backgroundColor: colors.placeHolder, width: 6, height: 6 }}
      activeDotStyle={{ backgroundColor: colors.white, width: 6, height: 6 }}
      bottomButton={true}
      renderNextButton={() => {
        return (
          <RabbitButton onPress={onNext} my="$4">
            Next
          </RabbitButton>
        );
      }}
      // renderNextButton={() => {
      //   return null;
      // }}
      renderDoneButton={() => {
        return (
          <RabbitButton onPress={onDone} my="$4">
            Done
          </RabbitButton>
        );
      }}
    />
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
