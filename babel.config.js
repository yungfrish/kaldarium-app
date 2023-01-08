module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@ui": "./components/ui",
            "@svg": "./assets/svg",
            "@storage": "./helper/AsyncStorage",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx", ".svg"],
        },
      ],
      ["nativewind/babel"],
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
