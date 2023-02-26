import { useGetObjectValue, storeData } from "@storage";
import ChevronBackward from "@svg/chevron_backward.svg";
import CloseCircled from "@svg/close_circled.svg";
import { ActionButton } from "@ui/ActionButton/ActionButton";
import { RemovePlantModal } from "@ui/Modals/RemovePlantModal";
import { Plant } from "@ui/Plant/Plant";
import { Typography } from "@ui/Typography/Typography";
import React from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Keyboard,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { ListItemSearch } from "../ListItemSearch/ListItemSearch";

export const SearchModal = ({ navigation }) => {
  const { data: plants, isLoading: isPlantsLoading } =
    useGetObjectValue("KaldariumPlants");
  const {
    data: activePlantIds,
    isLoading: isActivePlantIdsLoading,
    refetch,
  } = useGetObjectValue("KaldariumActivePlantIds");
  const {
    data: searchHistory,
    isLoading: isSearchHistoryLoading,
    refetch: refetchSearchHistory,
  } = useGetObjectValue("KaldariumSearchHistory");

  const [searchText, setSearchText] = React.useState("");
  const [filteredPlants, setFilteredPlants] = React.useState([]);
  const [selectedPlant, setSelectedPlant] = React.useState(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  if (isPlantsLoading || isActivePlantIdsLoading || isSearchHistoryLoading) {
    return <Text>Loading...</Text>;
  }

  const handleSearch = (text) => {
    setSearchText(text);

    if (text === "") {
      setFilteredPlants([]);
      return;
    }

    const searchEntries = plants.filter((plant) =>
      plant.title.toLowerCase().startsWith(text.toLowerCase())
    );

    setFilteredPlants(searchEntries);
  };

  const activeFoundPlants = filteredPlants.filter((plant) =>
    activePlantIds.some((id) => id === plant.id)
  );

  const newFoundPlants = filteredPlants.filter(
    (plant) => !activePlantIds.some((id) => id === plant.id)
  );

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

  // Function that stores the last three search entries in AsyncStorage, so that they can be displayed in the SearchHistory component. Replaces the oldest entry if there are already three entries.
  const storeSearchEntry = async (text) => {
    // abstract searchHistory to variable
    const tempSearchHistory = [...searchHistory] || [];

    if (tempSearchHistory.some((entry) => entry === text)) {
      return;
    }

    if (tempSearchHistory.length === 3) {
      tempSearchHistory.pop();
    }

    // Insert new entry at the beginning of the array (so that the newest entry is always at the top)
    tempSearchHistory.unshift(text);

    await storeData("KaldariumSearchHistory", tempSearchHistory);
    refetchSearchHistory();
  };

  return (
    <View className="flex flex-grow h-full">
      <View className="flex flex-row items-center justify-between p-16">
        <ActionButton
          svg={<ChevronBackward color="#165556" />}
          onPress={() => navigation.goBack()}
          className="text-green-medium"
        />
        <TextInput
          placeholder="z.B. Tomate"
          className="flex flex-grow ml-24 text-[20px] tracking-wide font-skModernist text-green-medium"
          onChangeText={(text) => handleSearch(text)}
          value={searchText}
          onEndEditing={() => storeSearchEntry(searchText)}
          placeholderTextColor="#AFBFBF"
          selectionColor="#FF9B68"
        />
        {searchText !== "" && (
          <TouchableOpacity
            onPress={() => handleSearch("")}
            className="flex items-center justify-center w-[30] h-[56]"
          >
            <CloseCircled />
          </TouchableOpacity>
        )}
      </View>
      {filteredPlants.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex flex-grow h-full"
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEventThrottle={0}
          onScroll={() => Keyboard.dismiss()}
        >
          <View className="flex flex-grow p-32">
            {activeFoundPlants?.length > 0 && (
              <View className="flex flex-row flex-wrap">
                <Typography size="h2" className="text-orange flex-grow">
                  Dein Kaldarium
                </Typography>
                {activeFoundPlants.map((plant, index) => (
                  <View key={plant.id} className="flex flex-row w-1/2">
                    <Plant
                      key={plant.id}
                      plant={plant}
                      active
                      onActionPress={preparePlantRemoval}
                    />
                  </View>
                ))}
              </View>
            )}

            {newFoundPlants?.length > 0 && (
              <View className="flex flex-row flex-wrap">
                {activePlantIds.length > 0 && (
                  <Typography size="h2" className="text-orange">
                    Mehr Pflanzen
                  </Typography>
                )}
                {newFoundPlants.map((plant, index) => (
                  <View key={plant.id} className="flex flex-row w-1/2">
                    <Plant
                      key={plant.id}
                      plant={plant}
                      onActionPress={addPlant}
                    />
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      ) : (
        <>
          {searchText !== "" ? (
            <View className="items-center justify-center mt-[120]">
              <Typography size="copy">Keine Pflanzen</Typography>
              <Typography size="copy">gefunden</Typography>
            </View>
          ) : (
            <>
              {searchHistory?.length > 0 && (
                <View className="flex flex-grow px-32 pt-12">
                  <Typography size="label" className="text-orange mb-20">
                    Kürzlich gesucht
                  </Typography>
                  {searchHistory.map((entry, index) => (
                    <View className="mb-4" key={index}>
                      <ListItemSearch
                        key={index}
                        title={entry}
                        onPress={(title) => handleSearch(title)}
                      />
                    </View>
                  ))}
                </View>
              )}
            </>
          )}
        </>
      )}

      <ImageBackground
        source={require("@png/EmptySearchPattern.png")}
        className="absolute left-0 right-0 top-0 bottom-0 flex flex-grow"
        style={{
          opacity: filteredPlants.length > 0 || searchText === "" ? 0 : 1,
          zIndex: -1,
        }}
      />

      <RemovePlantModal
        selectedPlant={selectedPlant}
        setSelectedPlant={setSelectedPlant}
        removePlant={removePlant}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </View>
  );
};
