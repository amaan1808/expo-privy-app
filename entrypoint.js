import "text-encoding-polyfill";
import "react-native-get-random-values";
import "@ethersproject/shims";
import "fast-text-encoding";

import { Buffer } from "buffer";
global.TextEncoder = require("text-encoding").TextEncoder;
global.Buffer = Buffer;

// Then import the expo router
import "expo-router/entry";
