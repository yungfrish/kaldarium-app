// button.tsx
import React from "react";
import { cva, cx, type VariantProps } from "cva";
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

export interface TypographyProps extends VariantProps<typeof typographyStyles> {
  text?: string;
  color?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  size = "copy",
  text,
  color = "text-green-medium",
}) => <Text className={cx(typographyStyles({ size }), color)}>{text}</Text>;
