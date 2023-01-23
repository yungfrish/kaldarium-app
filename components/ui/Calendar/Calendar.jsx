// Get current work week out of the 52 weeks of the year based on the current date

import { getObjectValue } from "@storage";
import { Typography } from "@ui/Typography/Typography";
import React from "react";
import { View, Text } from "react-native";

export const Calendar = () => {
  const { data: plants, isLoading } = getObjectValue("plants");

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

  const activeWeekNumber = Math.ceil(days / 7);
  const weeks = Array.from({ length: 52 }, (_, i) => i + 1);

  // Reduce weeks array with plants array of objects. Add plant object reference to the week if the status array has a object with key start that is equal to the week number, else return the week array item without the plant object reference. Keep combining the week with the plant until the end key is equal to the week number. Sort the weeks array by the start key.
  const weeksWithPlants = weeks.reduce((acc, week) => {
    const weekWithPlant = plants.reduce(
      (acc, plant) => {
        if (plant.status.some((status) => status.start === week)) {
          return { ...acc, plant };
        }

        return acc;
      },
      { week }
    );

    acc.push(weekWithPlant);

    return acc;
  }, []);

  const renderItem = ({ item, plant }) => (
    <View style={{ width: 85 }} className="border-r">
      <Typography key={item}>KW {item}</Typography>
    </View>
  );

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <Typography>{JSON.stringify(weeksWithPlants, null, 2)}</Typography>
    </View>
  );
};
