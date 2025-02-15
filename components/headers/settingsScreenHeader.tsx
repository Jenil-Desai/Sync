import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function SettingsScreenHeader() {
  return (
    <View className="w-[100%] p-5 bg-transparent border-b-[0.2px] border-slate-500 flex flex-row justify-start items-center">
      <View className="flex flex-row justify-between items-center gap-3">
        <SimpleLineIcons name="arrow-left" size={24} />
        <Text className="font-bold text-3xl">Settings</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
