import { KALDARIUM_SUPABASE_IMAGE_BUCKET_URL } from "@env";
import Add from "@svg/add.svg";
import Close from "@svg/close.svg";
import { Button } from "@ui/Button/Button";
import { TagStatus } from "@ui/TagStatus/TagStatus";
import { Typography } from "@ui/Typography/Typography";
import React from "react";
import { View, Image, Pressable } from "react-native";

export const Plant = ({ plant, index, active, onActionPress, onPress }) => {
  const getPlantStatus = () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    const activeWeekNumber = Math.ceil(days / 7);

    // check if one of the plants is in danger based on the current week
    const isDanger = plant.status.some(
      (status) =>
        status.type === "danger" &&
        activeWeekNumber >= status.start &&
        activeWeekNumber <= status.end
    );

    const isCaution = plant.status.some(
      (status) =>
        status.type === "danger" &&
        activeWeekNumber + 2 >= status.start &&
        activeWeekNumber < status.start
    );

    if (isDanger) {
      return {
        intent: "danger",
        text: "Gefahr",
      };
    }

    if (isCaution) {
      return {
        intent: "warning",
        text: "Achtung",
      };
    }

    return {
      intent: "fine",
      text: "Alles gut",
    };
  };

  return (
    <View
      className={`flex flex-grow justify-center items-center pt-3 pb-5 px-5 rounded-20 border border-transparent ${
        (index + 1) % 2 === 1 ? "mb-[20] mr-2" : "mt-[20] ml-2"
      }`}
      style={{ backgroundColor: plant.color }}
    >
      <Pressable className="flex items-center" onPress={() => onPress(plant)}>
        <Image
          source={{
            uri: `${KALDARIUM_SUPABASE_IMAGE_BUCKET_URL}/plants/${plant.imagename}.png`,
          }}
          style={{ width: 100, height: 100 }}
          className="mb-3"
        />
        <Typography size="h3" className="mb-2">
          {plant.title}
        </Typography>
        {active && (
          <TagStatus
            intent={getPlantStatus().intent}
            text={getPlantStatus().text}
          />
        )}
      </Pressable>
      <Button
        intent="tertiary"
        size="small"
        className="absolute w-11 h-11 p-0 top-3 right-3"
        onPress={() => onActionPress(plant)}
        svg={active ? <Close /> : <Add />}
      />
    </View>
  );
};
