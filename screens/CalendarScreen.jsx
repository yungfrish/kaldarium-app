import { Calendar } from "@ui/Calendar/Calendar";
import { StyleSheet, View } from "react-native";

export default function CalendarScreen({ navigation }) {
  return (
    <View style={styles.container} className="bg-yellow-light-100">
      <Calendar />
    </View>
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
