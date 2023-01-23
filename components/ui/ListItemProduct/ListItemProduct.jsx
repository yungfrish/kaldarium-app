// list-item-product.tsx
import { Tag } from "@ui/Tag/Tag";
import { Typography } from "@ui/Typography/Typography";
import { cva } from "cva";
import React from "react";
import { View, TouchableOpacity } from "react-native";

const itemStyles = cva(
  "flex flex-col items-left justify-center p-6 rounded-20 focus:outline-none border-2 border-yellow-light-300 h-auto",
  {
    variants: {
      size: {
        auto: ["w-auto"],
        full: ["w-full"],
      },
    },
  }
);

export const ListItemProduct = ({
  navigation,
  textTitle,
  textDesc,
  link = "",
  isBio = false,
  ...props
}) => {
  const textColor = "text-green-medium";

  return (
    <View className={itemStyles({})} {...props}>
      {link !== "" ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("Plants")}
          className="flex items-left w-full"
        >
          <View className="flex flex-row items-center justify-start space-x-2 w-full">
            <Typography size="h3" color={textColor}>
              {textTitle}
            </Typography>
            {isBio && <Tag intent="bio" text="Bio" />}
          </View>
          <View className="w-full">
            <Typography size="copy" color={textColor}>
              {textDesc}
            </Typography>
          </View>
        </TouchableOpacity>
      ) : (
        <View className="flex items-left w-full">
          <View className="flex flex-row items-center justify-start space-x-2 w-full">
            <Typography size="h3" color={textColor}>
              {textTitle}
            </Typography>
            {isBio && <Tag intent="bio" text="Bio" />}
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
