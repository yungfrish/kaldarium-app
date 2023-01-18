// tag.tsx
import React from "react";
import { cva } from "cva";
import { View } from "react-native";
import { Typography } from "@ui/Typography/Typography";

export const tagStyles = cva(
  "flex flex-row items-center justify-center px-3 rounded-full focus:outline-none h-6",
  {
    variants: {
      intent: {
        plant: ["bg-tomate"],
        bio: ["bg-green/10"],
      },
      size: {
        auto: ["w-auto"],
        full: ["w-full"],
        small: ["h-5"],
      },
    },
    defaultVariants: {
      intent: "plant",
    },
  }
);

export const Tag = ({ children, intent }) => (
  <View className={tagStyles({ intent })}>{children}</View>
);
