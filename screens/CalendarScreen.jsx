import { Calendar } from "@ui/Calendar/Calendar";
import { View } from "react-native";

export default function CalendarScreen({ navigation }) {
  return (
    <View className="bg-yellow-light-100 h-full">
      <Calendar />
    </View>
  );
}
