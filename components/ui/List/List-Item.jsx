// list-item.tsx
import React from "react";
import { cva } from "cva";
import { View } from "react-native";
import { Typography } from "@ui/Typography/Typography";

export const itemStyles = cva(
  "flex flex-col items-left justify-center p-6 rounded-20 focus:outline-none border-2 border-yellow-light-300",
  {
    variants: {
      intent: {
        default: ["bg-yellow-light-100"],
        event: ["bg-yellow-light-100"],
        info: ["bg-yellow-light-100"],
      },
      size: {
        auto: ["w-auto"],
        full: ["w-full"],
        small: ["h-5"],
      },
    },
    defaultVariants: {
      intent: "default",
    },
  }
);

export const ListItem = ({ children, intent, ...props }) => {
  const { text } = props;
  let textColor = "text-green-medium";
  let title = "";
  let desc = "";

  if (intent == "default") {
    title = "Name goes here";
    desc = "Description goes here";
  }

  if (intent == "event") {
    title = "Name goes here";
    desc = "Description goes here";
  }

  if (intent == "info") {
    title = "Name goes here";
    desc = "Description goes here";
  }

  return (
    <View className={itemStyles({ intent })} {...props}>
      <Typography size="h3" color={textColor}>
        Title goes here
      </Typography>

      <Typography size="copy" color={textColor}>
        {desc}
      </Typography>
    </View>
  );
};
