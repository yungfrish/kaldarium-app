import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text className="font-skModernist" style={styles.title}>
        ONBOARDING
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Plants")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Go to plants screen!</Text>
      </TouchableOpacity>
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
