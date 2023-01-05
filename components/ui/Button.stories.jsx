import * as React from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { ButtonStory } from "./ButtonStories/ButtonStory";

storiesOf("Button", module)
  .add("Primary", () => (
    <SafeAreaView>
      <ScrollView>
        <View className="bg-green-dark">
          <ButtonStory intent="primary" />
        </View>
      </ScrollView>
    </SafeAreaView>
  ))
  .add("Secondary on Dark", () => (
    <SafeAreaView>
      <ScrollView>
        <View className="bg-green-dark">
          <ButtonStory intent="secondaryDark" textColor="text-white" />
        </View>
      </ScrollView>
    </SafeAreaView>
  ))
  .add("Secondary on Light", () => (
    <SafeAreaView>
      <ScrollView>
        <View className="bg-yellow-light-100">
          <ButtonStory intent="secondaryLight" />
        </View>
      </ScrollView>
    </SafeAreaView>
  ))
  .add("Tertiary", () => (
    <SafeAreaView>
      <ScrollView>
        <View className="bg-rose">
          <ButtonStory intent="tertiary" />
        </View>
      </ScrollView>
    </SafeAreaView>
  ));
