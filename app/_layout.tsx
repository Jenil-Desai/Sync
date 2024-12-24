import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";
import { RecoilRoot } from "recoil";

import "../global.css";
import Header from "@/components/Header";
import BottomNavigationBar from "@/components/BottomNavigationBar";
import MenuModal from "@/components/MenuModal";

export default function RootLayout() {
  return (
    <RecoilRoot>
      <SafeAreaView className="flex-1">
        <Header title={"Sync"} titleStyle={"font-bold text-3xl"} icon={"magnifier"} iconSize={24} />
        <Slot />
        <MenuModal />
        <BottomNavigationBar />
      </SafeAreaView>
    </RecoilRoot>
  );
}
