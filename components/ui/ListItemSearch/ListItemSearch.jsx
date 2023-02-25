// list-item-event.tsx
import ChevronForward from "@svg/chevron_forward.svg";
import { Typography } from "@ui/Typography/Typography";
import React from "react";
import { View, TouchableOpacity } from "react-native";

export const ListItemSearch = ({ title, onPress }) => {
  return (
    <View className="flex flex-col items-left justify-center p-6 rounded-20 focus:outline-none border-2 border-yellow-light-300 h-auto">
      <TouchableOpacity
        onPress={() => onPress(title)}
        className="flex flex-row items-center justify-start w-full space-x-2"
      >
        <View className="flex flex-col items-start justify-start space-y-2 grow">
          <View>
            <Typography size="h3">{title}</Typography>
          </View>
        </View>
        <ChevronForward color="yellow-dark" />
      </TouchableOpacity>
    </View>
  );
};
