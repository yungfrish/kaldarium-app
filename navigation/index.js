import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Calendar from "@svg/calendar.svg";
import CalendarActive from "@svg/calendar_active.svg";
import Home from "@svg/home.svg";
import HomeActive from "@svg/home_active.svg";
import Settings from "@svg/settings.svg";
import SettingsActive from "@svg/settings_active.svg";
import { Typography } from "@ui/Typography/Typography";
import * as React from "react";
import { View, TouchableOpacity } from "react-native";

import LinkingConfiguration from "./LinkingConfiguration";
import useCachedResources from "../hooks/useCachedResources";
import CalendarScreen from "../screens/CalendarScreen";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import OnboardingNotificationsScreen from "../screens/OnboardingNotificationsScreen";
import OnboardingPlantsScreen from "../screens/OnboardingPlantsScreen";
import OnboardingSplashScreen from "../screens/OnboardingSplashScreen";
import PlantsScreen from "../screens/PlantsScreen";
import PlaygroundScreen from "../screens/PlaygroundScreen";

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
  const { showOnboarding } = useCachedResources();

  return (
    showOnboarding != null && (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showOnboarding && (
          <>
            <Stack.Screen
              name="OnboardingSplash"
              component={OnboardingSplashScreen}
            />
            <Stack.Screen
              name="OnboardingPlants"
              component={OnboardingPlantsScreen}
            />
            <Stack.Screen
              name="OnboardingNotifications"
              component={OnboardingNotificationsScreen}
            />
          </>
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

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        shadowColor: "#756e55",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.12,
        shadowRadius: 32,
      }}
      className="flex flex-row justify-between w-full pt-3 px-[30] pb-10 bg-yellow-light-100"
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : "";

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className={`flex flex-row items-center h-10 py-2 px-3 ml-0 rounded-12 ${
              isFocused ? "bg-rose" : ""
            }`}
          >
            {isFocused ? options.tabBarActiveIcon : options.tabBarIcon}
            {label !== "" && (
              <Typography className="ml-3" size="label">
                {label}
              </Typography>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 */
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <BottomTab.Screen
        name="Home"
        component={PlantsScreen}
        options={{
          title: "Dein Garten",
          tabBarIcon: <Home />,
          tabBarActiveIcon: <HomeActive />,
        }}
      />
      <BottomTab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: "Kalender",
          tabBarIcon: <Calendar />,
          tabBarActiveIcon: <CalendarActive />,
        }}
      />

      <BottomTab.Screen
        name="Options"
        component={PlaygroundScreen}
        options={{
          tabBarIcon: <Settings />,
          tabBarActiveIcon: <SettingsActive />,
        }}
      />
    </BottomTab.Navigator>
  );
}
