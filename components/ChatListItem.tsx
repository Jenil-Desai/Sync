import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import moment from "moment";
import { Chat } from "@/constants/Chats";
import { useRouter } from "expo-router";

export default function ChatListItem(chat: Chat) {
  const router = useRouter();

  function handleOnPress() {
    router.push(`/(app)/chats/${chat.id}`);
  }

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View className="flex flex-row px-5 mb-4 flex-1">
        <Image
          source={{ uri: chat.profilePhoto || "https://i.pravatar.cc/300" }}
          className="rounded-full mr-2"
          style={{ width: 55, height: 55 }}
        />
        <View className="flex justify-center flex-1">
          <View className="flex flex-row justify-between items-center">
            <Text className="font-semibold">{chat.name}</Text>
            <Text className="font-normal opacity-50 text-sm">
              {moment(chat.lastmsgTime).format("HH:MM A").toString()}
            </Text>
          </View>
          <View className="flex flex-row justify-between items-center mt-2">
            {chat.lastmsg && <Text>{chat.lastmsg.slice(0, 29) + "..."}</Text>}
            {chat.lastmsg && (
              <View className="justify-center items-center bg-custom-lavendar-light rounded-full w-5 h-5">
                <Text className="text-xs">{chat.msgCount}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
