import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState, useRef } from "react";
import { AppState } from "react-native";

import { storeData, getStringValue, clearStore } from "../helper/AsyncStorage";
import { supabase } from "../supabaseClient";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(null);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const getPlants = async () => {
    const { data, error } = await supabase.from("plants").select("*");

    if (error) {
      console.error("error", error);
    } else {
      await storeData("plants", data);
    }
  };

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      async (nextAppState) => {
        if (appState.current.match(/background/) && nextAppState === "active") {
          const { data: plants, error } = await supabase
            .from("plants")
            .select("*");

          console.log("Retrieve new data from db, might be outdated already!");
          if (error) {
            console.warn("Error retrieving data from db: ", error);
          } else {
            await storeData("plants", plants);
          }
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
      }
    );

    async function setData() {
      const appData = await getStringValue("ShowOnboarding");
      if (appData == null) {
        await storeData("ShowOnboarding", "true");
        setShowOnboarding(true);
      } else if (appData === "true") {
        setShowOnboarding(true);
      } else {
        setShowOnboarding(false);
      }
    }

    setData();

    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          FrauncesRegular: require("../assets/fonts/Fraunces-Regular.ttf"),
          FrauncesSemi: require("../assets/fonts/Fraunces-SemiBoldItalic.ttf"),
          SkModernist: require("../assets/fonts/Sk-Modernist-Bold.otf"),
        });

        await getPlants();
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();

    return () => {
      subscription.remove();
    };
  }, []);

  return { isLoadingComplete, showOnboarding, appStateVisible };
}
