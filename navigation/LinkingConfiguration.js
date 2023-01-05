/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from "expo-linking";

const linking = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Root: {
        screens: {
          HomeScreen: {
            screens: {
              Home: "one",
            },
          },
          PlantsScreen: {
            screens: {
              Plants: "two",
            },
          },
          Storybook: {
            screens: {
              StorybookScreen: "storybook",
            },
          },
        },
      },
      Modal: "modal",
      NotFound: "*",
    },
  },
};

export default linking;
