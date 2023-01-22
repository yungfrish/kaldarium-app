// Get current work week out of the 52 weeks of the year based on the current date

import React from "react";
import { Typography } from "@ui/Typography/Typography";
import { View, SafeAreaView, FlatList, Text } from "react-native";
import { getObjectValue } from "@storage";
import CalendarStrip from "react-native-calendar-strip";

export const Calendar = () => {
  const { data: plants, isLoading } = getObjectValue("plants");

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // const currentDate = new Date();
  // const startDate = new Date(currentDate.getFullYear(), 0, 1);
  // const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

  // const activeWeekNumber = Math.ceil(days / 7);
  // const weeks = Array.from({ length: 52 }, (_, i) => i + 1);

  // const renderItem = ({ item, plant }) => (
  //   <View style={{ width: 85 }} className="border-r">
  //     <Typography key={item}>KW {item}</Typography>
  //   </View>
  // );

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <CalendarStrip
        numDaysInWeek={1}
        scrollable
        showDayName={false}
        showDayNumber={false}
        style={{ height: 150, paddingTop: 20, paddingBottom: 10 }}
      />
    </View>
  );
};
