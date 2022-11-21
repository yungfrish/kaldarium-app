// button.tsx
import React from "react";
import { cva, type VariantProps } from "cva";
import { Pressable, Text, View, PressableProps } from "react-native";
import { SvgProps } from "react-native-svg";
import { Typography } from "@ui/Typography";

// ⚠️ Disclaimer: Use of Tailwind CSS is optional
export const buttonStyles = cva(
  "flex flex-row items-center justify-center mb-8 rounded-[20px] focus:outline-none h-14",
  {
    variants: {
      intent: {
        primary: ["bg-yellow", "active:bg-yellow-dark"],
        secondaryLight: [
          "bg-yellow-500",
          "text-gray-800",
          "border-gray-400",
          "hover:bg-gray-100",
        ],
        secondaryDark: [
          "bg-yellow-500",
          "text-gray-800",
          "border-gray-400",
          "hover:bg-gray-100",
        ],
        tertiaryLight: [
          "bg-yellow-500",
          "text-gray-800",
          "border-gray-400",
          "hover:bg-gray-100",
        ],
        tertiaryDark: [
          "bg-purple-500",
          "text-gray-800",
          "border-gray-400",
          "hover:bg-gray-100",
        ],
      },
      size: {
        auto: ["w-auto"],
        full: ["w-full"],
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "full",
    },
  }
);

export interface Props
  extends PressableProps,
    VariantProps<typeof buttonStyles> {
  text?: string;
  svg?: React.FC<SvgProps>;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({
  intent = "primary",
  size,
  ...props
}) => (
  <Pressable className={buttonStyles({ intent, size })} {...props}>
    {props.svg && (
      <View className={!props.text ? "px-4 py-4" : "pr-[10]"}>
        <props.svg />
      </View>
    )}
    {props.text && (
      <View className={props.disabled ? "opacity-30" : ""}>
        <Typography text={props.text} size="button" />
      </View>
    )}
  </Pressable>
);
