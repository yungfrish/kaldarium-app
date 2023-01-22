// button.tsx
import { cva, cx } from "cva";
import React from "react";
import { Text } from "react-native";

const typographyStyles = cva("flex text-base font-normal tracking-wide", {
  variants: {
    size: {
      copy: ["font-fraunces", "text-[16px]", "leading-[24px]", "tracking-wide"],
      button: [
        "font-skModernist",
        "text-[16px]",
        "leading-[36px]",
        "tracking-normal",
      ],
      h1: [
        "font-skModernist",
        "text-[32px]",
        "leading-[32px]",
        "tracking-normal",
      ],
      h2: [
        "font-frauncesSemi",
        "text-[24px]",
        "leading-[32px]",
        "tracking-normal",
      ],
      h3: [
        "font-skModernist",
        "text-[20px]",
        "leading-[28px]",
        "tracking-wide",
      ],
      h4: [
        "font-skModernist",
        "text-[16px]",
        "leading-[22px]",
        "tracking-wider",
      ],
      label: [
        "font-skModernist",
        "text-[10px]",
        "leading-[12px]",
        "tracking-widest",
        "uppercase",
      ],
    },
  },
  defaultVariants: {
    size: "copy",
  },
});

export const Typography = ({
  size = "copy",
  children,
  color = "text-green-medium",
}) => <Text className={cx(typographyStyles({ size }), color)}>{children}</Text>;
