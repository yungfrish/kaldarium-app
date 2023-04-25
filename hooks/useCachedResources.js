import { FontAwesome } from "@expo/vector-icons";
import { storeData, getStringValue, clearStore } from "@storage";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState, useRef } from "react";
import { AppState } from "react-native";

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
      await storeData("KaldariumPlants", data);
    }
  };

  // const getContents = async () => {
  //   const { data, error } = await supabase.from("contents").select("*");

  //   const contentsObject = {};
  //   const contentsLength = data.length;

  //   for (let i = 0; i < contentsLength; i++) {
  //     const content = data[i];
  //     contentsObject[content.identifier] = content;
  //   }

  //   if (error) {
  //     console.error("error", error);
  //   } else {
  //     await storeData("KaldariumContents", contentsObject);
  //   }
  // };

  const getPests = async () => {
    const { data, error } = await supabase.from("pests").select("*");

    if (error) {
      console.error("error", error);
    } else {
      await storeData("KaldariumPests", data);
    }
  };

  const getPestsPlantsRelations = async () => {
    const { data, error } = await supabase.from("pests_plants").select("*");

    if (error) {
      console.error("error", error);
    } else {
      await storeData("KaldariumPestsPlantsRelations", data);
    }
  };

  const setOnboardingData = async () => {
    const onboarding = await getStringValue("ShowOnboarding");
    if (onboarding == null) {
      await storeData("ShowOnboarding", "true");
      setShowOnboarding(true);
    } else if (onboarding === "true") {
      setShowOnboarding(true);
    } else {
      setShowOnboarding(false);
    }
  };

  const revisionRoutine = async () => {
    const currentRevision = await getStringValue("KaldariumRevision");
    const { data: version, error: versionError } = await supabase
      .from("version")
      .select("revision");

    if (versionError) {
      console.warn("Error retrieving data from db: ", versionError);
    }

    if (currentRevision !== version[0].revision.toString()) {
      await storeData("KaldariumRevision", version[0].revision);

      await getPlants();
      // await getContents();
      await getPests();
      await getPestsPlantsRelations();
    }
  };

  const loadResourcesAndDataAsync = async () => {
    try {
      SplashScreen.preventAutoHideAsync();

      // Load fonts
      await Font.loadAsync({
        ...FontAwesome.font,
        FrauncesRegular: require("../assets/fonts/Fraunces-Regular.ttf"),
        FrauncesSemi: require("../assets/fonts/Fraunces-SemiBoldItalic.ttf"),
        SkModernist: require("../assets/fonts/Sk-Modernist-Bold.otf"),
      });

      await revisionRoutine();
    } catch (e) {
      // We might want to provide this error information to an error reporting service
      console.warn(e);
    } finally {
      setLoadingComplete(true);
      SplashScreen.hideAsync();
    }
  };

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      async (nextAppState) => {
        if (appState.current.match(/background/) && nextAppState === "active") {
          await revisionRoutine();
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
      }
    );

    setOnboardingData();
    loadResourcesAndDataAsync();

    return () => {
      subscription.remove();
    };
  }, []);

  return { isLoadingComplete, showOnboarding, appStateVisible };
}
