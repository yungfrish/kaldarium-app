// list-item-event.tsx
import ChevronForward from "@svg/chevron_forward.svg";
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

export const ListItemEvent = ({
  navigation,
  title,
  text,
  link = "",
  hasTags = false,
  ...props
}) => {
  const textColor = "text-green-medium";

  return (
    <View className={itemStyles({})} {...props}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Plants")}
        className="flex flex-row items-center justify-start w-full space-x-2"
      >
        <View className="flex flex-col items-start justify-start space-y-2 grow">
          {/* Rework Max Width Percentage */}
          <View className="max-w-[90%]">
            <Typography size="h3" color={textColor}>
              {title}
            </Typography>
          </View>
          {hasTags && (
            <View className="flex flex-row items-center justify-start space-x-2 w-full">
              <Tag intent="karotte" text="Karotte" />
              <Tag intent="gurke" text="Gurke" />
            </View>
          )}
        </View>
        <Typography size="label" color={textColor}>
          Jan
        </Typography>
        <ChevronForward color="yellow-dark" />
      </TouchableOpacity>
    </View>
  );
};
