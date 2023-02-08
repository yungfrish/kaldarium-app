import ChevronUp from "@svg/chevron_up.svg";
import { Typography } from "@ui/Typography/Typography";
import React, { useState } from "react";
import { View, TouchableOpacity, Animated } from "react-native";

export const CollapsibleGroup = ({
  isCollapsed,
  offset,
  length,
  color,
  onClick,
  children,
}) => {
  const [rotateAnimation] = useState(new Animated.Value(0));

  // Write a repeatable function to handle the animation of the chevron rotation
  const handleAnimation = () => {
    Animated.timing(rotateAnimation, {
      toValue: isCollapsed ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [
      {
        rotate: rotateAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };

  const onPress = async () => {
    handleAnimation();
    onClick();
  };

  return (
    <TouchableOpacity
      className="absolute z-10 pl-32 pr-9 flex flex-row items-center justify-between w-full"
      onPress={onPress}
      style={{
        top: offset,
      }}
    >
      <View className="flex flex-row items-center gap-x-[10]">
        <View className={`bg-${color}/10 rounded-full px-2`}>
          <Typography size="copy" className={`text-${color}`}>
            {length}
          </Typography>
        </View>
        <Typography size="h2" className={`text-${color}`}>
          {children}
        </Typography>
      </View>

      <Animated.View style={animatedStyle}>
        <ChevronUp />
      </Animated.View>
    </TouchableOpacity>
  );
};
