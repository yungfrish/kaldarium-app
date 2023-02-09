import { Typography } from "@ui/Typography/Typography";
import React from "react";
import { View } from "react-native";

export const WeekHead = ({ week, activeWeekNumber }) => {
  return (
    <View
      key={week}
      style={{
        width: 87,
        height: "100%",
      }}
      className={`border-r-2 border-r-yellow-light-200 ${
        activeWeekNumber === week ? "bg-yellow-light-200/[0.32]" : ""
      } items-center justify-start pt-2`}
    >
      <View
        style={{
          borderRadius: 8,
          backgroundColor: activeWeekNumber === week ? "#FFC5D3" : "",
          paddingTop: 4,
          paddingBottom: 4,
          height: 20,
          paddingLeft: 12,
          paddingRight: 12,
          lineHeight: 20,
        }}
      >
        <Typography size="label">KW {week}</Typography>
      </View>
    </View>
  );
};
