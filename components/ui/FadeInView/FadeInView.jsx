import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { Animated } from "react-native";

export const FadeInView = (props, { navigation }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useFocusEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    return () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    };
  });

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: fadeAnim,
      }}
      className="bg-yellow-light-100"
      {...props}
    >
      {props.children}
    </Animated.View>
  );
};
