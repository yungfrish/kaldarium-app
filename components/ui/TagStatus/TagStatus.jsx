import React from "react";
import { cva } from "cva";
import { View } from "react-native";
import { Typography } from "@ui/Typography/Typography";

const tagStyles = cva(
  "flex flex-row items-center justify-center pr-3 pl-1 rounded-full focus:outline-none h-7",
  {
    variants: {
      intent: {
        fine: ["bg-green"],
        warning: ["bg-yellow"],
        danger: ["bg-error"],
      },
      size: {
        auto: ["w-auto"],
        full: ["w-full"],
        small: ["h-5"],
      },
    },
    defaultVariants: {
      intent: "green",
    },
  }
);

export const TagStatus = ({ intent, text }) => {
  let emoji = "";

  switch (intent) {
    case "fine":
      emoji = "🌞";

      break;
    case "warning":
      emoji = "😯";

      break;
    case "danger":
      emoji = "😱";

      break;

    default:
      break;
  }

  return (
    <View className={tagStyles({ intent })}>
      <View className="pr-2">
        <Typography size="h3" color="text-yellow-light-100">
          {emoji}
        </Typography>
      </View>

      <Typography size="label" color="text-yellow-light-100">
        {text}
      </Typography>
    </View>
  );
};
