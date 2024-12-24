import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

import "../global.css";
import Header from "@/components/Header";
import BottomNavigationBar from "@/components/BottomNavigationBar";
import MenuModal from "@/components/MenuModal";

export default function RootLayout() {
  const [menuVisible, setMenuVisible] = React.useState(false);
  return (
    <SafeAreaView className="flex-1">
      <Header title={"Sync"} titleStyle={"font-bold text-3xl"} icon={"magnifier"} iconSize={24} />
      <Slot />
      <MenuModal visible={menuVisible} onClose={() => setMenuVisible(false)} />
      <BottomNavigationBar onPress={() => setMenuVisible(true)} />
    </SafeAreaView>
  );
}
