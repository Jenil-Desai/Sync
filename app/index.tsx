import ChatListItem from "@/components/ChatListItem";
import Header from "@/components/Header";
import Moment from "@/components/Moment";
import { chats } from "@/constants/Chats";
import { FlatList, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 flex-grow">
      <FlatList horizontal={true} data={chats} renderItem={({ item }) => <Moment profilePhoto={item.profilePhoto} userName={item.name} />} keyExtractor={(item) => item.profilePhoto + Math.random().toString()} />
      <Header title={"Chats"} titleStyle={"font-medium text-2xl"} icon={"options"} iconSize={24} />
      <FlatList showsVerticalScrollIndicator={false} data={chats} renderItem={({ item }) => <ChatListItem name={item.name} profilePhoto={item.profilePhoto} lastmsg={item.lastmsg} msgCount={item.msgCount} />} keyExtractor={(item) => item.profilePhoto + Math.random().toString()} />
    </View>
  );
}
