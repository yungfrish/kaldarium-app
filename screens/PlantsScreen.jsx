import Search from "@svg/search.svg";
import { ActionButton } from "@ui/ActionButton/ActionButton";
import { FadeInView } from "@ui/FadeInView/FadeInView";
import { Plant } from "@ui/Plant/Plant";
import { PlantsStatus } from "@ui/PlantsStatus/PlantsStatus";
import { Typography } from "@ui/Typography/Typography";
import React, { useRef } from "react";
import {
  Text,
  View,
  ImageBackground,
  ScrollView,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGetObjectValue } from "../helper/AsyncStorage";

export default function PlantsScreen({ navigation }) {
  const { data: plants, isLoading: isPlantsLoading } =
    useGetObjectValue("KaldariumPlants");
  const { data: activePlants, isLoading: isActivePlantIdsLoading } =
    useGetObjectValue("KaldariumActivePlants");
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  if (isActivePlantIdsLoading || isPlantsLoading) {
    return <Text>Loading...</Text>;
  }

  const availableNewPlants = plants.filter(
    (plant) => !activePlants.some((activePlant) => activePlant.id === plant.id)
  );

  const animatedHeaderTranslateY = scrollOffsetY.interpolate({
    inputRange: [0, 120],
    outputRange: [-120, 0],
    extrapolate: "clamp",
  });

  const animatedIconTranslateY = scrollOffsetY.interpolate({
    inputRange: [0, 60],
    outputRange: [40, 0],
    extrapolate: "clamp",
  });

  const animatedSearchOpacity = scrollOffsetY.interpolate({
    inputRange: [296, 352],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <FadeInView>
      <ImageBackground
        className="flex flex-grow bg-yellow-light-100"
        source={require("../assets/png/HomePattern.png")}
        imageStyle={{
          flex: 1,
          flexGrow: 1,
          resizeMode: "stretch",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <View className="z-10">
          <Animated.View
            className="flex flex-row absolute top-0 left-0 right-0 items-center justify-between z-10 bg-yellow-light-100 pl-[100] pr-32 pt-14 pb-2"
            style={[
              {
                transform: [
                  {
                    translateY: animatedHeaderTranslateY,
                  },
                ],
                height: 120,
                shadowColor: "#756e55",
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.12,
                shadowRadius: 32,
              },
            ]}
          >
            <Typography size="h2" color="text-orange">
              Dein Garten
            </Typography>
            <Animated.View
              style={{
                opacity: animatedSearchOpacity,
              }}
            >
              <ActionButton
                onPress={() => navigation.navigate("AddPlant")}
                svg={<Search />}
              />
            </Animated.View>
          </Animated.View>
          <Animated.View
            className="pt-14 pl-32 absolute z-20"
            style={{
              transform: [
                {
                  translateY: animatedIconTranslateY,
                },
              ],
            }}
          >
            <PlantsStatus status="good" />
          </Animated.View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
          )}
        >
          <View className="flex flex-grow p-32 mt-36">
            <View className="flex flex-col gap-y-3 pr-[68] mb-9">
              <Typography size="h1">Deinen Pflanzen geht es gut.</Typography>
              <Typography size="copy">
                Wirf trotzdem einen kurzen Blick darauf. Einige scheinen ein
                leicht erhöhtes Risiko zu haben.
              </Typography>
            </View>
            <View className="flex flex-row items-center justify-between mb-1">
              <Typography size="h2" className="text-orange flex-grow">
                Dein Kaldarium
              </Typography>
              <ActionButton svg={<Search />} />
            </View>
            <View className="flex flex-row flex-wrap items-center">
              {activePlants?.length > 0 &&
                activePlants.map((plant, index) => (
                  <View key={plant.id} className="flex flex-row w-1/2">
                    <Plant plant={plant} index={index} active />
                  </View>
                ))}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </FadeInView>
  );
}
