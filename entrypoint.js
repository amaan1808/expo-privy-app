// entrypoint.js

// Import required polyfills first
import "fast-text-encoding";
import "react-native-get-random-values";
import "@ethersproject/shims";
// Then import the expo router

const _atob = atob;

atob = (val) => {
  try {
    return _atob(val);
  } catch (e) {
    console.warn(e);
    return _atob(val + "=");
  }
};

import "expo-router/entry";
