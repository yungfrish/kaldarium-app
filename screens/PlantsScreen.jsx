import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { getObjectValue } from "../helper/AsyncStorage";
import { KALDARIUM_SUPABASE_IMAGE_BUCKET_URL } from "@env";
import { Typography } from "@ui/Typography/Typography";
import { Tag } from "@ui/Tag/Tag";
import { TagStatus } from "@ui/Tag/Tag-Status";
import { ListItem } from "@ui/List/List-Item";

export default function TabOneScreen({ navigation }) {
  const { data: plants, isLoading } = getObjectValue("plants");

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {plants.map((plant) => (
        <View key={plant.id}>
          <Image
            source={{
              uri: `${KALDARIUM_SUPABASE_IMAGE_BUCKET_URL}/plants/${plant.title}.png`,
            }}
            style={{ width: 100, height: 100 }}
          />

          <Typography size="copy" key={plant.id}>
            {plant.title}
          </Typography>
        </View>
      ))}
      <View style={styles.separator} />

      <View className="gap-y-8 bg-yellow-light-100 w-full px-32 py-32 items-start">
        <Tag></Tag>
        <Tag intent="gurke"></Tag>
        <Tag intent="karotte"></Tag>
        <Tag intent="kartoffel"></Tag>
        <Tag intent="tomate"></Tag>
        <View className="flex flex-col w-full">
          <ListItem
            intent="default"
            textTitle="Karotte"
            textDesc="Lorem ipsum dolor sit amet."
          ></ListItem>
        </View>
        <TagStatus intent="error"></TagStatus>
        <TagStatus intent="green"></TagStatus>
        <TagStatus intent="yellow"></TagStatus>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    backgroundColor: "#eee",
  },
});
