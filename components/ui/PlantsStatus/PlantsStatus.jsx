import React from "react";
import { View, Text } from "react-native";

export const PlantsStatus = ({ status }) => {
  const emoji = {
    good: "🌞",
    careful: "😯",
    danger: "😱",
    empty: "😶",
  };

  const color = {
    good: "bg-green",
    careful: "bg-yellow",
    danger: "bg-error",
    empty: "bg-gray",
  };

  return (
    <View
      className={
        "flex items-center justify-center w-14 h-14 rounded-20 " + color[status]
      }
      style={{
        shadowColor: "#165556",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.2,
        shadowRadius: 24,
      }}
    >
      <Text className=" text-[32px]">{emoji[status]}</Text>
    </View>
  );
};
