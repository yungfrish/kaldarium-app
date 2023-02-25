import { useGetObjectValue } from "@storage";
import AddCircled from "@svg/add_circled.svg";
import { Button } from "@ui/Button/Button";
import { Typography } from "@ui/Typography/Typography";
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  ImageBackground,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CalendarItem } from "./_CalendarItem";
import { CollapsibleGroup } from "./_CollapsibleGroup";
import { WeekHead } from "./_WeekHead";

export const Calendar = ({ navigation }) => {
  const scrollViewRef = useRef(null);
  const [isDangerCollapsed, setIsDangerCollapsed] = useState(true);
  const [isSeedCollapsed, setIsSeedCollapsed] = useState(true);
  const [currentMonth, setCurrentMonth] = useState("");
  const { data: plants, isLoading: isPlantsLoading } =
    useGetObjectValue("KaldariumPlants");
  const { data: activePlantIds, isLoading: isActivePlantIdsLoading } =
    useGetObjectValue("KaldariumActivePlantIds");

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
  }, [activeWeekNumber, isPlantsLoading, isActivePlantIdsLoading]);

  if (isActivePlantIdsLoading || isPlantsLoading) {
    return <Text>Loading...</Text>;
  }

  const windowHeight = Dimensions.get("window").height;

  const activePlants = plants?.filter((plant) =>
    activePlantIds?.some((id) => id === plant.id)
  );

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
    activePlants
      .filter((plant) => plant.status.filter((status) => status.type === type))
      .map((plant) => {
        return {
          ...plant,
          status: plant.status.filter((status) => status.type === type),
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
  const weeksToRenderNoData = Array.from(
    { length: 4 },
    (_, i) => i + activeWeekNumber - 1
  );

  return (
    <SafeAreaView className="flex">
      {activePlants && activePlants.length > 0 ? (
        <ScrollView
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          className="h-full flex flex-grow"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View
            className="flex flex-row flex-grow justify-center items-center h-[76] bg-yellow-light-100 z-50"
            style={{
              shadowColor: "#756e55",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.12,
              shadowRadius: 2,
            }}
          >
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
            offset={
              isSeedCollapsed
                ? 128 + 16 + 48 + 64 * aggregatedSeeds.length
                : 128 + 16 + 48
            }
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
            className="flex flex-grow h-full"
            scrollEventThrottle={100}
            onScroll={(event) => {
              const scrollPosition = event.nativeEvent.contentOffset.x;
              const weekNumber = Math.ceil(scrollPosition / 87) + 1;
              const month = getCurrentMonth(weekNumber);

              setCurrentMonth(month);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                width: 87 * 52,
                paddingLeft: 20,
                paddingRight: 20,
                flexGrow: 1,
              }}
              className="h-full"
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
                    top: isSeedCollapsed
                      ? 100 + 16 + 48 + 64 * aggregatedSeeds.length
                      : 100 + 16 + 48,
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
      ) : (
        <ImageBackground
          source={require("@png/EmptyCalendarPattern.png")}
          className="flex flex-grow"
          style={{
            resizeMode: "cover",
          }}
        >
          <View
            className="flex flex-grow justify-center items-center pt-7 pb-16 bg-yellow-light-100 z-10"
            style={{
              shadowColor: "#756e55",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.12,
              shadowRadius: 2,
            }}
          >
            <Typography size="h1">{currentMonth}</Typography>
          </View>
          <View className="flex flex-row flex-grow px-5 h-full">
            {weeksToRenderNoData.map((week, index) => (
              <WeekHead
                key={week}
                week={week}
                length={weeksToRenderNoData.length}
                index={index}
                activeWeekNumber={activeWeekNumber}
              />
            ))}
          </View>
          <View className="flex gap-y-2 absolute justify-center items-center top-0 left-0 right-0 bottom-0 px-32 w-full">
            <Typography size="h3" className="text-center">
              Wo sind die Pflanzen?
            </Typography>
            <Typography size="copy" className="text-center mb-16">
              Füge zuerst Pflanzen zu deinem Kaldarium, um deren Pflanz- und
              Gefahrpläne einsehen zu können.
            </Typography>
            <Button
              size="small"
              text="Pflanzen hinzufügen"
              svg={<AddCircled />}
              onPress={() => navigation.navigate("Home")}
            />
          </View>
        </ImageBackground>
      )}
    </SafeAreaView>
  );
};
