import { KALDARIUM_SUPABASE_IMAGE_BUCKET_URL } from "@env";
import Add from "@svg/add.svg";
import Close from "@svg/close.svg";
import { Button } from "@ui/Button/Button";
import { TagStatus } from "@ui/TagStatus/TagStatus";
import { Typography } from "@ui/Typography/Typography";
import React from "react";
import { View, Image, Pressable } from "react-native";

export const Plant = ({ plant, index, active, onActionPress, onPress }) => {
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
            uri: `${KALDARIUM_SUPABASE_IMAGE_BUCKET_URL}/plants/${plant.title}.png`,
          }}
          style={{ width: 100, height: 100 }}
          className="mb-3"
        />
        <Typography size="h3" className="mb-2">
          {plant.title}
        </Typography>
        {active && <TagStatus intent="danger" text="Gefahr" />}
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
