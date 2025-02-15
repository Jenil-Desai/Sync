import React from "react";
import { SafeAreaView } from "react-native";
import { RecoilRoot } from "recoil";

import "../global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <RecoilRoot>
      <SafeAreaView className="flex-1 bg-white">
        <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="(auth)/register"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </RecoilRoot>
  );
}
