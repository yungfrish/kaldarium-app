import { Calendar } from "@ui/Calendar/Calendar";
import { FadeInView } from "@ui/FadeInView/FadeInView";
import React from "react";

export default function CalendarScreen({ navigation }) {
  return (
    <FadeInView>
      <Calendar navigation={navigation} />
    </FadeInView>
  );
}
