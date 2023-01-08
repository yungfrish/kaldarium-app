import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { getObjectValue } from "../helper/AsyncStorage";
import { KALDARIUM_SUPABASE_IMAGE_BUCKET_URL } from "@env";
import { Typography } from "@ui/Typography/Typography";
import { Tag } from "@ui/Tag/Tag";

export default function TabOneScreen({ navigation }) {
  const { data: plants, isLoading } = getObjectValue("plants");

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  console.log(plants);

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

          <Tag>
            <Typography size="label">Gang Gang</Typography>
          </Tag>
          <Tag intent="bio">
            <Typography size="label">Gang Gang</Typography>
          </Tag>
        </View>
      ))}
      <View style={styles.separator} />
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
