import * as React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { Button } from "@ui/Button";
import ChevronBackward from "@svg/chevron_backward.svg";

storiesOf("Button", module)
  .add("Primary on Dark", () => (
    <View className="flex-1 items-start justify-start bg-green-dark px-8 py-8">
      <Button intent={"primary"} size="full" text={"Button Label"} />
      <Button
        intent={"primary"}
        size="full"
        text={"Button Label"}
        svg={ChevronBackward}
        disabled
      />
      <Button intent={"primary"} size="auto" svg={ChevronBackward} />
    </View>
  ))
  .add("Secondary on Dark", () => (
    <View className="flex-1 items-start justify-start bg-white px-8 py-8">
      <Button intent={"primary"} size="full" />
      <Button intent={"primary"} size="auto" />
    </View>
  ))
  .add("Secondary on Light", () => (
    <View className="flex-1 items-start justify-start bg-white px-8 py-8">
      <Button intent={"primary"} size="full" />
      <Button intent={"primary"} size="auto" />
    </View>
  ))
  .add("Tertiary on Dark", () => (
    <View className="flex-1 items-start justify-start bg-white px-8 py-8">
      <Button intent={"primary"} size="full" />
      <Button intent={"primary"} size="auto" />
    </View>
  ))
  .add("Tertiary on Light", () => (
    <View className="flex-1 items-start justify-start bg-white px-8 py-8">
      <Button intent={"primary"} size="full" />
      <Button intent={"primary"} size="auto" />
    </View>
  ));
