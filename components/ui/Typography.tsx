// button.tsx
import React from "react";
import { cva, type VariantProps } from "cva";
import { Text } from "react-native";
import { SvgProps } from "react-native-svg";

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

export interface Props extends VariantProps<typeof typographyStyles> {
  text?: string;
}

export const Typography: React.FC<Props> = ({ size = "copy", text }) => (
  <Text className={typographyStyles({ size })}>{text}</Text>
);
