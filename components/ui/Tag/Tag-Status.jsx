// tag.tsx
import React from "react";
import { cva } from "cva";
import { View } from "react-native";
import { Typography } from "@ui/Typography/Typography";

export const tagStyles = cva(
  "flex flex-row items-center justify-center pr-3 pl-1 rounded-full focus:outline-none h-7",
  {
    variants: {
      intent: {
        green: ["bg-green"],
        yellow: ["bg-yellow"],
        error: ["bg-error"],
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

export const TagStatus = ({ children, intent, ...props }) => {
  const { text } = props;
  let textColor = "text-yellow-light-100";
  let emoji = "";
  let textLabel = "";

  if (intent == "green") {
    emoji = "🌞";
    textLabel = "Alles gut";
  }

  if (intent == "yellow") {
    emoji = "😯";
    textLabel = "Achtung";
    textColor = "text-green-medium";
  }

  if (intent == "error") {
    emoji = "😱";
    textLabel = "Gefahr";
  }

  return (
    <View className={tagStyles({ intent })} {...props}>
      <View className="pr-2">
        <Typography size="h3" color="text-yellow-light-100">
          {emoji}
        </Typography>
      </View>

      <Typography size="label" color={textColor}>
        {textLabel}
      </Typography>
    </View>
  );
};
