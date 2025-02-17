import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ChangeDetailsScreenHeader() {
  const router = useRouter();

  function handleGoBackBtn() {
    router.back();
  }

  return (
    <View className="w-[100%] p-5 bg-transparent border-b-[0.2px] border-slate-500 flex flex-row justify-start items-center">
      <View className="flex flex-row justify-between items-center gap-3">
        <TouchableOpacity onPress={handleGoBackBtn}>
          <Ionicons name="arrow-back" size={38} />
        </TouchableOpacity>
        <Text className="font-bold text-3xl">Change Details</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
