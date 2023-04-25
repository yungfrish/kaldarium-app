import { KALDARIUM_SUPABASE_IMAGE_BUCKET_URL } from "@env";
import { Typography } from "@ui/Typography/Typography";
import React from "react";
import { Image, Pressable, View } from "react-native";

export const CalendarItem = ({ plant, index }) => {
  return (
    <View className="flex flex-row mb-2">
      {plant?.status.length ? (
        plant.status.map((status, index) => (
          <Pressable
            key={`${plant.id}-${index}`}
            style={{
              width: 87 * (status.end - status.start + 1) + 1,
              height: 56,
              left: 87 * (status.start - 1) - 1 + 20,
              shadowColor: "#fff",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowRadius: -2,
              shadowOpacity: 0.2,
              backgroundColor: plant.color,
            }}
            className="flex flex-row justify-start items-center py-2 rounded-16 overflow-hidden whitespace-nowrap"
          >
            {plant && (
              <>
                <Image
                  source={{
                    uri: `${KALDARIUM_SUPABASE_IMAGE_BUCKET_URL}/plants/${plant.imagename}.png`,
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
        ))
      ) : (
        <></>
      )}
    </View>
  );
};
