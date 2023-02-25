import { SearchModal } from "@ui/Modals/SearchModal";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchModalScreen({ navigation }) {
  return (
    <SafeAreaView className="bg-yellow-light-100">
      <SearchModal navigation={navigation} />
    </SafeAreaView>
  );
}
