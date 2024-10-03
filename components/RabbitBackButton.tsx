import { router } from "expo-router";
import React from "react";
import { Button } from "tamagui";
import { Back } from "@assets/svg";

export default function RabbitBackButton({
  onPress,
  ...props
}: {
  onPress?: () => void;
} & React.ComponentProps<typeof Button>) {
  return (
    <Button
      unstyled
      w={"$4"}
      onPress={() => {
        if (onPress) {
          onPress();
        } else {
          if (router.canGoBack()) {
            router.back();
          }
        }
      }}
      {...props}
    >
      <Back width={18} height={18} />
    </Button>
  );
}
