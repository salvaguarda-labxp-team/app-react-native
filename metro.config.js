const { getDefaultConfig } = require("expo/metro-config");

module.exports = {
  ...getDefaultConfig(__dirname),
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    sourceExts: ["jsx", "js", "ts", "tsx", "cjs", "cjx", "json"],
  },
};
