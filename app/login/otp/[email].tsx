import { router, useLocalSearchParams } from "expo-router";
import { Button, XStack, YStack } from "tamagui";

import React, { useEffect, useState } from "react";

import RabbitText from "@/components/RabbitText";

import OTPTextInput from "react-native-otp-textinput";
import useColors from "@hooks/useColors";
import Toast from "react-native-toast-message";
import { usePersistentStore } from "@store";
import RabbitBackButton from "@components/RabbitBackButton";
import RabbitButton from "@components/RabbitButton";
import { useLoginWithEmail } from "@privy-io/expo";
import { privy } from "@app/_layout";
import { usePrivy } from "@privy-io/expo";
import * as SecureStore from "expo-secure-store";

export default function OTP() {
  const [otp, setOtp] = useState("");
  const [invalidOtp, setInvalidOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAccessToken } = usePersistentStore();
  const { colors } = useColors();

  const { getAccessToken } = usePrivy();
  const updateTokens = async () => {
    try {
      console.log("updateTokens called");
      console.log(await SecureStore.getItemAsync("privy-token"), "privy-token");
      const accessToken = await getAccessToken();
      console.log(accessToken, "accessToken");
      setAccessToken(accessToken || "");

      if (accessToken) {
        router.navigate("/login/enableNotification");
      }
    } catch (error) {
      console.error("Error updating tokens:", error);
    }
  };

  const { loginWithCode, sendCode } = useLoginWithEmail({
    onError(error) {
      console.log(error, "error on loginWithCode");
      // show a toast, update form errors, etc...
    },
    onLoginSuccess() {
      console.log("onLoginSuccess called");
      updateTokens();
    },
  });
  const [timer, setTimer] = useState(60); // Start with 60 seconds
  const [isResendVisible, setIsResendVisible] = useState(false);
  const { email } = useLocalSearchParams();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendVisible(true);
      if (interval !== null) {
        clearInterval(interval);
      }
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [timer]);

  const verifyOtp = async (otp: string) => {
    if (otp.length === 6) {
      try {
        setLoading(true);
        console.log(email, otp, "email inside verify otp");
        loginWithCode({ email: email as string, code: otp });
        console.log("loginWithCode called");
      } catch (error) {
        console.log(error, "error on loginWithCode");
        setInvalidOtp(true);

        Toast.show({
          type: "error",
          text1: "Inavlid OTP",
          text2: "Please try again",
        });
        setLoading(false);
      }
    }
  };

  return (
    <YStack mt={"$10"} mx={"$4"} justifyContent="space-between" height={"100%"}>
      <YStack>
        <RabbitBackButton />
        <YStack my={"$8"}>
          <RabbitText weight={"semibold"} fontSize={32} color="white">
            Verification code
          </RabbitText>
          <RabbitText
            fontSize={16}
            mt={"$3"}
            color={colors.subText}
            lineHeight={"$5"}
          >
            Verification code sent to{" "}
          </RabbitText>
          <RabbitText
            fontSize={16}
            color={colors.subText}
            lineHeight={"$5"}
            mb={"$4"}
          >
            <RabbitText color={colors.subText} weight="semibold" fontSize={16}>
              {email}.
            </RabbitText>{" "}
            Enter it below to continue.
          </RabbitText>

          <OTPTextInput
            inputCount={6}
            textInputStyle={{
              borderWidth: 1,
              borderRadius: 18,
              height: 60,
            }}
            handleTextChange={async (text) => {
              if (text.length < 6) {
                setInvalidOtp(false);
              }
              setOtp(text);
              await verifyOtp(text);
            }}
            tintColor={invalidOtp ? colors.sell : colors.green}
            offTintColor={invalidOtp ? colors.sell : colors.inputBackground}
            color={colors.white}
            autoFocus
            backgroundColor={colors.inputBackground}
            keyboardType="number-pad"
            containerStyle={{
              marginLeft: -6,
            }}
          />
          <XStack mt="$4" justifyContent="space-between">
            <Button
              unstyled
              disabled={!isResendVisible}
              disabledStyle={{ opacity: 0.6 }}
              onPress={async () => {
                setTimer(60); // Reset the timer to 60 seconds
                setIsResendVisible(false);
                await sendCode({ email });
              }}
            >
              <RabbitText
                weight="medium"
                color={colors.green}
                fontSize="$5"
                opacity={isResendVisible ? 1 : 0.4}
              >
                Resend OTP
              </RabbitText>
            </Button>
            <RabbitText
              weight="medium"
              color={colors.placeHolder}
              fontSize="$4"
              mr="$2"
            >
              {timer}s
            </RabbitText>
          </XStack>
        </YStack>
      </YStack>
      <YStack mb={"$12"} width={"100%"} alignItems="center" alignSelf="center">
        <RabbitButton
          isLoading={loading}
          disabledStyle={{ opacity: 0.4 }}
          disabled={otp.length < 6}
          onPress={async () => {
            await verifyOtp(otp);
          }}
        >
          Verify
        </RabbitButton>
      </YStack>
    </YStack>
  );
}
