// list-item.tsx
import React from "react";
import { cva } from "cva";
import { View } from "react-native";
import { Typography } from "@ui/Typography/Typography";
import { Tag } from "@ui/Tag/Tag";

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
  const { textTitle, textDesc } = props;
  let textColor = "text-green-medium";

  if (intent == "default") {
  }

  if (intent == "event") {
  }

  if (intent == "info") {
  }

  return (
    <View className={itemStyles({ intent })} {...props}>
      <View className="flex items-center w-full">
        <View className="flex flex-row items-center justify-start space-x-2 w-full">
          <Typography size="h3" color={textColor}>
            {textTitle}
          </Typography>
          <Tag></Tag>
        </View>
        <View className="w-full">
          <Typography size="copy" color={textColor}>
            {textDesc}
          </Typography>
        </View>
      </View>
    </View>
  );
};
