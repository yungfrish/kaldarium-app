import React, { useEffect, useRef, useState } from "react";
import Navigation from "./navigation";
import { StatusBar } from "expo-status-bar";
import useCachedResources from "./hooks/useCachedResources";

export const Main = () => {
  const { isLoadingComplete } = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <Navigation />
        <StatusBar />
      </>
    );
  }
};
