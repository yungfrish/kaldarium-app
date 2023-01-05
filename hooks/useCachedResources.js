import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState, useRef } from "react";
import { AppState } from "react-native";
import { storeData } from "../helper/AsyncStorage";
import { supabase } from "../supabaseClient";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
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

    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
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

  return { isLoadingComplete, appStateVisible };
}
