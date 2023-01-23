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
      source={require("../assets/png/01.png")}
      style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <View className="gap-y-8 bg-yellow-light-100 w-full px-32 py-32 items-start">
        <View className="flex flex-row items-start justify-start gap-8 w-full">
          <Tag />
          <Tag intent="gurke" />
          <Tag intent="karotte" />
          <Tag intent="kartoffel" />
          <Tag intent="tomate" />
        </View>
        <View className="flex flex-col w-full gap-y-8">
          <ListItemProduct
            navigation={navigation}
            title="Product All Incl."
            text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr."
            isBio
            link="Gang Gang"
          />
          <ListItemProduct
            navigation={navigation}
            title="No Link, No Zelda"
            text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr."
            isBio={false}
          />
        </View>
        <TagStatus intent="danger" text="Gefahr" />
        <TagStatus intent="fine" text="Alles gut" />
        <TagStatus intent="warning" text="Achtung" />
      </View>
    </ImageBackground>
  );
}
