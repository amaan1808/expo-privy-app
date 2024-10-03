import RabbitText from "@/components/RabbitText";
import React, { useState } from "react";
import { Input, YStack } from "tamagui";

import RabbitBackButton from "@components/RabbitBackButton";
import RabbitButton from "@components/RabbitButton";
import useColors from "@hooks/useColors";
import { validateEmail } from "@utils/utils";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { useLoginWithEmail, usePrivy } from "@privy-io/expo";

export default function Email() {
  const [email, setEmail] = useState("");
  const { colors } = useColors();
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const { sendCode } = useLoginWithEmail({
    onError(error) {
      console.log(error);
      // show a toast, update form errors, etc...
    },
  });

  const handleEmail = async () => {
    try {
      setLoading(true);
      const validEmail = validateEmail(email);
      if (!validEmail) {
        setInvalidEmail(true);
        Toast.show({
          type: "error",
          text1: "Invalid Email",
          text2: "Please enter a valid email",
        });
        return;
      }

      const res = await sendCode({ email });
      console.log(res, "3");
      // await client.auth.email.sendOTP(email).catch((err) => {
      //   throw new Error(err.code);
      // });

      router.navigate(`/login/otp/${email}` as any);
    } catch (error: any) {
      setInvalidEmail(true);
      if (error.message === "too_many_email_verification_attempts") {
        Toast.show({
          type: "error",
          text1: "Too many requests",
          text2: "Please try again later",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Invalid Email",
          text2: "Please enter a valid email",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <YStack mt={"$10"} mx={"$4"}>
      {/* <RabbitBackButton onPress={() => router.navigate("/(tabs)/home")} /> */}
      <YStack height={"100%"} justifyContent="space-between">
        <YStack my="$8">
          <RabbitText weight={"semibold"} fontSize={32} color={colors.white}>
            What’s your email?
          </RabbitText>
          <RabbitText fontSize={16} mt={"$2"} mb={"$4"} color={colors.subText}>
            We'll send a code to this email to verify your sign in
          </RabbitText>
          <Input
            autoCapitalize="none"
            keyboardType="email-address"
            autoFocus
            size={"$6"}
            mt={"$4"}
            placeholder="Enter your Email ID"
            backgroundColor={colors.inputBackground}
            color={colors.white}
            placeholderTextColor={colors.placeHolder}
            fontFamily={"Sora-medium"}
            onChangeText={(text) => setEmail(text)}
            fontSize={14}
            borderWidth={1}
            borderColor={colors.subtle}
            focusStyle={{
              borderColor: colors.subtle,
            }}
          />

          <RabbitText
            textAlign="center"
            mt={"$6"}
            w="75%"
            mx="auto"
            fontSize={12}
            lineHeight={"$4"}
            color={colors.placeHolder}
          >
            By continuing you’re agreeing to our{" "}
            <RabbitText
              fontSize={12}
              color={colors.subText}
              onPress={() => {
                router.push({
                  pathname: "/webView",
                  params: {
                    url: "https://getrabbit.app/privacy",
                  },
                });
              }}
            >
              Legal &amp; Privacy
            </RabbitText>{" "}
            and{" "}
            <RabbitText
              fontSize={12}
              color={colors.subText}
              onPress={() => {
                router.push({
                  pathname: "/webView",
                  params: {
                    url: "https://getrabbit.app/terms",
                  },
                });
              }}
            >
              Terms of Use
            </RabbitText>
          </RabbitText>
        </YStack>
        <YStack width={"100%"} alignItems="center" mb={"$12"}>
          <RabbitButton
            isLoading={loading}
            disabled={email.length < 3 || !email.includes("@")}
            disabledStyle={{ opacity: 0.4 }}
            onPress={() => {
              handleEmail();
            }}
          >
            Get Started
          </RabbitButton>
        </YStack>
      </YStack>
    </YStack>
  );
}
