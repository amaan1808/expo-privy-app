import React from "react";
import { Button, Spinner } from "tamagui";
import RabbitText from "./RabbitText";
import * as Haptics from "expo-haptics";
import useColors from "@hooks/useColors";

const RabbitButton = ({
  children,
  isLoading = false,
  textProps,
  ...props
}: {
  children: React.ReactNode | string;
  isLoading?: boolean;
  textProps?: React.ComponentProps<typeof RabbitText>;
} & React.ComponentProps<typeof Button>) => {
  const { colors } = useColors();
  return (
    <Button
      borderRadius={"$16"}
      bg={isLoading ? colors.subText : colors.white}
      onPressIn={() => {
        Haptics.selectionAsync();
      }}
      pressStyle={{
        backgroundColor: colors.subText,
        transform: [{ scale: 0.95 }],
      }}
      textAlign="center"
      height={56}
      w="100%"
      {...props}
    >
      {isLoading ? (
        <Spinner size="small" color={colors.black} />
      ) : (
        <RabbitText
          fontSize={16}
          weight="medium"
          color={colors.black}
          {...textProps}
        >
          {children}
        </RabbitText>
      )}
    </Button>
  );
};

export default RabbitButton;
