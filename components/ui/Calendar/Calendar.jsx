// Get current work week out of the 52 weeks of the year based on the current date

import { getObjectValue } from "@storage";
import { Typography } from "@ui/Typography/Typography";
import React, { useCallback } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";

export const Calendar = () => {
  const { data, isLoading } = getObjectValue("plants");

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    // console.log(viewableItems);
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

  const activeWeekNumber = Math.ceil(days / 7);
  const weeks = Array.from({ length: 52 }, (_, i) => i + 1);

  // Reduce weeks array with plants array of objects. Add plant object reference to the week if the status array has a object with key start that is equal to the week number, else return the week array item without the plant object reference. Keep combining the week with the plant until the end key is equal to the week number. Add each plant to the week in an array if the start key is equal to the week number or if the start key is less than the week number and the end key is greater than the week number. Plant can be undefined.
  const weeksWithPlants = weeks.reduce((acc, week) => {
    const weekWithPlant = data.reduce(
      (acc, plant) => {
        if (
          plant.status.some(
            (status) =>
              status.start === week ||
              (status.start < week && status.end >= week)
          )
        ) {
          // acc.plants can be undefined
          if (acc.plants) {
            return { ...acc, plants: [...acc.plants, plant] };
          } else {
            return { ...acc, plants: [plant] };
          }
        }

        return acc;
      },
      { week }
    );

    acc.push(weekWithPlant);

    return acc;
  }, []);

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 40,
    waitForInteraction: true,
  };

  const renderItem = ({ week, plants }) => (
    <View
      style={{ width: 87 }}
      className="flex border-r items-center justify-start"
    >
      <Typography>KW {week}</Typography>

      {plants &&
        plants.map((plant) => (
          <Typography key={plant.id}>{plant.title}</Typography>
        ))}
    </View>
  );

  return (
    <SafeAreaView className="mx-[5]">
      <FlatList
        data={weeksWithPlants}
        renderItem={({ item }) => renderItem(item)}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={activeWeekNumber - 1}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </SafeAreaView>
  );
};
