import React from "react";
import { View, Image } from "react-native";
import { Typography } from "@ui/Typography/Typography";
import { KALDARIUM_SUPABASE_IMAGE_BUCKET_URL } from "@env";

export const Plant = ({ plant }) => {
  return (
    <View>
      <Image
        source={{
          uri: `${KALDARIUM_SUPABASE_IMAGE_BUCKET_URL}/plants/${plant.title}.png`,
        }}
        style={{ width: 100, height: 100 }}
      />
      <Typography size="copy">{plant.title}</Typography>
    </View>
  );
};