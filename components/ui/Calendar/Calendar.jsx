import { getObjectValue } from "@storage";
import { Typography } from "@ui/Typography/Typography";
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";

import { CalendarItem } from "./_CalendarItem";
import { CollapsibleGroup } from "./_CollapsibleGroup";
import { WeekHead } from "./_WeekHead";

export const Calendar = () => {
  const scrollViewRef = useRef(null);
  const [isDangerCollapsed, setIsDangerCollapsed] = useState(true);
  const [isSeedCollapsed, setIsSeedCollapsed] = useState(true);
  const [currentMonth, setCurrentMonth] = useState("");
  const { data, isLoading } = getObjectValue("plants");
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const collapsibleOpacityAnimation = {
    duration: 200,
    create: {
      duration: 200,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
    delete: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      initialScrollPosition();
    }
  }, [scrollViewRef.current]);

  useEffect(() => {
    if (activeWeekNumber) {
      setCurrentMonth(getCurrentMonth(activeWeekNumber));
    }
  }, [activeWeekNumber, isLoading]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  /**
   * initialScrollPosition
   * ---------------------------------------------------------------
   * @description Scrolls to the current week
   */
  const initialScrollPosition = () => {
    scrollViewRef.current?.scrollTo({
      x: 87 * (activeWeekNumber - 1),
      animated: true,
    });
  };

  /**
   * getCurrentMonth
   * ---------------------------------------------------------------
   * @description Returns the current month based on the week number
   * @param {Number} weekNumber
   */
  const getCurrentMonth = (weekNumber) =>
    new Date(currentDate.getFullYear(), 0, weekNumber * 7).toLocaleString(
      "de-DE",
      { month: "long" }
    );

  /**
   * getPlantsByType
   * ---------------------------------------------------------------
   * @description Returns an array of plants based on the type
   * @param {String} type
   * @returns {Array}
   */
  const getPlantsByType = (type) =>
    data
      .filter((plant) => plant.status.filter((status) => status.type === type))
      .map((plant) => {
        return {
          ...plant,
          status: plant.status.find((status) => status.type === type),
        };
      });

  /**
   * toggleCollapse
   * ---------------------------------------------------------------
   * @description Toggles the collapse state of the CollapsibleGroup
   * @param {Boolean} value
   * @param {Function} callback
   */
  const toggleCollapse = (value, callback) => {
    LayoutAnimation.configureNext(collapsibleOpacityAnimation);
    callback((value) => !value);
  };

  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
  const weeks = Array.from({ length: 52 }, (_, i) => i + 1);
  const activeWeekNumber = Math.ceil(days / 7);
  const aggregatedSeeds = getPlantsByType("seed");
  const aggregatedDangers = getPlantsByType("danger");

  return (
    <SafeAreaView className="flex">
      <ScrollView stickyHeaderIndices={[0]}>
        <View className="flex flex-row justify-center items-center h-[76] bg-yellow-light-100 z-50">
          <Typography size="h1">{currentMonth}</Typography>
        </View>
        <CollapsibleGroup
          isCollapsed={isSeedCollapsed}
          setIsCollapsed={setIsSeedCollapsed}
          offset={128}
          length={aggregatedSeeds.length}
          color="green"
          onClick={() => toggleCollapse(isSeedCollapsed, setIsSeedCollapsed)}
        >
          Aussähen
        </CollapsibleGroup>

        <CollapsibleGroup
          isCollapsed={isDangerCollapsed}
          offset={128 + 16 + 48 + 64 * aggregatedSeeds.length}
          length={aggregatedDangers.length}
          color="error"
          onClick={() =>
            toggleCollapse(isDangerCollapsed, setIsDangerCollapsed)
          }
        >
          In Gefahr
        </CollapsibleGroup>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
          style={{
            height:
              128 +
              16 +
              48 +
              64 * aggregatedSeeds.length +
              64 * aggregatedDangers.length,
          }}
          scrollEventThrottle={100}
          onScroll={(event) => {
            const scrollPosition = event.nativeEvent.contentOffset.x;
            const weekNumber = Math.ceil(scrollPosition / 87) + 1;
            // Get german month name from week number
            const month = getCurrentMonth(weekNumber);

            setCurrentMonth(month);
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              width: 87 * 52,
              height: "100%",
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            {weeks.map((week) => (
              <WeekHead
                key={week}
                week={week}
                activeWeekNumber={activeWeekNumber}
              />
            ))}

            {aggregatedSeeds.length > 0 && (
              <View
                style={{
                  top: 100,
                }}
                className="z-10 w-full absolute"
              >
                {!!isSeedCollapsed &&
                  aggregatedSeeds.map((plant, index) => (
                    <CalendarItem
                      key={plant.id}
                      plant={plant}
                      index={index}
                      length={aggregatedSeeds.length}
                    />
                  ))}
              </View>
            )}

            {aggregatedDangers.length > 0 && (
              <View
                style={{
                  top: 100 + 16 + 48 + 64 * aggregatedSeeds.length,
                }}
                className="z-10 w-full absolute"
              >
                {!!isDangerCollapsed &&
                  aggregatedDangers.map((plant, index) => (
                    <CalendarItem
                      key={plant.id}
                      plant={plant}
                      index={aggregatedSeeds.length + index}
                      length={aggregatedDangers.length}
                    />
                  ))}
              </View>
            )}
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};
