import { getStorybookUI, configure } from "@storybook/react-native";

import "./rn-addons";

// import stories
configure(() => {
  require("../components/stories");
}, module);

const StorybookUIRoot = getStorybookUI({
  asyncStorage: null,
});

export default StorybookUIRoot;
