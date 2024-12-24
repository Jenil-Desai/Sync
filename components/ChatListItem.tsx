import { Image, Text, View } from "react-native";
import React from "react";
import moment from "moment";
import { Chat } from "@/constants/Chats";

export default function ChatListItem(chat: Chat) {
  return (
    <View className="flex flex-row px-5 mb-2 flex-1">
      <Image source={{ uri: chat.profilePhoto }} className="w-20 h-20 rounded-full mr-2" />
      <View className="flex justify-center flex-1">
        <View className="flex flex-row justify-between items-center">
          <Text className="font-semibold">{chat.name}</Text>
          <Text className="font-normal opacity-50 text-sm">{moment(chat.lastmsgTime).format("HH:MM A").toString()}</Text>
        </View>
        <View className="flex flex-row justify-between items-center mt-2">
          {chat.lastmsg && <Text>{chat.lastmsg.slice(0, 29) + "..."}</Text>}
          {chat.lastmsg && (
            <View className="justify-center items-center bg-[#FDC604] rounded-full w-6 h-6">
              <Text className="text-xs">{chat.msgCount}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
