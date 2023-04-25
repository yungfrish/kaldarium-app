import { KALDARIUM_SUPABASE_IMAGE_BUCKET_URL } from "@env";
import Checkbox from "@svg/controlled_checkbox.svg";
import CheckboxActive from "@svg/controlled_checkbox_active.svg";
import { Typography } from "@ui/Typography/Typography";
import React, { useState } from "react";
import { View, Image, Pressable } from "react-native";

export const PlantOnboarding = ({ plant, index, onSelectPlant }) => {
  const [selected, setSelected] = useState(false);

  return (
    <Pressable
      className={`flex items-center bg-white/10 rounded-20 border border-transparent ${
        (index + 1) % 2 === 1 ? "mb-[20] mr-2" : "mt-[20] ml-2"
      } ${selected ? " border-yellow" : ""}`}
      onPress={() => {
        onSelectPlant(plant, !selected);
        setSelected(!selected);
      }}
    >
      <View className="absolute top-20 left-20 z-10">
        {selected ? <CheckboxActive /> : <Checkbox />}
      </View>
      <View className="pt-[19] px-[19] pb-[23]">
        <Image
          source={{
            uri: `${KALDARIUM_SUPABASE_IMAGE_BUCKET_URL}/plants/${plant.imagename}.png`,
          }}
          style={{ width: 115, height: 115 }}
        />
      </View>
      <View className="pb-6">
        <Typography
          size="h3"
          color={`${selected ? "text-yellow" : "text-white"}`}
        >
          {plant.title}
        </Typography>
      </View>
    </Pressable>
  );
};
