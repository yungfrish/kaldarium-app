import { KALDARIUM_SUPABASE_IMAGE_BUCKET_URL } from "@env";
import Search from "@svg/search.svg";
import { ActionButton } from "@ui/ActionButton/ActionButton";
import { Button } from "@ui/Button/Button";
import { FadeInView } from "@ui/FadeInView/FadeInView";
import { Plant } from "@ui/Plant/Plant";
import { PlantsStatus } from "@ui/PlantsStatus/PlantsStatus";
import { Typography } from "@ui/Typography/Typography";
import React, { useRef, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  ScrollView,
  Animated,
  Easing,
  Image,
} from "react-native";
import Modal from "react-native-modal";

import { useGetObjectValue, storeData } from "../helper/AsyncStorage";

export default function PlantsScreen({ navigation }) {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const { data: plants, isLoading: isPlantsLoading } =
    useGetObjectValue("KaldariumPlants");
  const {
    data: activePlantIds,
    isLoading: isActivePlantIdsLoading,
    refetch,
  } = useGetObjectValue("KaldariumActivePlantIds");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  if (isActivePlantIdsLoading || isPlantsLoading) {
    return <Text>Loading...</Text>;
  }

  const activePlants = plants?.filter((plant) =>
    activePlantIds?.some((id) => id === plant.id)
  );

  const availableNewPlants = plants.filter(
    (plant) => !activePlantIds.some((id) => id === plant.id)
  );

  const animatedHeaderTranslateY = scrollOffsetY.interpolate({
    inputRange: [0, 120],
    outputRange: [-120, 0],
    extrapolate: "clamp",
    easing: Easing.out(Easing.exp),
  });

  const animatedIconTranslateY = scrollOffsetY.interpolate({
    inputRange: [0, 60],
    outputRange: [40, 0],
    extrapolate: "clamp",
    easing: Easing.inOut(Easing.linear),
  });

  const animatedSearchOpacity = scrollOffsetY.interpolate({
    inputRange: [296, 352],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const preparePlantRemoval = (plant) => {
    setSelectedPlant(plant);
    setIsModalVisible(true);
  };

  const removePlant = async (plant) => {
    const newActivePlants = activePlantIds.filter((id) => id !== plant.id);

    await storeData("KaldariumActivePlantIds", newActivePlants);
    refetch();
    setIsModalVisible(false);
  };

  const addPlant = async (plant) => {
    const newActivePlants = [...activePlantIds, plant.id];

    await storeData("KaldariumActivePlantIds", newActivePlants);
    refetch();
  };

  // const getPlantsStatus = () => {
  //   const currentDate = new Date();
  //   const startDate = new Date(currentDate.getFullYear(), 0, 1);
  //   const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
  //   const activeWeekNumber = Math.ceil(days / 7);

  //   const status = activePlants.reduce(
  //     (acc, plant) => {
  //       const status = plant.status.reduce(
  //         (acc, status) => {
  //           if (
  //             activeWeekNumber + 2 >= status.start &&
  //             activeWeekNumber <= status.end
  //           ) {
  //             return { ...acc, [status.type]: acc[status.type] + 1 };
  //           }

  //           return acc;
  //         },
  //         { seed: 0, danger: 0, careful: 0, empty: 0 }
  //       );

  //       return {
  //         good: acc.seed + status.seed,
  //         danger: acc.danger + status.danger,
  //         careful: acc.careful + status.careful,
  //         empty: acc.empty + status.empty,
  //       };
  //     },
  //     { seed: 0, danger: 0, careful: 0, empty: 0 }
  //   );

  //   return Object.keys(status).reduce((a, b) =>
  //     status[a] > status[b] ? a : b
  //   );
  // };

  const getPlantsStatus = () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    const activeWeekNumber = Math.ceil(days / 7);

    if (activePlants.length === 0) {
      return "empty";
    }

    // check if one of the plants is in danger based on the current week
    const isDanger = activePlants.some((plant) =>
      plant.status.some(
        (status) =>
          status.type === "danger" &&
          activeWeekNumber >= status.start &&
          activeWeekNumber <= status.end
      )
    );

    const isWarning = activePlants.some((plant) =>
      plant.status.some(
        (status) =>
          status.type === "danger" &&
          activeWeekNumber + 2 >= status.start &&
          activeWeekNumber < status.start
      )
    );

    if (isDanger) {
      return "danger";
    }

    if (isWarning) {
      return "careful";
    }

    return "good";
  };

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
            <PlantsStatus status={getPlantsStatus()} />
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
              <Typography size="h1">
                {activePlants?.length > 0
                  ? "Deinen Pflanzen geht es gut."
                  : "Hier wird dein Garten wachsen."}
              </Typography>
              {activePlants?.length > 0 && (
                <Typography size="copy">
                  Wirf trotzdem einen kurzen Blick darauf. Einige scheinen ein
                  leicht erhöhtes Risiko zu haben.
                </Typography>
              )}
            </View>
            {activePlants?.length > 0 && (
              <>
                <View className="flex flex-row items-center justify-between mb-1">
                  <Typography size="h2" className="text-orange flex-grow">
                    Dein Kaldarium
                  </Typography>
                  <ActionButton svg={<Search />} />
                </View>
                <View className="flex flex-row flex-wrap items-center">
                  {activePlants.map((plant, index) => (
                    <View key={plant.id} className="flex flex-row w-1/2">
                      <Plant
                        plant={plant}
                        index={index}
                        active
                        onActionPress={preparePlantRemoval}
                      />
                    </View>
                  ))}
                </View>
              </>
            )}

            <View className="flex flex-row flex-wrap items-center">
              {availableNewPlants?.length > 0 && (
                <>
                  <Typography size="h2" className="text-orange pt-9">
                    {activePlants?.length > 0 ? "Mehr Pflanzen" : "Pflanzen"}
                  </Typography>
                  <Typography size="copy" className="pb-6">
                    Füge bereits gesähte Pflanzen zu deinem Garten hinzu.
                  </Typography>
                  {availableNewPlants.map((plant, index) => (
                    <View key={plant.id} className="flex flex-row w-1/2">
                      <Plant
                        plant={plant}
                        index={index}
                        onActionPress={addPlant}
                      />
                    </View>
                  ))}
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
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
                uri: `${KALDARIUM_SUPABASE_IMAGE_BUCKET_URL}/plants/${selectedPlant?.title}.png`,
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
    </FadeInView>
  );
}
