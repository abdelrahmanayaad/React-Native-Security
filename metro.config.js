const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const jsoMetroPlugin = require("obfuscator-io-metro-plugin")(
  {
    compact: false,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    stringArrayShuffle: true,
    splitStrings: true,
    stringArrayThreshold: 1,
  },
  {
    runInDev: false,
    logObfuscatedFiles: false,
  }
);

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  ...jsoMetroPlugin,
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
