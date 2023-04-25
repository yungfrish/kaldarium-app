import { KALDARIUM_SUPABASE_IMAGE_BUCKET_URL } from "@env";
import { Button } from "@ui/Button/Button";
import { Typography } from "@ui/Typography/Typography";
import React from "react";
import { View, Image } from "react-native";
import Modal from "react-native-modal";

export const RemovePlantModal = ({
  isModalVisible,
  setIsModalVisible,
  selectedPlant,
  setSelectedPlant,
  removePlant,
}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      backdropColor="#165556"
      backdropOpacity={0.8}
      onBackdropPress={() => setIsModalVisible(false)}
      className="m-0 justify-end"
      onModalHide={() => setSelectedPlant(null)}
    >
      <View className="flex center  bg-white rounded-t-20 pt-6 px-32 pb-[48]">
        <View className="flex flex-row items-center">
          <Image
            source={{
              uri: `${KALDARIUM_SUPABASE_IMAGE_BUCKET_URL}/plants/${selectedPlant?.imagename}.png`,
            }}
            style={{ width: 40, height: 40 }}
            className="mr-2"
          />
          <Typography size="h3" className="mt-4">
            {selectedPlant?.title} aus deinem Garten entfernen?
          </Typography>
        </View>
        <View className="flex flex-row justify-end mt-5">
          <Typography size="copy">
            Die {selectedPlant?.title} bereits geerntet? Oder hast du deine{" "}
            {selectedPlant?.title} tot gepflegt?
          </Typography>
        </View>
        <View className="flex flex-wrap justify-end mt-5">
          <Button
            onPress={() => removePlant(selectedPlant)}
            text={`${selectedPlant?.title} entfernen`}
            className="mb-2"
          />
          <Button
            onPress={() => setIsModalVisible(false)}
            text="Abbrechen"
            intent="secondaryLight"
          />
        </View>
      </View>
    </Modal>
  );
};
