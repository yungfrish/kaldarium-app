module.exports = function (api) {
  api.cache(false);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@ui": "./components/ui",
            "@svg": "./assets/svg",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx", ".svg"],
        },
      ],
      ["nativewind/babel"],
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: "./.env",
        },
      ],
    ],
  };
};
