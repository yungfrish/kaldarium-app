import { KALDARIUM_SUPABASE_IMAGE_BUCKET_URL } from "@env";
import { Typography } from "@ui/Typography/Typography";
import React from "react";
import { Image, Pressable } from "react-native";

export const CalendarItem = ({ plant, index }) => {
  let plantLength = 0;
  let plantStart = 0;
  let plantEnd = 0;

  if (plant && plant.status) {
    plantEnd = plant.status.end;
    plantStart = plant.status.start;

    plantLength = plantEnd - plantStart;
  }

  return (
    <Pressable
      style={{
        width: 87 * (plantLength + 1) + 1,
        height: 56,
        left: 87 * (plantStart - 1) - 1,
      }}
      className="flex flex-row justify-start items-center bg-slate-300 py-2 rounded-16 mb-2"
    >
      {plant && (
        <>
          <Image
            source={{
              uri: `${KALDARIUM_SUPABASE_IMAGE_BUCKET_URL}/plants/${plant.title}.png`,
            }}
            style={{ width: 40, height: 40 }}
            className="mx-[10px]"
          />
          <Typography size="h4" key={plant.id}>
            {plant.title}
          </Typography>
        </>
      )}
    </Pressable>
  );
};
