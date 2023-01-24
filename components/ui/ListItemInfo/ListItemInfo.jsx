// list-item-info.tsx
import Drop from "@svg/drop.svg";
import Heart from "@svg/heart.svg";
import Home from "@svg/home.svg";
import Sun from "@svg/sun.svg";
import Thermometer from "@svg/thermometer.svg";
import Trophy from "@svg/trophy.svg";
import { Typography } from "@ui/Typography/Typography";
import { cva } from "cva";
import React from "react";
import { View } from "react-native";

const itemStyles = cva(
  "flex flex-col items-left justify-center p-6 rounded-20 focus:outline-none border-2 border-yellow-light-300 h-auto",
  {
    variants: {
      intent: {
        water: [],
        light: [],
        location: [],
        temperature: [],
        harvest: [],
        fertilizer: [],
      },
      size: {
        auto: ["w-auto"],
        full: ["w-full"],
      },
    },
  }
);

export const ListItemInfo = ({ intent, text, ...props }) => {
  const textColor = "text-green-medium";
  let label = "";

  switch (intent) {
    case "water":
      label = "Bewässerung";

      break;
    case "light":
      label = "Licht";

      break;
    case "location":
      label = "Ort";

      break;
    case "temperature":
      label = "Umgebungstemperatur";

      break;
    case "harvest":
      label = "Ernte";

      break;
    case "fertilizer":
      label = "Düner";

      break;

    default:
      break;
  }

  return (
    <View className={itemStyles({})} {...props}>
      <View className="flex flex-row items-center justify-start w-full space-x-5">
        <View className="bg-yellow-light-200 rounded-12 w-10 h-10 items-center justify-center">
          {intent == "water" && <Drop />}
          {intent == "light" && <Sun />}
          {intent == "location" && <Home />}
          {intent == "temperature" && <Thermometer />}
          {intent == "harvest" && <Trophy />}
          {intent == "fertilizer" && <Heart />}
        </View>
        <View className="flex flex-col items-start justify-start space-y-1">
          <Typography size="label" color="text-green-light">
            {label}
          </Typography>
          <Typography size="h4" color={textColor}>
            {text}
          </Typography>
        </View>
      </View>
    </View>
  );
};
