// import { usePersistentStore } from "@store";
import { theme } from "@constants/constants";
import { useEffect } from "react";

const darkTheme = {
  black: "black",
  white: "white",
  black2: "#0c0d0f",
  green: "#8FFF00",
  blue: "#3300FF",
  subtle: "#1F2126",
  subText: "#B2B2B2",
  inputBackground: "#16171B",
  border: "#1F2126B2",
  placeHolder: "#5C5D5F",
  price: "#00FFF0",
  sell: "#FF4C33",
  gift: "#C0F9FF",
  bgButton: "#F5F5F5",
  grey: "#737476",
  white_a70: "rgba(255, 255, 255, 0.7)",
  white__a08: "rgba(255, 255, 255, 0.08)",
  white__a12: "rgba(255, 255, 255, 0.12)",
  white__a3: "rgba(255, 255, 255, 0.32)",
};
const lightTheme = {
  black: "black",
  white: "white",
  black2: "#0c0d0f",
  green: "#8FFF00",
  blue: "#3300FF",
  subtle: "#1F2126",
  subText: "#B2B2B2",
  inputBackground: "#16171B",
  border: "#1F2126B2",
  placeHolder: "#5C5D5F",
  price: "#00FFF0",
  sell: "#FF4C33",
  gift: "#C0F9FF",
  bgButton: "#F5F5F5",
  grey: "#737476",
  white_a70: "rgba(255, 255, 255, 0.7)",
  white__a08: "rgba(255, 255, 255, 0.08)",
  white__a12: "rgba(255, 255, 255, 0.12)",
  white__a3: "rgba(255, 255, 255, 0.32)",
};

export default function useColors() {
  //   const { currentTheme } = usePersistentStore();
  const currentTheme = theme?.dark;

  let colors = darkTheme;
  useEffect(() => {
    if (currentTheme === theme?.light) {
      colors = lightTheme;
    } else {
      colors = darkTheme;
    }
  }, [currentTheme]);

  return {
    colors,
  };
}
