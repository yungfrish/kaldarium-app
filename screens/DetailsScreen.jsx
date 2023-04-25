import { KALDARIUM_SUPABASE_IMAGE_BUCKET_URL } from "@env";
import { useGetObjectValue } from "@storage";
import ChevronBackward from "@svg/chevron_backward.svg";
import { ActionButton } from "@ui/ActionButton/ActionButton";
import { Button } from "@ui/Button/Button";
import { Typography } from "@ui/Typography/Typography";
import { View, ImageBackground, Image, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailsScreen({ route, navigation }) {
  const { plant } = route.params;

  return (
    <ScrollView className="flex flex-grow">
      <ImageBackground
        source={require("../assets/png/DetailsPattern.png")}
        style={{
          flex: 1,
          resizeMode: "cover",
          width: "100%",
          flexGrow: 1,
          backgroundColor: plant.color,
        }}
      >
        <View className="flex flex-row px-16 h-[356]">
          <View className="pt-[56] px-16 absolute z-10">
            <ActionButton
              svg={<ChevronBackward color="#165556" />}
              onPress={() => navigation.goBack()}
              className="text-green-medium"
            />
          </View>
          <View className="flex items-center flex-grow pt-[52]">
            <Image
              source={{
                uri: `${KALDARIUM_SUPABASE_IMAGE_BUCKET_URL}/plants/${plant.imagename}.png`,
              }}
              style={{ width: 160, height: 160 }}
            />
            <Typography size="h3" color="text-green-medium">
              {plant.title}
            </Typography>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
