import * as React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { getObjectValue } from "../helper/AsyncStorage";
import { Plant } from "@ui/Plant/Plant";

export default function PlantsScreen({ navigation }) {
  const { data: plants, isLoading } = getObjectValue("plants");

  if (isLoading) {
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
      <View className="flex flex-row p-32 gap-16 align-center">
        {plants.map((plant) => (
          <View key={plant.id} className="flex flex-row w-1/2">
            <Plant plant={plant} />
          </View>
        ))}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    backgroundColor: "#eee",
  },
});
