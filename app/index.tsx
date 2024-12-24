import ChatListItem from "@/components/ChatListItem";
import Header from "@/components/Header";
import Moment from "@/components/Moment";
import { chats } from "@/constants/Chats";
import { Text, SafeAreaView, FlatList } from "react-native";

export default function Home() {
  return (
    <SafeAreaView>
      <Header title={"Sync"} titleStyle={"font-bold text-3xl"} icon={"search"} iconSize={24} />
      <FlatList horizontal={true} data={chats} renderItem={({ item }) => <Moment profilePhoto={item.profilePhoto} userName={item.name} />} keyExtractor={(item) => item.profilePhoto + Math.random().toString()} />
      <Header title={"Chats"} titleStyle={"font-medium text-2xl"} icon={"ellipsis-h"} iconSize={24} />
      <FlatList data={chats} renderItem={({ item }) => <ChatListItem name={item.name} profilePhoto={item.profilePhoto} lastmsg={item.lastmsg} msgCount={item.msgCount} />} keyExtractor={(item) => item.profilePhoto + Math.random().toString()} />
    </SafeAreaView>
  );
}
