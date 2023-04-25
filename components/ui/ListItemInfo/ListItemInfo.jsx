// list-item-info.tsx
import Drop from "@svg/drop.svg";
import { Typography } from "@ui/Typography/Typography";
import React from "react";
import { View } from "react-native";

export const ListItemInfo = ({ item, ...props }) => {
  const { title, content } = item;
  const textColor = "text-green-medium";

  return (
    <View
      className="flex flex-col items-left justify-center p-6 rounded-20 focus:outline-none border-2 border-yellow-light-300 h-auto"
      {...props}
    >
      <View className="flex flex-row items-center justify-start w-full space-x-5">
        <View className="bg-yellow-light-200 rounded-12 w-10 h-10 items-center justify-center">
          <Drop />
        </View>
        <View className="flex flex-col items-start justify-start space-y-1">
          <Typography size="label" color="text-green-light">
            {title}
          </Typography>
          <Typography size="h4" color={textColor}>
            {content}
          </Typography>
        </View>
      </View>
    </View>
  );
};
