import { Button } from "@ui/Button/Button";
import { Typography } from "@ui/Typography/Typography";
import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";

import { storeData } from "../helper/AsyncStorage";

export default function OnboardingNotificationsScreen({ navigation }) {
  return (
    <SafeAreaView className="flex flex-grow bg-green-medium">
      <View className="flex pl-32 pr-[116]  gap-y-2 mt-14 mb-[72]">
        <Typography size="h2" color="text-orange-dark">
          Benachrichtigungen
        </Typography>
        <Typography size="h1" color="text-white">
          Lass uns im Austausch bleiben.
        </Typography>
        <Typography size="copy" color="text-white">
          Damit es deinen Pflanzen stets gut geht, würden wir dir gerne
          Benachrichtigungen senden. Hierzu benötigen wir noch deine
          Berechtigung.{"\n\n"}
          Du kannst die Benachrichtigungen jederzeit später in den Einstellungen
          deines Betriebssystems aktivieren.
        </Typography>
      </View>
      <View className="flex flex-grow px-16 pb-[40] items-end justify-end absolute bottom-0 left-0 w-full bg-green-medium">
        <Button
          text="Weiter"
          onPress={async () => {
            await storeData("ShowOnboarding", "false");
            navigation.navigate("Root", { screen: "Home" });
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
