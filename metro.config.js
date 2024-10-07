// // This replaces `const { getDefaultConfig } = require('expo/metro-config');`
// const { getSentryExpoConfig } = require('@sentry/react-native/metro');

// // This replaces `const config = getDefaultConfig(__dirname);`
// const config = getSentryExpoConfig(__dirname);

// module.exports = config;

const { getSentryExpoConfig } = require("@sentry/react-native/metro");
const { getDefaultConfig } = require("expo/metro-config");

// Get the Sentry configuration
const sentryConfig = getSentryExpoConfig(__dirname);

// Get the default Expo configuration
const expoConfig = getDefaultConfig(__dirname);

// Merge the configurations
const combinedConfig = {
  ...sentryConfig,
  ...expoConfig,
  transformer: {
    ...sentryConfig.transformer,
    ...expoConfig.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
  },
  resolver: {
    ...sentryConfig.resolver,
    ...expoConfig.resolver,
    assetExts: sentryConfig.resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sentryConfig.resolver.sourceExts, "svg"],
  },
};

// Export the combined configuration
module.exports = combinedConfig;
