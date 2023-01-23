import { KALDARIUM_SUPABASE_IMAGE_BUCKET_URL } from "@env";
import { ListItemProduct } from "@ui/ListItemProduct/ListItemProduct";
import { Tag } from "@ui/Tag/Tag";
import { TagStatus } from "@ui/TagStatus/TagStatus";
import { Typography } from "@ui/Typography/Typography";
import * as React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";

import { getObjectValue } from "../helper/AsyncStorage";

export default function PlaygroundScreen({ navigation }) {
  const { data: plants, isLoading } = getObjectValue("plants");

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
        <Tag />
        <Tag intent="gurke" />
        <Tag intent="karotte" />
        <Tag intent="kartoffel" />
        <Tag intent="tomate" />
        <View className="flex flex-col w-full gap-y-8">
          <ListItemProduct
            navigation={navigation}
            textTitle="Karotte"
            textDesc="Lorem ipsum dolor sit amet."
            isBio={false}
          />
          <ListItemProduct
            navigation={navigation}
            textTitle="Karotte"
            textDesc="Lorem ipsum dolor sit amet."
            isBio={true}
          />
        </View>
        <TagStatus intent="danger" text="Gefahr" />
        <TagStatus intent="fine" text="Alles gut" />
        <TagStatus intent="warning" text="Achtung" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    backgroundColor: "#eee",
  },
});
