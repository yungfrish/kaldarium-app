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
              Home: "home",
            },
          },
          PlantsScreen: {
            screens: {
              Plants: "plants",
            },
          },
          PlaygroundScreen: {
            screens: {
              Playground: "playground",
            },
          },
          CalendarScreen: {
            screens: {
              Calendar: "calendar",
            },
          },
          StorybookScreen: {
            screens: {
              Storybook: "storybook",
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
