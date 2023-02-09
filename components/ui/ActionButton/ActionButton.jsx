import React from "react";
import { Pressable } from "react-native";

export const ActionButton = ({ onPress, svg }) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex w-[56] h-[56] items-center justify-center border-green-light border-2 rounded-20"
    >
      {svg}
    </Pressable>
  );
};
