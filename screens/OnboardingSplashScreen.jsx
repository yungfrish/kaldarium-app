import { useGetObjectValue } from "@storage";
import { Button } from "@ui/Button/Button";
import { FadeInView } from "@ui/FadeInView/FadeInView";
import { Typography } from "@ui/Typography/Typography";
import { View, ImageBackground, Image, Text } from "react-native";

export default function OnboardingSplashScreen({ navigation }) {
  const { data: contents, isLoading } = useGetObjectValue("KaldariumContents");

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  console.log({ contents });

  return (
    <FadeInView>
      <ImageBackground
        source={require("../assets/png/OnboardingPattern.png")}
        className="bg-green-medium"
        style={{
          flex: 1,
          resizeMode: "cover",
          width: "100%",
        }}
      >
        <View className="flex justify-center items-center mt-[188] mb-14">
          <Image
            source={require("../assets/png/Logo.png")}
            style={{
              width: 200,
              height: 200,
              resizeMode: "contain",
              marginBottom: 20,
            }}
          />
        </View>
        <View className="flex pl-32 pr-[116] justify-start gap-y-2">
          <Typography size="h2" color="text-orange-dark">
            {contents["onboardingSplash"].content.title}
          </Typography>
          <Typography size="h1" color="text-white">
            {contents["onboardingSplash"].content.subtitle}
          </Typography>
          <Typography size="copy" color="text-white">
            {contents["onboardingSplash"].content.content}
          </Typography>
        </View>
        <View className="flex flex-grow px-16 pb-[40] items-end justify-end">
          <Button
            text={contents["onboardingSplash"].content.button}
            onPress={() => navigation.navigate("OnboardingPlants")}
          />
        </View>
      </ImageBackground>
    </FadeInView>
  );
}
