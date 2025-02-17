import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SettingsScreenHeader from "@/components/headers/settingsScreenHeader";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function Settings() {
  return (
    <View className="flex-1">
      <SettingsScreenHeader />
      <View className="p-6">
        <View className="bg-slate-200 rounded-lg p-4 flex flex-row justify-start items-center gap-2 mb-10">
          <Image
            source={require("@/assets/images/default-avatar.png")}
            className="rounded-full mr-2"
            style={{ width: 80, height: 80 }}
          />
          <View className="flex justify-center items-start gap-1">
            <View className="w-40 h-10 bg-custom-skeleton-dark rounded-lg"></View>
            <View className="bg-custom-skeleton-dark w-40 h-3 rounded-lg"></View>
          </View>
        </View>

        <TouchableOpacity className="bg-slate-200 rounded-lg p-4 flex flex-row justify-between items-center mb-2">
          <View className="flex flex-row justify-between items-center gap-5">
            <SimpleLineIcons name="user" size={20} />
            <Text className="text-xl font-semibold">Change Details</Text>
          </View>
          <SimpleLineIcons name="arrow-right" size={20} />
        </TouchableOpacity>

        <TouchableOpacity className="bg-slate-200 rounded-lg p-4 flex flex-row justify-between items-center mb-10">
          <View className="flex flex-row justify-between items-center gap-5">
            <SimpleLineIcons name="info" size={20} />
            <Text className="text-xl font-semibold">About App</Text>
          </View>
          <Text className="text-xl font-semibold text-slate-500">v5.0.0</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-slate-200 rounded-lg p-4 flex flex-row justify-center items-center">
          <View className="flex flex-row justify-center items-center gap-3">
            <SimpleLineIcons
              name="logout"
              size={20}
              className="text-xl font-semibold text-slate-500"
            />
            <Text className="text-xl font-semibold text-slate-500">
              Log Out{" "}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
