import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface ChatScreenHeaderProps {
  profilePhotoUrl: string;
  name: string;
  status: "online" | "offline";
}

export default function ChatScreenHeader({
  profilePhotoUrl,
  name,
  status,
}: ChatScreenHeaderProps) {
  const router = useRouter();

  function handleBackBtn() {
    router.back();
  }

  return (
    <View className="w-[100%] p-5 bg-transparent flex flex-row justify-between items-center border-b-[0.2px] border-slate-400">
      <View className="flex flex-row justify-between items-center gap-5">
        <TouchableOpacity onPress={handleBackBtn}>
          <SimpleLineIcons name="arrow-left" size={24} />
        </TouchableOpacity>
        <View className="flex flex-row justify-between items-center">
          <Image
            source={{ uri: profilePhotoUrl }}
            className="rounded-full mr-2"
            style={{ width: 50, height: 50 }}
          />
          <View className="flex justify-between items-left">
            <Text className="text-left text-lg font-semibold">{name}</Text>
            <Text className="text-left font-normal opacity-50 text-sm">
              {status}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex flex-row justify-between items-center gap-8">
        <SimpleLineIcons name="camrecorder" size={24} />
        <SimpleLineIcons name="call-out" size={24} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
