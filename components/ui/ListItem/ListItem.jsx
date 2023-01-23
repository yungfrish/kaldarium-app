// list-item.tsx
import { Tag } from "@ui/Tag/Tag";
import { Typography } from "@ui/Typography/Typography";
import { cva } from "cva";
import React from "react";
import { View, TouchableOpacity } from "react-native";

const itemStyles = cva(
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

export const ListItem = ({
  navigation,
  intent,
  textTitle,
  textDesc,
  link = "",
  isBio = false,
}) => {
  const textColor = "text-green-medium";

  if (intent === "default") {
  }

  if (intent === "event") {
  }

  if (intent === "info") {
  }

  return (
    <View className={itemStyles({ intent })}>
      {link !== "" ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("Plants")}
          className="flex items-center w-full"
        >
          <View className="flex flex-row items-center justify-start space-x-2 w-full">
            <Typography size="h3" color={textColor}>
              {textTitle}
            </Typography>
            {isBio && <Tag intent="info" text="Bio" />}
            <Tag />
          </View>
          <View className="w-full">
            <Typography size="copy" color={textColor}>
              {textDesc}
            </Typography>
          </View>
        </TouchableOpacity>
      ) : (
        <View className="flex items-center w-full">
          <View className="flex flex-row items-center justify-start space-x-2 w-full">
            <Typography size="h3" color={textColor}>
              {textTitle}
            </Typography>
            {isBio && <Tag intent="info" text="Bio" />}
            <Tag />
          </View>
          <View className="w-full">
            <Typography size="copy" color={textColor}>
              {textDesc}
            </Typography>
          </View>
        </View>
      )}
    </View>
  );
};
