import { Plant } from "@ui/Plant/Plant";
import * as React from "react";
import { Text, View, ImageBackground } from "react-native";

import { getObjectValue } from "../helper/AsyncStorage";

export default function PlantsScreen({ navigation }) {
  const { data: plants, isPlantsLoading } = getObjectValue("plants");
  const { data: activePlants, isActivePlantsLoading } = getObjectValue(
    "KaldariumActivePlants"
  );

  if (isActivePlantsLoading || isPlantsLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ImageBackground
      className="bg-yellow-light-100"
      source={require("../assets/png/01.png")}
      style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <View className="flex flex-row flex-wrap p-32 gap-16 align-center">
        {activePlants.map((plant) => (
          <View key={plant.id} className="flex flex-row w-1/2">
            <Plant plant={plant} />
          </View>
        ))}
      </View>
    </ImageBackground>
  );
}
