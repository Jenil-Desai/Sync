import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

import "../global.css";
import Header from "@/components/Header";
import BottomNavigationBar from "@/components/BottomNavigationBar";

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1">
      <Header title={"Sync"} titleStyle={"font-bold text-3xl"} icon={"magnifier"} iconSize={24} />
      <Slot />
      <BottomNavigationBar />
    </SafeAreaView>
  );
}
