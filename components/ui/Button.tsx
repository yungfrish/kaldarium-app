// button.tsx
import React from "react";
import { cva, cx, type VariantProps } from "cva";
import { Pressable, View, PressableProps } from "react-native";
import { SvgProps } from "react-native-svg";
import { Typography } from "@ui/Typography";

export const buttonStyles = cva(
  "flex flex-row items-center justify-center px-4 rounded-[20px] focus:outline-none h-14",
  {
    variants: {
      intent: {
        primary: ["bg-yellow", "shadow-button-primary"],
        secondaryLight: [
          "bg-yellow-light-100/20",
          "border-2",
          "border-solid",
          "border-green-light",
        ],
        secondaryDark: [
          "bg-yellow-light-100/20",
          "border-2",
          "border-solid",
          "border-white/10",
        ],
        tertiary: ["bg-yellow-light-100", "shadow-button-primary"],
      },
      size: {
        auto: ["w-auto"],
        full: ["w-full"],
        small: ["h-11"],
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "full",
    },
  }
);

export interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonStyles> {
  text?: string;
  svg?: React.ReactElement;
  disabled?: boolean;
  textColor?: string;
}

export const Button: React.FC<ButtonProps> = ({
  intent = "primary",
  size,
  ...props
}) => {
  const { disabled, text, ...pressableProps } = props;
  let svgPadding = "";

  if (size === "small" && !text) {
    svgPadding = "px-0";
  }

  if (text) {
    svgPadding = "pr-[10]";
  }

  return (
    <Pressable className={buttonStyles({ intent, size })} {...props}>
      {({ pressed }: { pressed: boolean }) => (
        <>
          {props.svg && (
            <View
              className={`${
                disabled || pressed ? "opacity-30" : ""
              } ${svgPadding}`}
            >
              {props.svg}
            </View>
          )}
          {props.text && (
            <View className={`${disabled || pressed ? "opacity-30" : ""}`}>
              <Typography text={text} color={props.textColor} size="button" />
            </View>
          )}
        </>
      )}
    </Pressable>
  );
};
