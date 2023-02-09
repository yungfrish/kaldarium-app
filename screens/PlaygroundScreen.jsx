import { ListItemEvent } from "@ui/ListItemEvent/ListItemEvent";
import { ListItemInfo } from "@ui/ListItemInfo/ListItemInfo";
import { ListItemProduct } from "@ui/ListItemProduct/ListItemProduct";
import { Tag } from "@ui/Tag/Tag";
import { TagStatus } from "@ui/TagStatus/TagStatus";
import * as React from "react";
import { Text, View, ImageBackground } from "react-native";

import { getObjectValue } from "../helper/AsyncStorage";

export default function PlaygroundScreen({ navigation }) {
  // const { data: plants, isLoading } = getObjectValue("plants");
  const { isLoading } = getObjectValue("plants");

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ImageBackground
      className="bg-yellow-light-100"
      source={require("../assets/png/HomePattern.png")}
      style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <View className="gap-y-8 bg-yellow-light-100 w-full px-32 py-32 items-start">
        <View className="flex flex-row flex-wrap items-start justify-start gap-8 w-full">
          <Tag />
          <Tag intent="gurke" />
          <Tag intent="karotte" />
          <Tag intent="kartoffel" />
          <Tag intent="tomate" />
        </View>
        <View className="flex flex-row flex-wrap items-start justify-start gap-8 w-full">
          <TagStatus intent="danger" text="Gefahr" />
          <TagStatus intent="fine" text="Alles gut" />
          <TagStatus intent="warning" text="Achtung" />
        </View>
        <View className="flex flex-col w-full gap-y-8">
          <ListItemProduct
            navigation={navigation}
            title="Product Item"
            text="Detailed Product Description goes here."
            isBio
            link="Gang Gang"
          />
          <ListItemEvent
            navigation={navigation}
            title="Pest Item"
            month="Jan"
            hasTags
          />
          <ListItemInfo intent="water" text="Täglich 2x gießen" />
          <ListItemInfo intent="light" text="In den Schatten stellen" />
        </View>
      </View>
    </ImageBackground>
  );
}
