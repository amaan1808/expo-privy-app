import useColors from "@hooks/useColors";
import React from "react";
import { Text } from "tamagui";

export default function RabbitText({
  weight = "regular",
  fontSize = 14,
  ...props
}: {
  weight?: "regular" | "medium" | "bold" | "light" | "semibold" | "extraBold";
} & React.ComponentProps<typeof Text> & { children: React.ReactNode }) {
  const { colors } = useColors();
  let fontFam = "Sora-regular";

  if (weight === "medium") {
    fontFam = "Sora-medium";
  } else if (weight === "bold") {
    fontFam = "Sora-bold";
  } else if (weight === "light") {
    fontFam = "Sora-light";
  } else if (weight === "semibold") {
    fontFam = "Sora-semibold";
  } else if (weight === "extraBold") {
    fontFam = "Sora-extraBold";
  } else {
    fontFam = "Sora-regular";
  }
  return (
    <Text
      fontFamily={fontFam}
      color={colors.white}
      fontSize={fontSize}
      {...props}
    >
      {props.children}
    </Text>
  );
}
