// button.tsx
import React from "react";
import { cva, cx } from "cva";
import { Text } from "react-native";

const typographyStyles = cva("flex text-base font-normal tracking-wide", {
  variants: {
    size: {
      copy: ["lh"],
      button: ["font-bold"],
      h1: ["w-full"],
      h2: ["w-full"],
      h3: ["w-full"],
    },
  },
  defaultVariants: {
    size: "copy",
  },
});

export const Typography = ({
  size = "copy",
  text,
  color = "text-green-medium",
}) => <Text className={cx(typographyStyles({ size }), color)}>{text}</Text>;
