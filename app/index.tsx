import ChatListItem from "@/components/ChatListItem";
import Header from "@/components/Header";
import Moment from "@/components/Moment";
import { chats } from "@/constants/Chats";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 flex-grow">
      <View className="flex flex-row justify-start items-center">
        <TouchableOpacity className="mb-10 pr-2 pl-4">
          <View className="w-21 h-21 p-8 rounded-full border-2 border-slate-200 border-dashed flex flex-row justify-center items-center">
            <SimpleLineIcons name="plus" size={20} color={"gray"} />
          </View>
          <Text className="text-center">Moment</Text>
        </TouchableOpacity>
        <FlatList horizontal={true} showsHorizontalScrollIndicator={false} data={chats} renderItem={({ item }) => <Moment profilePhoto={item.profilePhoto} userName={item.name} />} keyExtractor={(item) => item.profilePhoto + Math.random().toString()} />
      </View>

      <Header title={"Chats"} titleStyle={"font-medium text-2xl"} icon={"options"} iconSize={24} />
      <FlatList showsVerticalScrollIndicator={false} data={chats} renderItem={({ item }) => <ChatListItem name={item.name} profilePhoto={item.profilePhoto} lastmsg={item.lastmsg} msgCount={item.msgCount} />} keyExtractor={(item) => item.profilePhoto + Math.random().toString()} />
    </View>
  );
}
