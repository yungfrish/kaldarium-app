import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Platform, Pressable } from "react-native";

import OnboardingScreen from "../screens/OnboardingScreen";
import HomeScreen from "../screens/HomeScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import PlantsScreen from "../screens/PlantsScreen";
import ModalScreen from "../screens/ModalScreen";
import CalendarScreen from "../screens/CalendarScreen";
import PlaygroundScreen from "../screens/PlaygroundScreen";
import StorybookScreen from "../screens/StorybookScreen";

import LinkingConfiguration from "./LinkingConfiguration";

import useCachedResources from "../hooks/useCachedResources";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 */
const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { firstLaunch } = useCachedResources();

  console.log(firstLaunch);
  return (
    firstLaunch != null && (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {firstLaunch && (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        )}
        <Stack.Screen name="Root" component={BottomTabNavigator} />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="Modal" component={ModalScreen} />
        </Stack.Group>
      </Stack.Navigator>
    )
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 */
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Plants"
        component={PlantsScreen}
        options={{
          title: "Plants",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Playground"
        component={PlaygroundScreen}
        options={{
          title: "Playground",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: "Calendar",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="Storybook"
        component={StorybookScreen}
        options={{
          title: "Storybook",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
