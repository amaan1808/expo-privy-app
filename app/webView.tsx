import { useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";
import React, { useRef, useState } from "react";
import { View, YStack } from "tamagui";
import RabbitBackButton from "@components/RabbitBackButton";
import { ActivityIndicator } from "react-native";
import useColors from "@hooks/useColors";

export default function WebViewScreen() {
  const { url } = useLocalSearchParams();
  const { colors } = useColors();
  const [isLoading, setIsLoading] = useState(true);
  const webViewRef = useRef(null);

  const injectedJavaScript = `
    document.body.style.backgroundColor = '${colors.black}';
    document.body.style.color = '${colors.white}';
  `;

  return (
    <YStack
      flex={1}
      marginTop={"$10"}
      marginBottom={"$2"}
      backgroundColor={colors.black}
    >
      <View m={"$4"}>
        <RabbitBackButton />
      </View>
      {isLoading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.black,
          }}
        >
          <ActivityIndicator size="large" color={colors.white} />
        </View>
      )}
      <WebView
        ref={webViewRef}
        source={{ uri: url as string }}
        style={{ backgroundColor: colors.black, opacity: isLoading ? 0 : 1 }}
        containerStyle={{ backgroundColor: colors.black }}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        injectedJavaScript={injectedJavaScript}
        injectedJavaScriptBeforeContentLoaded={`
          document.body.style.backgroundColor = '${colors.black}';
        `}
      />
    </YStack>
  );
}
