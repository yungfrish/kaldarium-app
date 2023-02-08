import { Button } from "@ui/Button/Button";
import { PlantOnboarding } from "@ui/PlantOnboarding/PlantOnboarding";
import { Typography } from "@ui/Typography/Typography";
import React, { useState } from "react";
import { SafeAreaView, Text, View, ScrollView } from "react-native";

import { getObjectValue, storeData } from "../helper/AsyncStorage";

export default function OnboardingPlantsScreen({ navigation }) {
  const [selectedPlants, setSelectedPlants] = useState([]);
  const { data: plants, isLoading } = getObjectValue("plants");

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const onSelectPlant = (plant, selected) => {
    if (selected) {
      setSelectedPlants([...selectedPlants, plant]);
    } else {
      setSelectedPlants(selectedPlants.filter((p) => p.id !== plant.id));
    }
  };

  const onSubmitPlants = () => {
    storeData("KaldariumActivePlants", selectedPlants);
    navigation.navigate("OnboardingNotifications");
  };

  return (
    <SafeAreaView className="flex flex-grow bg-green-medium">
      <ScrollView>
        <View className="flex pl-32 pr-[116]  gap-y-2 mt-14 mb-[72]">
          <Typography size="h2" color="text-orange-dark">
            Anpflanzen
          </Typography>
          <Typography size="h1" color="text-white">
            Welche Pflanzen befinden sich in deinem Kaldarium?
          </Typography>
        </View>
        <View className="flex flex-grow flex-row flex-wrap p-32 pt-0 align-start">
          {plants.map((plant, index) => (
            <View key={index} className="flex flex-grow">
              <PlantOnboarding
                plant={plant}
                index={index}
                onSelectPlant={onSelectPlant}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <View className="flex flex-grow px-16 pb-[40] items-end justify-end absolute bottom-0 left-0 w-full bg-green-medium">
        <Button
          text="Meinen Garten pflanzen"
          onPress={() => onSubmitPlants()}
        />
      </View>
    </SafeAreaView>
  );
}
