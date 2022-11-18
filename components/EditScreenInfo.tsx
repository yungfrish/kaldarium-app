import { StyleSheet, View, Text } from "react-native";

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text style={styles.textColor}>Test</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
    color: "#fff",
  },
  textColor: {
    color: "#fff",
  },
});
