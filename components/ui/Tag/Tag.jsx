// tag.tsx
import { Typography } from "@ui/Typography/Typography";
import { cva } from "cva";
import React from "react";
import { View } from "react-native";

const tagStyles = cva(
  "flex flex-row items-center justify-center px-3 rounded-full focus:outline-none h-6",
  {
    variants: {
      intent: {
        bio: ["bg-green/10"],
        gurke: ["bg-gurke"],
        karotte: ["bg-karotte"],
        kartoffel: ["bg-kartoffel"],
        tomate: ["bg-tomate"],
      },
      size: {
        auto: ["w-auto"],
        full: ["w-full"],
      },
      plantName: {},
    },
    defaultVariants: {
      intent: "bio",
    },
  }
);

export const Tag = ({ intent, plantName, ...props }) => {
  // const { text } = props;
  const textColor = "text-green-medium";
  let textLabel = "Bio";

  if (intent === "bio") {
    textLabel = "Bio";
  }

  if (intent === "gurke") {
    textLabel = "Gurke";
  }

  if (intent === "karotte") {
    textLabel = "Karotte";
  }

  if (intent === "kartoffel") {
    textLabel = "Kartoffel";
  }

  if (intent === "tomate") {
    textLabel = "Tomate";
  }

  return (
    <View className={tagStyles({ intent })} {...props}>
      <Typography size="label" color={textColor}>
        {textLabel}
      </Typography>
    </View>
  );
};
