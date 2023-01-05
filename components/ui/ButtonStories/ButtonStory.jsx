import React from "react";
import { Button, ButtonProps } from "@ui/Button";
import ChevronBackward from "@svg/chevron_backward.svg";
import { View } from "react-native";

export const ButtonStory = ({ intent, textColor }) => {
  return (
    <View className="flex-1 items-start justify-center px-8 py-8 gap-y-6">
      <Button
        intent={intent}
        textColor={textColor}
        size="full"
        text={"Button Label"}
      />

      <Button
        intent={intent}
        textColor={textColor}
        size="full"
        text={"Button Label"}
        disabled
      />

      <Button
        intent={intent}
        textColor={textColor}
        size="full"
        text={"Button Label"}
        svg={
          <ChevronBackward
            color={intent === "secondaryDark" ? "white" : "#165556"}
          />
        }
      />

      <Button
        intent={intent}
        textColor={textColor}
        size="full"
        text={"Button Label"}
        svg={
          <ChevronBackward
            color={intent === "secondaryDark" ? "white" : "#165556"}
          />
        }
        disabled
      />

      <Button
        intent={intent}
        textColor={textColor}
        size="auto"
        svg={
          <ChevronBackward
            color={intent === "secondaryDark" ? "white" : "#165556"}
          />
        }
      />

      <Button
        intent={intent}
        textColor={textColor}
        size="auto"
        svg={
          <ChevronBackward
            color={intent === "secondaryDark" ? "white" : "#165556"}
          />
        }
        disabled
      />

      <Button
        intent={intent}
        textColor={textColor}
        size="small"
        svg={
          <ChevronBackward
            color={intent === "secondaryDark" ? "white" : "#165556"}
          />
        }
      />

      <Button
        intent={intent}
        textColor={textColor}
        size="small"
        svg={
          <ChevronBackward
            color={intent === "secondaryDark" ? "white" : "#165556"}
          />
        }
        disabled
      />

      <Button
        intent={intent}
        textColor={textColor}
        size="small"
        text={"Button Label"}
        svg={
          <ChevronBackward
            color={intent === "secondaryDark" ? "white" : "#165556"}
          />
        }
      />

      <Button
        intent={intent}
        textColor={textColor}
        size="small"
        text={"Button Label"}
        svg={
          <ChevronBackward
            color={intent === "secondaryDark" ? "white" : "#165556"}
          />
        }
        disabled
      />
    </View>
  );
};
